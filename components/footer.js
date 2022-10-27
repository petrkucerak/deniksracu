import { IconBrandGithub, IconMail } from "@tabler/icons";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center py-5 bg-gray-200 text-gray-800">
      <Link href="https://github.com/petrkucerak/deniksracu">
        <a className="w-[90vw]" target="_blank" rel="noreferrer">
          <IconBrandGithub className="inline mr-2" />
          deniksracu
        </a>
      </Link>
      <Link href="mailto:petr@khome.cz">
        <a className="w-[90vw]">
          <IconMail className="inline mr-2" />
          petr@khome.cz
        </a>
      </Link>
    </footer>
  );
}
