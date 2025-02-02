import Link from "next/link";
import Image from "next/image";
import search from "../assets/search.png";

export default function Navbar() {
    return (
        <div className="flex w-full justify-between bg-slate-600 p-4 px-20 ">
            <div>
                <Link href="/" className="text-2xl font-bold text-white">EcoBlog</Link>
            </div>
            <div className="w-1/3">
                <form className="flex relative">
                    <input className="absolute mr-2 p-1 rounded-full w-full " type="text" placeholder="Buscar"/>
                    <button type="submit" className="absolute flex align-middle justify-center right-3"><Image className="hover:scale-110 mt-1" src={search} alt="search" width={25} height={25} /></button>
                </form>
            </div>
            <div>
                <ul className="flex gap-4 text-white cursor-pointer " >
                    <li className="hover:scale-110">
                        <Link href="/">Home</Link>
                    </li>
                    <li className="hover:scale-110"> 
                        <Link href="/about">About</Link>
                    </li>
                    <li className="hover:scale-110">
                        <Link href="/contact">Contact</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}