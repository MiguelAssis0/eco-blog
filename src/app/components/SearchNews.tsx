"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../config/firebase";
import Link from "next/link";
import Image from "next/image";
import News from "../types/News";

export default function SearchNews() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || ""; // Obtém o termo de busca da URL
    const [results, setResults] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query) return;
            setLoading(true);

            try {
                const db = getFirestore(app);
                const newsRef = collection(db, "news");
                const querySnapshot = await getDocs(newsRef);

                const filteredNews = querySnapshot.docs
                    .map((doc) => ({ id: doc.id, ...(doc.data() as Omit<News, "id">) }))
                    .filter((item) =>
                        item.title.toLowerCase().includes(query.toLowerCase()) ||
                        item.content.toLowerCase().includes(query.toLowerCase()) ||
                        item.category.toLowerCase().includes(query.toLowerCase())
                    );

                setResults(filteredNews);
            } catch (error) {
                console.error("Erro ao buscar notícias:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    return (
        <div className="p-10 min-h-full">
            <h1 className="text-2xl mb-5 font-bold text-center">Resultados da busca:</h1>

            {loading ? (
                <p className="text-center">Carregando...</p>
            ) : results.length === 0 ? (
                <p className="text-center">Nenhuma notícia encontrada para: {query}.</p>
            ) : (
                <div className="flex gap-4 lg:flex-col w-full flex-wrap min-h-[90dvh]">
                    {results.map((news) => (
                        <div key={news.id} className="bg-gray-800 rounded-xl flex lg:flex-row flex-col items-center w-full h-[100%] lg:pb-0 pb-10 gap-4">
                            <Image src={news.imageUrl} alt={news.title} width={150} height={150} className="rounded-lg object-cover lg:h-[250px] w-full h-[300px] lg:w-1/3" />
                            <div className="flex flex-col gap-4 w-2/3 lg:p-3">
                                <h2 className="text-xl lg:text-left text-center font-bold text-white">{news.title}</h2>
                                <p className="text-white text-justify">{news.summary}</p>
                                <Link href={`/news/${news.id}`} className="bg-green-600 text-white p-2 rounded-md w-[150px] hover:bg-green-700">
                                    Leia mais
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
