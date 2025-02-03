"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import search from "../assets/search.png";

export default function Navbar() {
    const [query, setQuery] = useState(""); // Estado para armazenar o valor digitado
    const router = useRouter(); // Hook para redirecionamento

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Evita o recarregamento da página
        if (query.trim()) {
            router.push(`/search?query=${encodeURIComponent(query)}`); // Redireciona para a página de busca
        }
    };

    return (
        <div className="flex w-full justify-between items-center bg-green-600 p-4 px-10">
            <div className="w-1/3">
                <Link href="/" className="text-2xl font-bold text-white">
                    EcoBlog
                </Link>
            </div>
            <div className="w-1/3">
                <ul className="flex items-center gap-4 text-white">
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
                <form onSubmit={handleSearch} className="flex items-center relative w-full">
                    <input
                        className="p-2 pr-10 rounded-full w-full bg-white"
                        type="text"
                        placeholder="Buscar..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" className="absolute right-3 flex items-center justify-center">
                        <Image className="hover:scale-110" src={search} alt="search" width={25} height={25} />
                    </button>
                </form>
            </div>
        </div>
    );
}
