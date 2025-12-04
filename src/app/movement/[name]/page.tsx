"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Brush, Palette, User } from "lucide-react";

export default function MovementPage() {
  const { name } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!name) return;
    const moveName = decodeURIComponent(name as string);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/movement/${encodeURIComponent(moveName)}`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, [name]);

  if (!data) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <main className="min-h-screen bg-[#F2F0E9] text-[#2A2826] font-sans pb-20">
       <button onClick={() => router.back()} className="fixed top-6 left-6 z-50 p-3 bg-white/80 backdrop-blur rounded-full shadow-md hover:bg-white transition-all">
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* HERO */}
      <div className="h-[50vh] w-full relative overflow-hidden bg-stone-900">
        {data.image ? (
            <img src={data.image} className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
        ) : null}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
                <span className="text-[#C6A87C] tracking-[0.5em] uppercase font-bold text-sm mb-4 block">Art Movement</span>
                <h1 className="text-6xl md:text-9xl font-serif text-white font-bold italic drop-shadow-2xl">{data.name}</h1>
            </div>
        </div>
      </div>

      <div className="px-6 md:px-20 max-w-7xl mx-auto mt-16">
        
        {/* INFO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            <div className="col-span-2">
                <p className="text-2xl font-serif text-stone-700 leading-relaxed first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:text-[#C6A87C]">
                    {data.description || `The ${data.name} movement represents a distinct style and philosophy in art history, influencing countless artists.`}
                </p>
            </div>
            <div className="col-span-1 border-l border-stone-300 pl-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4">Key Figures</h3>
                <ul className="space-y-2">
                    {data.artists.slice(0, 5).map((a: any) => (
                        <li key={a.name} 
                            onClick={() => router.push(`/artist/${encodeURIComponent(a.name)}`)}
                            className="font-serif text-lg cursor-pointer hover:text-[#C6A87C] hover:translate-x-1 transition-all">
                            {a.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        {/* GALLERY */}
        <div className="border-t border-[#C6A87C]/30 pt-10">
            <h2 className="font-serif text-4xl mb-10 flex items-center gap-3">
                <Palette className="w-8 h-8 text-[#C6A87C]" /> Masterpieces
            </h2>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {data.artworks.map((art: any) => (
                    <div key={art.id} onClick={() => router.push(`/artwork/${art.id}`)} className="break-inside-avoid cursor-pointer group">
                        <div className="relative overflow-hidden rounded-sm bg-stone-200 mb-2">
                             <img src={art.url} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <h4 className="font-serif text-xl leading-tight group-hover:underline decoration-1 underline-offset-4">{art.title}</h4>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </main>
  );
}