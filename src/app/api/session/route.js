// src/app/api/session/route.js
import { query } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = cookies();
    const sessionId = cookieStore.get("session")?.value;

    if (!sessionId) {
        return new Response(JSON.stringify({ loggedIn: false }), {
            headers: { "Content-Type": "application/json" }
        });
    }

    const users = await query("SELECT username FROM users WHERE id = ?", [sessionId]);

    if (users.length === 0) {
        return new Response(JSON.stringify({ loggedIn: false }), {
            headers: { "Content-Type": "application/json" }
        });
    }

    return new Response(
        JSON.stringify({ loggedIn: true, username: users[0].username }),
        { headers: { "Content-Type": "application/json" } }
    );
}
