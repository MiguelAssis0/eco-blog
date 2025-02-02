
export default function Notice() {
    return (
        <div className="p-10 min-h-full">
            <h1 className="text-2xl mb-5 font-bold text-center ">Notícias</h1>
            <div className="flex gap-4 flex-col w-full justify-center flex-wrap">
                <div className=" w-full bg-slate-500 p-4 px-20 h-[200px]">
                    <h1 className="text-2xl font-bold text-white">Titulo</h1>
                    <p className="text-white">Conteúdo</p>
                </div>
                <div className=" w-full bg-slate-500 p-4 px-20 h-[200px]">
                    <h1 className="text-2xl font-bold text-white">Titulo</h1>
                    <p className="text-white">Conteúdo</p>
                </div>
                <div className=" w-full bg-slate-500 p-4 px-20 h-[200px]">
                    <h1 className="text-2xl font-bold text-white">Titulo</h1>
                    <p className="text-white">Conteúdo</p>
                </div>
            </div>
        </div>
    )
}