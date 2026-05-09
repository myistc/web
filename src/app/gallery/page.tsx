import { Metadata } from "next";
import Image from "next/image";
import { getVisibleGalleryImages } from "@/services/gallery";
import { ImageIcon, Star, LayoutGrid, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Gallery | Al-Shifa Unani Medical College",
  description: "Explore our state-of-the-art facilities, lush herbal gardens, and vibrant campus life through our visual gallery.",
};

export default async function GalleryPage() {
  const images = await getVisibleGalleryImages();

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Header Section */}
      <section className="relative bg-primary-dark py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10 mix-blend-overlay" aria-hidden="true"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-light font-semibold text-sm mb-6 border border-white/20 backdrop-blur-sm">
            <LayoutGrid className="w-4 h-4" />
            <span>Campus Tour</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Visual <span className="text-primary-light">Journey</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Witness the fusion of ancient wisdom and modern technology. From our state-of-the-art labs to the sprawling herbal gardens, explore the environment where tradition meets science.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {images.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-slate-100 max-w-2xl mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-50 flex items-center justify-center">
              <ImageIcon className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Portfolio Updating</h3>
            <p className="text-slate-500">
              Our campus photographers are currently updating our visual records. Please visit again shortly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {images.map((item) => (
              <article 
                key={item.id} 
                className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl hover:border-primary/20 transition-all duration-500"
              >
                {/* Image Wrapper */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  
                  {/* Badges Container */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
                    <span className="bg-white/95 backdrop-blur-sm text-primary font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm border border-slate-100">
                      {item.category}
                    </span>
                    
                    {item.featured && (
                      <div className="bg-amber-400 text-amber-950 p-1.5 rounded-lg shadow-lg flex items-center gap-1 animate-pulse">
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </div>
                    )}
                  </div>

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                </div>

                {/* Content Overlay / Info */}
                <div className="p-6">
                  <h2 className="text-lg font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h2>
                  <div className="mt-4 flex items-center gap-2 text-slate-400">
                    <Building2 className="w-4 h-4" />
                    <span className="text-xs font-medium uppercase tracking-tight">Institutional Facility</span>
                  </div>
                </div>
                
                {/* Interactive Accent */}
                <div className="absolute bottom-0 left-0 h-1 bg-primary w-0 group-hover:w-full transition-all duration-500 ease-in-out" />
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Institutional Note Footer */}
      <section className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm font-medium uppercase tracking-widest flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-slate-200"></span>
            Accredited Academic Environment
            <span className="h-px w-8 bg-slate-200"></span>
          </p>
        </div>
      </section>
    </div>
  );
}

