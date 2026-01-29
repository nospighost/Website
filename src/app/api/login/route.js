import { query } from "@/lib/db";
import bcrypt from "bcrypt";
import { serialize } from "cookie";

export async function POST(req) {
    try {
        const { identifier, password } = await req.json();

        if (!identifier || !password) {
            return new Response("Daten fehlen", { status: 400 });
        }

        const users = await query(
            "SELECT * FROM users WHERE email = ? OR username = ?",
            [identifier, identifier]
        );

        if (users.length === 0) {
            return new Response("User nicht gefunden", { status: 404 });
        }

        const user = users[0];
        const match = await bcrypt.compare(password, user.password_hash);

        if (!match) {
            return new Response("Falsches Passwort", { status: 401 });
        }

        const cookie = serialize("session", String(user.id), {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24
        });

        return new Response(
            JSON.stringify({ message: "Login erfolgreich", username: user.username }),
            {
                headers: {
                    "Set-Cookie": cookie,
                    "Content-Type": "application/json"
                }
            }
        );

    } catch (err) {
        console.error(err);
        return new Response("Server Fehler", { status: 500 });
    }
}
