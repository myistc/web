import Link from "next/link";
import { BookOpen, Leaf, Microscope, Users, Award, Building, Activity, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative bg-slate-50 pt-24 pb-32 overflow-hidden border-b border-primary/10">
        <div className="absolute inset-0 bg-primary/5 pattern-dots" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Admissions Open for 2026-27 Session
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 max-w-5xl leading-tight">
            Tradition of Healing.<br className="hidden md:block" />
            <span className="text-primary">Excellence in Science.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
            Welcome to Al-Shifa Unani Medical College. We bridge ancient Greaco-Arabic 
            healing traditions with contemporary clinical research to shape the next 
            generation of holistic healthcare professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/admissions"
              className="inline-flex justify-center items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
            >
              Apply Now
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/courses"
              className="inline-flex justify-center items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Statistics Section */}
      <section className="bg-primary text-white py-12 border-y border-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-primary-light/20">
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-extrabold mb-2">25+</span>
              <span className="text-primary-light text-sm font-medium uppercase tracking-wider">Years of Legacy</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-extrabold mb-2">500+</span>
              <span className="text-primary-light text-sm font-medium uppercase tracking-wider">Students</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-extrabold mb-2">50+</span>
              <span className="text-primary-light text-sm font-medium uppercase tracking-wider">Expert Faculty</span>
            </div>
            <div className="flex flex-col items-center border-l-0 md:border-l">
              <span className="text-4xl md:text-5xl font-extrabold mb-2">100%</span>
              <span className="text-primary-light text-sm font-medium uppercase tracking-wider">Clinical Exposure</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. About Preview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-primary font-bold tracking-wider uppercase text-sm mb-2">
                <span className="w-8 h-0.5 bg-primary rounded-full"></span>
                About The Institution
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                Nurturing Healers Through <br />
                Time-Tested Wisdom
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Recognized by the National Commission for Indian System of Medicine (NCISM), 
                our BUMS curriculum offers an immersive educational experience. We believe 
                in a holistic approach, treating the root cause of ailments by balancing 
                the body's natural humors.
              </p>
              <ul className="space-y-4 pt-4">
                {[
                  "Comprehensive curriculum integrating classical texts and modern diagnostics.",
                  "Hands-on clinical training at our attached 150-bed multi-specialty hospital.",
                  "Extensive herbal garden with over 400 species of medicinal plants.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Activity className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6">
                <Link
                  href="/about"
                  className="text-primary font-bold hover:text-primary-dark transition-colors inline-flex items-center gap-1 group"
                >
                  Read our full history
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-slate-100 overflow-hidden relative shadow-2xl">
                {/* Placeholder for an actual image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                  <Building className="w-24 h-24 opacity-20" />
                </div>
              </div>
              {/* Decorative block */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-slate-100 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">NCISM</p>
                    <p className="text-sm text-slate-500">Approved Institution</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Feature Cards Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Academic Excellence</h2>
            <p className="text-lg text-slate-600">
              Our pedagogical approach is designed to produce competent, compassionate, 
              and culturally rooted medical professionals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Rigorous Curriculum",
                desc: "5.5 years of intensive study, including a 1-year mandatory internship covering Kulliyat, Moalajat, and Ilmul Jarahat.",
              },
              {
                icon: Microscope,
                title: "Modern Research",
                desc: "State-of-the-art pathology, anatomy, and physiology laboratories equipped for advanced pharmacological research.",
              },
              {
                icon: Users,
                title: "Expert Mentorship",
                desc: "Learn from distinguished Hakims and modern medical practitioners dedicated to student success and clinical mastery.",
              },
            ].map((feature, i) => (
              <div 
                key={i} 
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <feature.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Facilities Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Campus Facilities</h2>
              <p className="text-lg text-slate-600">
                A serene, 15-acre campus designed to foster learning, healing, and holistic growth.
              </p>
            </div>
            <Link
              href="/facilities"
              className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors"
            >
              View All Facilities <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Central Library", icon: BookOpen, bg: "bg-slate-100" },
              { title: "Herbal Garden", icon: Leaf, bg: "bg-primary-light" },
              { title: "Clinical Hospital", icon: Activity, bg: "bg-slate-100" },
            ].map((facility, i) => (
              <div 
                key={i}
                className={`relative aspect-[4/3] rounded-2xl overflow-hidden group ${facility.bg} flex items-center justify-center border border-slate-200/50`}
              >
                <facility.icon className="w-16 h-16 text-slate-300 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-white">{facility.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Admissions Call-to-Action */}
      <section className="bg-primary py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Begin Your Journey in Unani Medicine
          </h2>
          <p className="text-xl text-primary-light mb-10 leading-relaxed max-w-2xl mx-auto">
            Take the first step towards a rewarding career as a healer. 
            Download our prospectus or speak with our admissions counselors today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/admissions"
              className="w-full sm:w-auto bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-slate-50 transition-colors shadow-xl"
            >
              Start Application
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-transparent text-white border-2 border-white/30 px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors"
            >
              Contact Counselors
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
