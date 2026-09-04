import { cacheLife, cacheTag } from "next/cache"
import type { Category, Product, Tenant } from "@/lib/types"

/**
 * Catalog data layer (Cache Components / PPR model).
 *
 * All catalog fetches are cached with the `use cache` directive and tagged so
 * the admin dashboard can invalidate them instantly via POST /api/revalidate
 * (revalidateTag with the same tags). Their prerendered output becomes part of
 * the static shell. `revalidate` is the worst-case staleness if no webhook is
 * fired; `stale` lets clients/CDN serve the entry without a recheck.
 *
 * Build-time resilience: cached functions execute during `next build` to
 * produce the static shell. If the backend is unreachable at build time (or
 * during a deploy blip), we return an empty result cached with a very short
 * expiry instead of crashing the build/render. The empty state self-heals on
 * the next revalidation once the backend is reachable again.
 */
const CACHE_LIFE = { stale: 60, revalidate: 60, expire: 60 } as const
// Positive `revalidate` matters: with 0 the failed entry is instantly stale
// and prerendering loop-retries until it times out.
const FAILURE_CACHE_LIFE = { stale: 0, revalidate: 10, expire: 30 } as const

// Same fallback convention as next.config.ts (API_GATEWAY): CI and Docker
// builds run without .env.local, so unset BACKEND_URL falls back to the
// production gateway instead of making the build fail.
const BACKEND_URL = process.env.BACKEND_URL ?? "https://api-pizza.adityavyas.com"

export async function getCategories(): Promise<Category[]> {
    "use cache"
    cacheTag("catalog")

    try {
        const response = await fetch(`${BACKEND_URL}/api/catalog/categories`)
        if (!response.ok) {
            throw new Error("Failed to fetch categories")
        }
        cacheLife(CACHE_LIFE)
        return (await response.json()) as Category[]
    } catch (error) {
        console.error("getCategories failed, serving empty result briefly:", error)
        cacheLife(FAILURE_CACHE_LIFE)
        return []
    }
}

export async function getProducts(tenantId: string): Promise<Product[]> {
    "use cache"
    cacheTag("catalog")

    try {
        const response = await fetch(
            `${BACKEND_URL}/api/catalog/products?limit=100&tenantId=${tenantId}`
        )
        if (!response.ok) {
            throw new Error("Failed to fetch products")
        }
        cacheLife(CACHE_LIFE)
        const data: { data: Product[] } = await response.json()
        return data.data ?? []
    } catch (error) {
        console.error("getProducts failed, serving empty result briefly:", error)
        cacheLife(FAILURE_CACHE_LIFE)
        return []
    }
}

export async function getTenants(): Promise<Tenant[]> {
    "use cache"
    cacheTag("tenants")

    try {
        const response = await fetch(`${BACKEND_URL}/api/auth/tenants?perPage=100`)
        if (!response.ok) {
            throw new Error("Failed to fetch tenants")
        }
        cacheLife(CACHE_LIFE)
        const data: { data: Tenant[] } = await response.json()
        return data.data ?? []
    } catch (error) {
        console.error("getTenants failed, serving empty result briefly:", error)
        cacheLife(FAILURE_CACHE_LIFE)
        return []
    }
}
