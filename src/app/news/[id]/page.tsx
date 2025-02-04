"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getFirestore, doc, getDoc, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import app from "../../config/firebase";
import Image from "next/image";
import Link from "next/link";
import News from "../../types/News";

export default function NewsPage() {
    const { id } = useParams(); // Obtém o ID da URL corretamente no App Router
    const [news, setNews] = useState<News | null>(null);
    const [otherNews, setOtherNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchNews = async () => {
            try {
                const db = getFirestore(app);
                const docRef = doc(db, "news", id as string);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setNews({ id: docSnap.id, ...(docSnap.data() as Omit<News, "id">) });
                } else {
                    console.error("Notícia não encontrada!");
                }
            } catch (error) {
                console.error("Erro ao buscar notícia:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchOtherNews = async () => {
            try {
                const db = getFirestore(app);
                const newsRef = collection(db, "news");
                const q = query(newsRef, orderBy("date", "desc"), limit(4)); 
                const querySnapshot = await getDocs(q);
                const newsData: News[] = querySnapshot.docs
                    .map((doc) => ({ id: doc.id, ...(doc.data() as Omit<News, "id">) }))
                    .filter((item) => item.id !== id); 

                setOtherNews(newsData);
            } catch (error) {
                console.error("Erro ao buscar outras notícias:", error);
            }
        };
        fetchNews();
        fetchOtherNews();
    }, [id]);


    return (
        <div className="lg:p-10 py-10 min-h-full">
            {loading ? (
                <p className="text-center">Carregando notícia...</p>
            ) : !news ? (
                <p className="text-center text-red-500">Notícia não encontrada.</p>
            ) : (
                <>
                    {/* Notícia principal */}
                    <div className="w-full mx-auto bg-white p-6 shadow-lg rounded-lg">
                        <Image src={news.imageUrl} alt={news.title} width={600} height={400} className="rounded-lg object-cover w-full h-[500px] mb-4" />
                        <h1 className="text-3xl font-bold mt-4">{news.title}</h1>
                        <p className="text-gray-600 text-sm">Por {news.author} | Fonte: {news.source} | Categoria: {news.category} | {news.date}</p>
                        <div className="mt-4">
                            {news.content.split("\n").map((linha, index) => (
                                <p className="mb-2 text-justify" key={index}>{linha}</p>
                            ))}
                        </div>
                    </div>

                    {/* Seção de outras notícias */}
                    {otherNews.length > 0 && (
                        <div className="mt-10">
                            <h2 className="text-2xl lg:text-left text-center font-bold mb-4">Outras Notícias</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                                {otherNews.map((item) => (
                                    <Link key={item.id} href={`/news/${item.id}`}>
                                        <div className="bg-white p-4 shadow-md rounded-lg cursor-pointer transition-transform transform hover:scale-105">
                                            <Image src={item.imageUrl} alt={item.title} width={300} height={200} className="rounded-lg object-cover w-full h-[150px]" />
                                            <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
                                            <p className="text-gray-500 text-sm">{item.date}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
