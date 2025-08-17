import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "next-auth/react";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const users = await prisma.user.findMany();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Jednoduchá Next.js Aplikace</h1>
      {session ? (
        <div>
          <p>Vítejte, {session.user?.name}!</p>
          <button
            onClick={() => signOut()}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
          >
            Odhlásit se
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn("github")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Přihlásit se přes GitHub
        </button>
      )}
      <h2 className="text-xl font-semibold mt-6">Seznam uživatelů</h2>
      <ul className="mt-4">
        {users.map((user) => (
          <li key={user.id} className="py-2">
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
