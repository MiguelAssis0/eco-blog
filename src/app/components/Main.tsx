import Link from "next/link";

export default function Main() {
    return (
        <div className="flex flex-col w-full justify-between py-8 px-8 gap-5">
            <div className="flex w-full justify-between ">
                <div className=" flex flex-col justify-end p-20 w-full bg-slate-500 h-[600px] rounded-3xl">
                    <h1 className="text-2xl font-bold text-white">Titulo</h1>
                    <p className="text-white">Conteúdo</p>    
                    <Link href="/" >Leia mais</Link>
                </div>
            </div>
            <div className="flex w-full justify-center flex-wrap">
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item,) => {
                        return (
                            <div key={item} className=" flex flex-col justify-end p-10 w-1/4 m-1 bg-slate-500 h-[300px] rounded-3xl">
                                <h1 className="text-2xl font-bold text-white">Titulo</h1>
                                <p className="text-white">Conteúdo</p>
                                <Link href="/" >Leia mais</Link>
                            </div>
                    )} 
                    )
                }
                
            </div>
        </div>
    );
}