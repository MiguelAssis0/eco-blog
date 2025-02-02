export default function Contact() {
    return (
        <div className="flex flex-col align-middle justify-center min-w-full p-20 min-h-full">
            <h1 className="text-4xl text-center mb-5 font-bold">Contato</h1>
            <form action="" className="w-1/2 mx-auto gap-4 border-gray-400 border-2 p-10 rounded-md">
                <div className="flex flex-col gap-4" >
                    <input type="text" placeholder="Seu nome" className="p-3 rounded-md border-2" />
                    <input type="email" placeholder="Seu email" className="p-3 rounded-md border-2" />
                    <input type="text" placeholder="Assunto" className="p-3 rounded-md border-2" />
                    <textarea placeholder="Mensagem" className="p-3 h-[200px] rounded-md border-2" />
                    <button type="submit" className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700">Enviar</button>
                </div>
            </form>
        </div>
    );
}