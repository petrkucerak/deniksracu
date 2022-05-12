import { X } from "react-feather";
import Link from "next/link";
export default function BackButton() {
   return (
      <Link href="/">
         <a className="absolute top-4 right-4 p-1 color-grey-600">
            <X />
         </a>
      </Link>
   )
}