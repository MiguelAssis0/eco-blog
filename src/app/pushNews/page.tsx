"use client";
import React, { useState } from "react";
import { login } from "../types/Login";

// Componente de Login
function LoginComponent({ onLogin }: login) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Aqui você pode realizar a validação, seja por API ou de forma local.
    if (username === "admin" && password === "1234") {
      onLogin(); // Se estiver tudo certo, chama a função para definir que o usuário está logado
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
        <button type="submit" className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700">Entrar</button>
      </form>
    </div>
  );
}

// Componente para criação da notícia
function CreateNewsComponent() {
  return (
    <div className="flex flex-col items-center p-10 min-h-[90dvh]">
      <h1 className="text-2xl font-bold mb-4">Cadastrar nova notícia</h1>
      <form className="flex w-full flex-col gap-4 border-gray-300 border-2 p-10">
        <div className="w-full">
          <input type="text" className="p-3 rounded-md border-2 w-full" placeholder="Título da Notícia" />
        </div>
        <div className="w-full">
          <input type="text" className="p-3 rounded-md border-2 w-full" placeholder="Resumo da Notícia" />
        </div>
        <div className="w-full">
          <input type="text" className="p-3 rounded-md border-2 w-full" placeholder="Autor da Noticia" />
        </div>
        <div className="w-full">
          <input type="text" className="p-3 rounded-md border-2 w-full" placeholder="Fonte da Noticia" />
        </div>
        <div>
          <select className="p-3 rounded-md border-2 w-full">
            <option value="tecnologia">Tecnologia</option>
            <option value="saude">Saúde</option>
            <option value="estilo">Estilo de vida</option>
            <option value="politica">Politica</option>
            <option value="esporte">Esporte</option>
            <option value="economia">Economia</option>
            <option value="cultura">Cultura</option>
            <option value="outros">Outros</option>
          </select>
        </div>
        <div className="w-full">
          <input type="date" className="p-3 rounded-md border-2 w-full" />
        </div>
        <div className="w-full">
          <input type="file" className="p-3 rounded-md border-2 w-full" />
        </div>
        <div className="w-full">
          <textarea className="p-3 rounded-md border-2 w-full h-[300px]" placeholder="Conteúdo da Notícia"></textarea>
        </div>
        <button type="submit" className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700">Publicar</button>
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
        <LoginComponent 
        onLogin={() => setIsLogged(true)} />
      )}
    </>
  );
}
