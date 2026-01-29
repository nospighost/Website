import { query } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        const { username, email, password } = await req.json();

        if (!username || !email || !password) {
            return new Response("Alle Felder sind erforderlich", { status: 400 });
        }

        const password_hash = await bcrypt.hash(password, 10);

        await query(
            "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
            [username, email, password_hash]
        );

        return Response.json({ message: "User registriert" }, { status: 201 });

    } catch (err) {
        console.error(err);

        if (err.code === "ER_DUP_ENTRY") {
            return new Response("Username oder Email existiert bereits", { status: 409 });
        }

        return new Response("Server Fehler", { status: 500 });
    }
}
