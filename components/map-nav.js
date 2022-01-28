import { X, Menu } from "react-feather";
import Link from "next/link";

export default function MapNav() {
    return (
        <>
            <button className="z-[10001] fixed top-4 right-4 p-1 bg-white rounded border border-white">
                <X />
            </button>
            <button className="z-[10001] fixed top-4 right-4 p-1 bg-white rounded border border-gray-600">
                <Menu />
            </button>
            <nav className="z-[10000] flex flex-col fixed top-0 left-0 w-screen h-screen bg-white text-lg uppercase font-semibold items-center text-center">
                <h1 className="mt-5 font-bold text-2xl normal-case border-b-2 border-gray-600">Deník sráčů</h1>
                <Link href="/form">
                    <a id="home" className="mt-5">Přidat nový trůn</a>
                </Link>
                <Link href="/about">
                    <a id="about" className="mt-5" >O projektu</a>
                </Link>
                <Link href="/about">
                    <a id="contact" className="mt-5" >Sráčovo desatero</a>
                </Link>
            </nav>
        </>
    );
}