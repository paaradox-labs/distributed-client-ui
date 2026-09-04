import { revalidateTag } from "next/cache"
import type { NextRequest } from "next/server"

/**
 * On-demand cache invalidation endpoint.
 *
 * The admin dashboard (or API gateway) calls this after any catalog change
 * (product created / updated / unpublished, tenant changed) so the client UI
 * shows fresh data immediately instead of waiting for the time-based
 * revalidation window (60s).
 *
 *   POST /api/revalidate
 *   x-revalidate-secret: <REVALIDATE_SECRET>
 *   { "tags": ["catalog"] }        // optional, defaults to all catalog tags
 *
 * Set REVALIDATE_SECRET in the environment (see .env.example) and share it
 * with the admin dashboard.
 */
const ALLOWED_TAGS = ["catalog", "tenants"] as const

export async function POST(request: NextRequest) {
    const secret = request.headers.get("x-revalidate-secret")

    if (!secret || secret !== process.env.REVALIDATE_SECRET) {
        return Response.json(
            { revalidated: false, message: "Invalid or missing secret" },
            { status: 401 }
        )
    }

    const body = await request.json().catch(() => ({}))
    const requestedTags: string[] = Array.isArray(body?.tags) ? body.tags : []
    const tags = requestedTags.length
        ? requestedTags.filter((tag) => (ALLOWED_TAGS as readonly string[]).includes(tag))
        : [...ALLOWED_TAGS]

    if (requestedTags.length && !tags.length) {
        return Response.json(
            { revalidated: false, message: `No valid tags. Allowed: ${ALLOWED_TAGS.join(", ")}` },
            { status: 400 }
        )
    }

    for (const tag of tags) {
        revalidateTag(tag, "max")
    }

    return Response.json({ revalidated: true, tags, now: Date.now() })
}
