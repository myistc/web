import Image from "next/image";
import { getGalleryImages } from "@/services/gallery";

export const metadata = {
  title: "Gallery | Al-Shifa Unani Medical College",
  description: "Explore our state-of-the-art facilities, lush herbal gardens, and vibrant campus life through our visual gallery.",
};

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <div className="bg-slate-50 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <header className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Campus <span className="text-primary">Gallery</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Take a visual journey through Al-Shifa Unani Medical College. 
            Experience our commitment to blending traditional healing environments 
            with modern academic infrastructure.
          </p>
        </header>

        {/* Gallery Grid or Empty State */}
        {images.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Images Available</h3>
            <p className="text-slate-500">Check back soon for updates to our campus gallery.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((item) => (
              <article 
                key={item.id} 
                className="relative group overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={false}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-primary/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider border border-white/10">
                    {item.category}
                  </span>
                </div>

                {/* Title Display */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h2 className="text-xl font-bold text-white mb-2 line-clamp-2 drop-shadow-md">
                    {item.title}
                  </h2>
                  <div className="w-8 h-1 bg-primary rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </article>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
}
