"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Baby, Skull, Palette, Calendar } from "lucide-react";

export default function YearPage() {
  const { id } = useParams(); // id = tahun (misal "1888")
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8000/year/${id}`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, [id]);

  if (!data) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <main className="min-h-screen bg-[#F2F0E9] text-[#2A2826] font-sans pb-20">
       <button onClick={() => router.back()} className="fixed top-6 left-6 z-50 p-3 bg-white/80 backdrop-blur rounded-full shadow-md hover:bg-white transition-all">
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* HERO SECTION */}
      <div className="h-[40vh] w-full flex items-center justify-center bg-stone-900 text-[#C6A87C] relative overflow-hidden">
        {/* Background Angka Besar */}
        <span className="text-[15rem] md:text-[25rem] font-serif font-bold opacity-5 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {data.year}
        </span>
        
        <div className="z-10 text-center">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-white opacity-50" />
            <h1 className="text-6xl md:text-9xl font-serif text-white font-bold tracking-tighter">{data.year}</h1>
            <p className="text-stone-400 tracking-[0.3em] uppercase mt-4 text-sm">Timeline Archive</p>
        </div>
      </div>

      <div className="px-6 md:px-20 max-w-6xl mx-auto -mt-12 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* KOLOM KIRI: ORANG (Lahir & Mati) */}
        <div className="bg-white p-8 shadow-xl border-t-4 border-stone-800 rounded-sm">
            
            {/* BORN */}
            <div className="mb-10">
                <h2 className="font-serif text-3xl mb-6 flex items-center gap-3 text-stone-800">
                    <Baby className="w-6 h-6 text-stone-400" /> Born
                </h2>
                <div className="flex flex-wrap gap-2">
                    {data.born_list.length > 0 ? data.born_list.map((p: any) => (
                        <div key={p.name} 
                              onClick={() => router.push(`/artist/${encodeURIComponent(p.name)}`)}
                              className="px-3 py-1.5 bg-stone-100 hover:bg-[#C6A87C] hover:text-white cursor-pointer rounded-md text-sm transition-colors border border-stone-200">
                            {p.name}
                        </div>
                    )) : <span className="text-stone-400 italic text-sm">No records found.</span>}
                </div>
            </div>

            <hr className="border-stone-200 mb-10" />

            {/* DIED */}
            <div>
                <h2 className="font-serif text-3xl mb-6 flex items-center gap-3 text-stone-800">
                    <Skull className="w-6 h-6 text-stone-400" /> Died
                </h2>
                <div className="flex flex-wrap gap-2">
                    {data.died_list.length > 0 ? data.died_list.map((p: any) => (
                        <div key={p.name} 
                              onClick={() => router.push(`/artist/${encodeURIComponent(p.name)}`)}
                              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-800 hover:text-white cursor-pointer rounded-md text-sm transition-colors border border-stone-200">
                            {p.name}
                        </div>
                    )) : <span className="text-stone-400 italic text-sm">No records found.</span>}
                </div>
            </div>
        </div>

        {/* KOLOM KANAN: KARYA SENI */}
        <div className="bg-white p-8 shadow-xl border-t-4 border-[#C6A87C] rounded-sm">
            <h2 className="font-serif text-3xl mb-6 flex items-center gap-3 text-stone-800">
                <Palette className="w-6 h-6 text-[#C6A87C]" /> Creations
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
                {data.artworks.map((art: any) => (
                    <div key={art.id} onClick={() => router.push(`/artwork/${art.id}`)} className="cursor-pointer group">
                        <div className="aspect-square overflow-hidden bg-stone-200 mb-2 rounded-sm relative">
                             <img src={art.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                        </div>
                        <h4 className="font-serif text-sm leading-tight group-hover:text-[#C6A87C] transition-colors">{art.title}</h4>
                    </div>
                ))}
            </div>
            
            {data.artworks.length === 0 && (
                <div className="h-40 flex items-center justify-center text-stone-400 italic text-sm bg-stone-50 rounded-sm">
                    No artworks recorded in this year.
                </div>
            )}
        </div>

      </div>
    </main>
  );
}