import Link from "next/link";
import { useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons";

export default function MapNav() {
  const [closeClass, setCloseClass] = useState("hidden");
  const [openClass, setOpenClass] = useState(
    "z-[10001] fixed top-4 right-4 p-1 bg-white rounded border-2 border-opacity-50 border-gray-600"
  );
  const [navClass, setNavClass] = useState("hidden");
  const [isOpen, setIsOpen] = useState(false);

  function switchMenuContext() {
    if (isOpen) {
      setCloseClass("hidden");
      setOpenClass(
        "z-[10001] fixed top-4 right-4 p-1 bg-white rounded border-2 border-opacity-50 border-gray-600"
      );
      setNavClass("hidden");
      setIsOpen(false);
    } else {
      setCloseClass(
        "z-[10001] fixed top-4 right-4 p-1 bg-white rounded border border-white"
      );
      setOpenClass("hidden");
      setNavClass(
        "flex z-[10000] flex-col fixed top-0 left-0 w-screen h-screen bg-white text-lg uppercase font-semibold items-center text-center"
      );
      setIsOpen(true);
    }
  }

  return (
    <>
      <button className={closeClass} title="Zavřít menu" onClick={() => switchMenuContext()}>
        <IconX/>
      </button>
      <button className={openClass} title="Otevřít menu" onClick={() => switchMenuContext()}>
        <img src="/asstes/icons/toilet-makrer-win/toilet-paper-win.svg" className="w-7"/>
      </button>
      <nav className={navClass}>
        <h1 className="mt-5 font-bold text-2xl normal-case border-b-2 border-gray-600">
          Deník sráčů
        </h1>
        <Link href="/form">
          <a id="form" className="mt-5">
            Přidat nový trůn
          </a>
        </Link>
        <Link href="/about">
          <a id="about" className="mt-5">
            O projektu
          </a>
        </Link>
        <Link href="/desatero">
          <a id="desatero" className="mt-5">
            Sráčovo desatero
          </a>
        </Link>
        <Link href="/hall">
          <a id="hall" className="mt-5">
            Síň sráčů
          </a>
        </Link>
      </nav>
    </>
  );
}
