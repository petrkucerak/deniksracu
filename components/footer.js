import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center py-3 bg-gray-200 text-gray-800">
      <Link href="mailto:petr@khome.cz">
        <a className="underline">petr@khome.cz</a>
      </Link>
      <p>
        Chceš se pomoci deníku sráčů, mrkni do{" "}
        <Link href="https://github.com/petrkucerak/deniksracu">
          <a className="underline" target="_blank" rel="noreferrer">
            repa
          </a>
        </Link>
      </p>
    </footer>
  );
}
