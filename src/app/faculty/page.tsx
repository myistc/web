import { Metadata } from "next";
import Image from "next/image";
import { getOrderedFaculty } from "@/services/faculty";
import { Users, GraduationCap, BookOpen, User, ShieldCheck, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Faculty | Al-Shifa Unani Medical College",
  description: "Meet our distinguished faculty members, experts in Unani medicine and modern medical sciences dedicated to shaping the healers of tomorrow.",
};

export default async function FacultyPage() {
  const facultyList = await getOrderedFaculty("manual");

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero / Banner Section */}
      <section className="relative bg-primary-dark py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10 mix-blend-overlay" aria-hidden="true"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-light font-semibold text-sm mb-6 border border-white/20 backdrop-blur-sm">
            <Users className="w-4 h-4" />
            <span>Academic Excellence</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Our Distinguished <span className="text-primary-light">Faculty</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Learn from esteemed scholars and experienced clinical practitioners dedicated to imparting the authentic wisdom of Unani medicine alongside modern scientific advancements.
          </p>
        </div>
      </section>

      {/* Faculty Roster Section */}
      <section className="py-16 lg:py-24 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Empty State */}
          {facultyList.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-slate-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Faculty Directory Updating</h2>
              <p className="text-slate-500 leading-relaxed">
                We are currently updating our faculty profiles. Please check back later to view the complete list of our academic staff and departmental heads.
              </p>
            </div>
          ) : (
            /* Faculty Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {facultyList.map((faculty) => (
                <article 
                  key={faculty.id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group flex flex-col relative"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-[4/5] bg-slate-100 overflow-hidden border-b border-slate-100">
                    {faculty.image_url ? (
                      <Image
                        src={faculty.image_url}
                        alt={`Portrait of ${faculty.name}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-100 group-hover:bg-slate-200 transition-colors duration-300">
                        <User className="w-20 h-20 text-slate-300" />
                      </div>
                    )}
                    
                    {/* Featured Badge */}
                    {faculty.featured && (
                      <div className="absolute top-4 right-4 z-20">
                        <span className="bg-amber-400 text-amber-950 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-md shadow-md flex items-center gap-1.5">
                          <Star className="w-3 h-3 fill-amber-950" />
                          Featured
                        </span>
                      </div>
                    )}

                    {/* Decorative Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content Container */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                        {faculty.name}
                      </h3>
                      <p className="text-primary font-medium text-sm mt-1">
                        {faculty.designation}
                      </p>
                    </div>

                    <div className="mt-auto space-y-3 pt-4 border-t border-slate-100">
                      <div className="flex items-start gap-3 text-sm">
                        <BookOpen className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <span className="text-slate-600 line-clamp-2">
                          <strong className="font-semibold text-slate-700 block mb-0.5">Department</strong>
                          {faculty.department}
                        </span>
                      </div>
                      
                      <div className="flex items-start gap-3 text-sm">
                        <GraduationCap className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <span className="text-slate-600 line-clamp-2">
                          <strong className="font-semibold text-slate-700 block mb-0.5">Qualification</strong>
                          {faculty.qualification}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Trust Indicator Section */}
      <section className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShieldCheck className="w-12 h-12 text-primary-light mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold text-white mb-2">Committed to Quality Education</h2>
          <p className="text-primary-light max-w-2xl mx-auto text-sm md:text-base">
            All our faculty members meet the stringent eligibility criteria set by the National Commission for Indian System of Medicine (NCISM).
          </p>
        </div>
      </section>
    </div>
  );
}
