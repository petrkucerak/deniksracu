import Meta from "../components/meta";
import { setJSON } from "../lib/post";

export default function Home() {
  setJSON();
  return (
    <div>
      <Meta />
      <main className="p-8">
        <h1 className="text-4xl">Přidat nový záchod</h1>
        <section>

        </section>
        <button className="">nahrát</button>
      </main>
      <footer></footer>
    </div>
  );
}
