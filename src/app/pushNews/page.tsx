"use client";
import React, { useState } from "react";
import { login } from "../types/Login";
import app from "../config/firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import process from "process";

// Componente de Login
function LoginComponent({ onLogin }: login) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validação simples (idealmente, validação via API ou outra abordagem)
    if (username === process.env.NEXT_PUBLIC_USERNAME && password === process.env.NEXT_PUBLIC_PASSWORD) {
      onLogin(); // Chama a função que muda o estado para "logado"
    } else {
      setError("Usuário ou senha incorretos!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-10 h-[90dvh]">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 border-gray-300 border-2 p-10">
        <div>
          <input 
            type="text"
            className="p-3 rounded-md border-2"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input 
            type="password"
            className="p-3 rounded-md border-2"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700">
          Entrar
        </button>
      </form>
    </div>
  );
}

// Componente para criação da notícia com lógica de publicação no Firebase
function CreateNewsComponent() {
  // Estados para os campos do formulário
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [author, setAuthor] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("tecnologia");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  // Estado para a URL da imagem (como string)
  const [imageUrl, setImageUrl] = useState("");
  
  // Estado para exibir mensagens de sucesso ou erro
  const [message, setMessage] = useState("");

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const db = getFirestore(app);

    try {
      // Salva os dados da notícia no Firestore, incluindo a URL da imagem informada
      await addDoc(collection(db, "news"), {
        title,
        summary,
        author,
        source,
        category,
        date,
        content,
        imageUrl, // Armazena a URL da imagem como string
        createdAt: new Date(),
      });
      setMessage("Notícia publicada com sucesso!");
      // Limpa os campos após a publicação
      setTitle("");
      setSummary("");
      setAuthor("");
      setSource("");
      setCategory("tecnologia");
      setDate("");
      setContent("");
      setImageUrl("");
    } catch (error) {
      console.error("Erro ao publicar a notícia:", error);
      setMessage("Houve um erro ao publicar a notícia.");
    }
  };

  return (
    <div className="flex flex-col items-center p-10 min-h-[90dvh]">
      <h1 className="text-2xl font-bold mb-4">Cadastrar nova notícia</h1>
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4 border-gray-300 border-2 p-10">
        <div className="w-full">
          <input
            type="text"
            className="p-3 rounded-md border-2 w-full"
            placeholder="Título da Notícia"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="w-full">
          <input
            type="text"
            className="p-3 rounded-md border-2 w-full"
            placeholder="Resumo da Notícia"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          />
        </div>
        <div className="w-full">
          <input
            type="text"
            className="p-3 rounded-md border-2 w-full"
            placeholder="Autor da Notícia"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="w-full">
          <input
            type="text"
            className="p-3 rounded-md border-2 w-full"
            placeholder="Fonte da Notícia"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>
        <div>
          <select
            className="p-3 rounded-md border-2 w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="tecnologia">Tecnologia</option>
            <option value="saude">Saúde</option>
            <option value="estilo">Estilo de vida</option>
            <option value="politica">Política</option>
            <option value="esporte">Esporte</option>
            <option value="economia">Economia</option>
            <option value="cultura">Cultura</option>
            <option value="outros">Outros</option>
          </select>
        </div>
        <div className="w-full">
          <input
            type="date"
            className="p-3 rounded-md border-2 w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        {/* Input para inserir a URL da imagem */}
        <div className="w-full">
          <input
            type="url"
            className="p-3 rounded-md border-2 w-full"
            placeholder="URL da imagem"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="w-full">
          <textarea
            className="p-3 rounded-md border-2 w-full h-[300px]"
            placeholder="Conteúdo da Notícia"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        {message && <p>{message}</p>}
        <button type="submit" className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700">
          Publicar
        </button>
      </form>
    </div>
  );
}

// Componente principal que alterna entre Login e Criação de Notícia
export default function PushNews() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <>
      {isLogged ? (
        <CreateNewsComponent />
      ) : (
        <LoginComponent onLogin={() => setIsLogged(true)} />
      )}
    </>
  );
}
