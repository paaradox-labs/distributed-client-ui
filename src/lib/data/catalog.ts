import type { Category, Product, Tenant } from "@/lib/types"

/**
 * Catalog data layer.
 *
 * All catalog fetches are tagged so the admin dashboard can invalidate them
 * instantly via POST /api/revalidate (see src/app/api/revalidate/route.ts).
 * The `revalidate` value is the worst-case staleness if no webhook is fired:
 * pages are served from cache (fast) and refreshed at most every 60s.
 */
const REVALIDATE_SECONDS = 60

export async function getCategories(): Promise<Category[]> {
    const response = await fetch(`${process.env.BACKEND_URL}/api/catalog/categories`, {
        next: {
            tags: ["catalog"],
            revalidate: REVALIDATE_SECONDS,
        },
    })

    if (!response.ok) {
        throw new Error("Failed to fetch categories")
    }

    return (await response.json()) as Category[]
}

export async function getProducts(tenantId: string): Promise<Product[]> {
    const response = await fetch(
        `${process.env.BACKEND_URL}/api/catalog/products?limit=100&tenantId=${tenantId}`,
        {
            next: {
                tags: ["catalog"],
                revalidate: REVALIDATE_SECONDS,
            },
        }
    )

    if (!response.ok) {
        throw new Error("Failed to fetch products")
    }

    const data: { data: Product[] } = await response.json()
    return data.data ?? []
}

export async function getTenants(): Promise<Tenant[]> {
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/tenants?perPage=100`, {
        next: {
            tags: ["tenants"],
            revalidate: REVALIDATE_SECONDS,
        },
    })

    if (!response.ok) {
        throw new Error("Failed to fetch tenants")
    }

    const data: { data: Tenant[] } = await response.json()
    return data.data ?? []
}
