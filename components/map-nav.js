import { Menu } from "react-feather";

export default function MapNav() {
    return (
        <nav className="absolute top-5 right-5 z-[500]">
            <button className="rounded bg-white p-1 border-2 border-gray-500">
                <Menu />
            </button>
        </nav>
    );
}