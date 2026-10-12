import Link from "next/link";
import { IconX } from "@tabler/icons";
export default function BackButton() {
  return (
    <Link href="/">
      <a className="absolute top-4 right-4 p-1 color-grey-600">
        <IconX/>
      </a>
    </Link>
  );
}
