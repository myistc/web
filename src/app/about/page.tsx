import { Metadata } from "next";
import { Target, Eye, ShieldCheck, Leaf, BookOpen, Activity, Heart, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Al-Shifa Unani Medical College",
  description: "Learn about Al-Shifa Unani Medical College, our heritage in Greco-Arabic medicine, our mission, vision, and our commitment to academic and clinical excellence.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero / Banner Section */}
      <section className="relative bg-primary-dark py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10 mix-blend-overlay" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent opacity-80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-primary-light font-semibold tracking-wider uppercase text-sm mb-4">
            <span className="w-8 h-px bg-primary-light"></span>
            Our Journey
            <span className="w-8 h-px bg-primary-light"></span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Rooted in Tradition. <br className="hidden sm:block" />
            <span className="text-primary-light">Focused on the Future.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover the legacy of Al-Shifa Unani Medical College, where the ancient wisdom of Greco-Arabic healing meets contemporary clinical excellence.
          </p>
        </div>
      </section>

      {/* 2. About Institution */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden relative shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-multiply"></div>
                {/* Decorative placeholder for building image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShieldCheck className="w-32 h-32 text-slate-300 opacity-50" />
                </div>
              </div>
              {/* Floating Stat Card */}
              <div className="absolute -bottom-6 -right-6 md:-right-8 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-4">
                <div className="w-14 h-14 bg-primary-light rounded-full flex items-center justify-center shrink-0">
                  <Award className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-slate-900">25+</div>
                  <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Years of Excellence</div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                A Legacy of Healing and <span className="text-primary">Academic Brilliance</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Established in 2001, Al-Shifa Unani Medical College is recognized by the National Commission for Indian System of Medicine (NCISM) and the Ministry of AYUSH, Government of India. 
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                We offer a comprehensive Bachelor of Unani Medicine and Surgery (BUMS) program designed to nurture compassionate, skilled, and culturally rooted healthcare professionals. Our 15-acre campus houses state-of-the-art laboratories, a vast library, an extensive herbal garden, and a fully functional 150-bed multi-specialty clinical hospital.
              </p>
              <div className="pt-4 flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-3xl font-extrabold text-primary">500+</span>
                  <span className="text-sm text-slate-500 font-medium">Alumni Worldwide</span>
                </div>
                <div className="w-px h-12 bg-slate-200"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-extrabold text-primary">150</span>
                  <span className="text-sm text-slate-500 font-medium">Hospital Beds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vision and Mission */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Vision Card */}
            <article className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform duration-300">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To emerge as a premier institution of global repute in Unani medicine, setting benchmarks in quality education, innovative clinical research, and compassionate healthcare delivery, while preserving the authenticity of Greco-Arabic healing traditions.
              </p>
            </article>

            {/* Mission Card */}
            <article className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform duration-300">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0"></span>
                  To impart rigorous academic and clinical training to future Hakims.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0"></span>
                  To promote evidence-based research in Unani pharmacology and therapeutics.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0"></span>
                  To serve the community by providing accessible, holistic, and natural healthcare solutions.
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* 4. Heritage / Traditional Healing Section */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -right-40 -top-40 w-[500px] h-[500px] rounded-full bg-primary-light/50 blur-3xl opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
              The Greco-Arabic Heritage
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Unani-Tibb is a comprehensive medical system originating in ancient Greece, enriched by Arab and Persian scholars like Hippocrates, Galen, and Avicenna. It is based on the theory of the presence of the elements (Arkan) and humors (Akhlat) in the human body.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100 shadow-inner">
                <Heart className="w-10 h-10 text-primary" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Holistic Healing</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                We focus on treating the root cause of the disease by assessing the physical, mental, and spiritual well-being, rather than just alleviating symptoms.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100 shadow-inner">
                <Leaf className="w-10 h-10 text-primary" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Ilaj-Bil-Tadbeer</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Emphasis on regimental therapy, dietary modifications (Ilaj-Bil-Ghiza), and natural pharmacotherapy (Ilaj-Bil-Dawa) to restore the body's natural equilibrium (Mizaj).
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100 shadow-inner">
                <ShieldCheck className="w-10 h-10 text-primary" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Tabiyat (Medicatrix Naturae)</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our pedagogy emphasizes empowering the body's supreme power of self-preservation and natural healing mechanisms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us Section */}
      <section className="py-20 lg:py-28 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Why Choose Al-Shifa?
            </h2>
            <p className="text-primary-light text-lg max-w-2xl mx-auto">
              We provide an ecosystem that nurtures intellectual curiosity, clinical competence, and ethical medical practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Activity,
                title: "150-Bed Hospital",
                desc: "Extensive hands-on clinical training in IPD and OPD departments with high daily footfall."
              },
              {
                icon: BookOpen,
                title: "Central Library",
                desc: "A vast repository of ancient manuscripts, modern medical journals, and digital resources."
              },
              {
                icon: Leaf,
                title: "Herbal Garden",
                desc: "Home to over 400 species of rare medicinal plants for practical identification and research."
              },
              {
                icon: ShieldCheck,
                title: "Expert Faculty",
                desc: "Learn from distinguished scholars, researchers, and practicing physicians in the field of Unani."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors duration-300 text-center sm:text-left">
                <feature.icon className="w-10 h-10 text-white mb-6 mx-auto sm:mx-0" />
                <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                <p className="text-primary-light text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
