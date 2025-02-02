import Link from "next/link";
import Image from "next/image";
import search from "../assets/search.png";

export default function Navbar() {
    return (
        <div className="flex w-full justify-between items-center bg-green-600 p-4 px-10 ">
            <div className="w-1/3">
                <Link href="/" className="text-2xl font-bold text-white">EcoBlog</Link>
            </div>
            <div className="w-1/3">
                <ul className="flex items-center gap-4 text-white" >
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
            <div className="w-1/3">
                <form className="flex items-center relative">
                    <input className="absolute px-2 mr-2 p-1 rounded-full w-full bg-white " type="text" placeholder="Buscar..."/>
                    <button type="submit" className="absolute flex items-center justify-center right-3"><Image className="hover:scale-110" src={search} alt="search" width={25} height={25} /></button>
                </form>
            </div>
          
        </div>
    )
}