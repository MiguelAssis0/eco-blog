"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import app from "../config/firebase";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";
import News from "../types/News";
import Image from "next/image";

export default function Main() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const db = getFirestore(app);
        const newsRef = collection(db, "news");
        const q = query(newsRef, orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        const newsData: News[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<News, "id">),
        }));
        setNews(newsData);
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const mainNews = news[0];
  const otherNews = news.slice(1);

  return (
    <div className="flex flex-col w-full justify-between py-8 px-8 gap-5">
      {loading ? (
        <p>Carregando notícias...</p>
      ) : news.length === 0 ? (
        <p>Nenhuma notícia encontrada.</p>
      ) : (
        <>
          {mainNews && (
            <div className="flex w-full justify-between">
              <div
                key={mainNews.id}
                className="flex flex-col relative justify-end p-20 w-full h-[600px] rounded-3xl text-white bg-slate-600 bg-cover bg-center"
              >
                <Image
                  src={mainNews.imageUrl}
                  alt={mainNews.title}
                  className="w-full h-full object-cover absolute top-0 left-0 z-0 rounded-3xl"
                  width={500}
                  height={500}
                />
                <h1 className="text-2xl mb-2 font-bold z-10">{mainNews.title}</h1>
                <p className="z-10 mb-5">
                  {mainNews.resume ||
                    (mainNews.content.length > 100
                      ? mainNews.content.slice(0, 100) + "..."
                      : mainNews.content)}
                </p>
                <Link href={`/news/${mainNews.id}`} className="bg-green-600 px-10 py-2 w-1/3 rounded-3xl hover:bg-green-700  z-10 ">
                  Leia mais
                </Link>
              </div>
            </div>
          )}

          <div className="flex w-full justify-center flex-wrap gap-5">
            {otherNews.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col justify-end p-10 w-1/3 border-white border-4 h-[300px] rounded-3xl text-white bg-cover bg-center bg-slate-500 `}
              >
                <h1 className="text-2xl font-bold">{item.title}</h1>
                <p>
                  {item.resume ||
                    (item.content.length > 100
                      ? item.content.slice(0, 100) + "..."
                      : item.content)}
                </p>
                <Link href={`/news/${item.id}`} className="underline">
                  Leia mais
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}