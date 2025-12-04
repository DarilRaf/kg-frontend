"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Users, Landmark, MapPin } from "lucide-react";

export default function LocationPage() {
  const { name } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!name) return;
    const locName = decodeURIComponent(name as string);
    fetch(`http://localhost:8000/location/${encodeURIComponent(locName)}`)
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

      {/* HERO SECTION */}
      <div className="h-[50vh] w-full relative overflow-hidden bg-stone-800">
        {data.image ? (
            <img src={data.image} className="w-full h-full object-cover opacity-80" />
        ) : (
            <div className="w-full h-full flex items-center justify-center bg-stone-300">
                <MapPin className="w-20 h-20 text-stone-400" />
            </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-10 md:p-20">
            <div>
                <span className="text-[#C6A87C] tracking-widest uppercase font-bold text-sm mb-2 block">Location</span>
                <h1 className="text-6xl md:text-8xl font-serif text-white font-bold">{data.name}</h1>
            </div>
        </div>
      </div>

      <div className="px-6 md:px-20 max-w-7xl mx-auto -mt-16 relative z-10">
        {/* DESCRIPTION CARD */}
        <div className="bg-white p-8 md:p-12 shadow-xl border-t-4 border-[#C6A87C] mb-16">
            <p className="text-xl md:text-2xl font-serif text-stone-600 leading-relaxed">
                {data.description || "A significant location in the history of art."}
            </p>
        </div>

        {/* ARTISTS GRID */}
        <div className="mb-16">
            <h2 className="font-serif text-4xl mb-8 flex items-center gap-3 border-b border-stone-300 pb-4">
                <Users className="w-8 h-8 text-[#C6A87C]" /> Famous Residents
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {data.artists.map((artist: any) => (
                    <div key={artist.name} 
                         onClick={() => router.push(`/artist/${encodeURIComponent(artist.name)}`)}
                         className="p-6 bg-white border border-[#E5E0D8] hover:border-[#C6A87C] hover:shadow-lg cursor-pointer transition-all text-center group">
                        <span className="font-serif text-lg group-hover:text-[#C6A87C] transition-colors">{artist.name}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* ARTWORKS GRID */}
        <div>
            <h2 className="font-serif text-4xl mb-8 flex items-center gap-3 border-b border-stone-300 pb-4">
                <Landmark className="w-8 h-8 text-[#C6A87C]" /> Artworks Found Here
            </h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {data.artworks.map((art: any) => (
                    <div key={art.id} onClick={() => router.push(`/artwork/${art.id}`)} className="cursor-pointer group">
                        <div className="aspect-[4/3] overflow-hidden bg-stone-200 mb-3">
                             <img src={art.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                        </div>
                        <h4 className="font-serif text-lg leading-tight group-hover:text-[#C6A87C] transition-colors">{art.title}</h4>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </main>
  );
}