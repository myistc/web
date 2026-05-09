import { Metadata } from "next";
import { 
  GraduationCap, 
  Clock, 
  BookOpen, 
  FileText, 
  Microscope, 
  Stethoscope, 
  HeartPulse, 
  Briefcase, 
  CheckCircle2, 
  Award,
  Globe
} from "lucide-react";

export const metadata: Metadata = {
  title: "Courses & Programs | Al-Shifa Unani Medical College",
  description: "Explore our Bachelor of Unani Medicine and Surgery (BUMS) program, departments, eligibility criteria, and diverse career opportunities in the field of alternative medicine.",
};

export default function CoursesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* 1. Hero / Banner Section */}
      <section className="relative bg-primary-dark py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10 mix-blend-overlay" aria-hidden="true"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-light font-semibold text-sm mb-6 border border-white/20 backdrop-blur-sm">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Excellence</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Academic <span className="text-primary-light">Programs</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Comprehensive education blending ancient Greaco-Arabic medical wisdom with modern scientific advancements to shape the healers of tomorrow.
          </p>
        </div>
      </section>

      {/* 2. BUMS Program Overview & 3. Duration/Eligibility */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Content: Overview */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-primary font-bold tracking-wider uppercase text-sm mb-2">
                <span className="w-8 h-0.5 bg-primary rounded-full"></span>
                Primary Degree Program
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                Kamil-E-Tibb-O-Jarahat <br />
                <span className="text-2xl md:text-3xl font-semibold text-slate-600 block mt-2">
                  (Bachelor of Unani Medicine & Surgery - B.U.M.S.)
                </span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                The BUMS degree is a comprehensive undergraduate program designed to impart profound knowledge of the Unani system of medicine alongside contemporary medical science. Our curriculum is strictly aligned with the guidelines established by the National Commission for Indian System of Medicine (NCISM), New Delhi.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Students receive rigorous training in theoretical principles, extensive practical laboratory work, and intensive clinical exposure in our attached 150-bed hospital, ensuring they graduate as competent, compassionate, and confident medical practitioners.
              </p>
            </div>

            {/* Right Content: Quick Facts & Eligibility Cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* Quick Facts Card */}
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-primary" />
                  Program Details
                </h3>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center pb-4 border-b border-slate-200">
                    <span className="text-slate-600 font-medium">Duration</span>
                    <span className="text-slate-900 font-bold text-right">5.5 Years<br/><span className="text-xs font-normal text-slate-500">(4.5 Academic + 1 Yr Internship)</span></span>
                  </li>
                  <li className="flex justify-between items-center pb-4 border-b border-slate-200">
                    <span className="text-slate-600 font-medium">Annual Intake</span>
                    <span className="text-slate-900 font-bold">60 Seats</span>
                  </li>
                  <li className="flex justify-between items-center pb-4 border-b border-slate-200">
                    <span className="text-slate-600 font-medium">Medium of Instruction</span>
                    <span className="text-slate-900 font-bold text-right">Urdu / English</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Recognition</span>
                    <span className="text-slate-900 font-bold text-right">NCISM & Ministry of AYUSH</span>
                  </li>
                </ul>
              </div>

              {/* Eligibility Card */}
              <div className="bg-primary-light rounded-2xl p-8 border border-primary/20 shadow-sm">
                <h3 className="text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary" />
                  Eligibility Criteria
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm leading-relaxed">
                      <strong>10+2 (Science):</strong> Physics, Chemistry, and Biology with a minimum of 50% aggregate marks from a recognized board.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm leading-relaxed">
                      <strong>Language:</strong> Must have passed Urdu, Arabic, or Persian as a subject in the 10th standard (or equivalent exam).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm leading-relaxed">
                      <strong>Entrance Exam:</strong> Mandatory qualification in the NEET-UG examination for the current academic year.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Department Highlights */}
      <section className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
              Academic Departments
            </h2>
            <p className="text-lg text-slate-600">
              Our curriculum is divided across specialized departments, each equipped with modern laboratories, museums, and dedicated faculty to provide an in-depth understanding of Unani medicine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Kulliyat (Basic Principles)",
                icon: BookOpen,
                desc: "Focuses on the fundamental principles (Umoor-e-Tabiya) of Unani medicine, including elements, temperaments (Mizaj), and humors (Akhlat)."
              },
              {
                title: "Tashreeh-ul-Badan (Anatomy)",
                icon: Microscope,
                desc: "Comprehensive study of human anatomy integrating classical Unani concepts with modern anatomical science, supported by a state-of-the-art dissection hall."
              },
              {
                title: "Munafe-ul-Aza (Physiology)",
                icon: HeartPulse,
                desc: "Explores the physiological functions of the human body and the mechanisms of health and disease from both Unani and modern perspectives."
              },
              {
                title: "Ilmul Advia (Pharmacology)",
                icon: Microscope,
                desc: "In-depth study of single and compound drugs (Mufradat and Murakkabat), pharmacognosy, and herbal formulations."
              },
              {
                title: "Moalajat (Medicine)",
                icon: Stethoscope,
                desc: "The core clinical department dealing with the diagnosis and non-surgical treatment of systemic diseases based on Unani principles."
              },
              {
                title: "Ilmul Jarahat (Surgery)",
                icon: Stethoscope,
                desc: "Training in basic surgical principles, wound management, and minor surgical procedures utilizing classical Unani and modern techniques."
              }
            ].map((dept, idx) => (
              <div 
                key={idx} 
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <dept.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{dept.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{dept.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Career Opportunities */}
      <section className="py-20 lg:py-28 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Medical Officer", icon: Briefcase, desc: "Government hospitals, dispensaries, and primary health centers (AYUSH)." },
                { title: "Private Practice", icon: Stethoscope, desc: "Establish independent clinics to provide holistic healthcare to the community." },
                { title: "Academician", icon: GraduationCap, desc: "Pursue PG (MD/MS) and join medical colleges as lecturers and professors." },
                { title: "Research Scientist", icon: Microscope, desc: "Join CCRUM or pharmaceutical companies for clinical and drug research." }
              ].map((career, idx) => (
                <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-primary/30 transition-colors">
                  <career.icon className="w-8 h-8 text-primary mb-4" />
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{career.title}</h4>
                  <p className="text-sm text-slate-600">{career.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                Vast Career <span className="text-primary">Opportunities</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                A BUMS degree opens doors to a highly respected and rewarding career path. With the growing global interest in alternative, holistic, and natural healthcare, the demand for qualified Unani physicians is higher than ever.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our graduates are highly sought after in both the public and private sectors, pharmaceutical industries, and academic institutions across India and internationally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Study Unani Medicine */}
      <section className="py-20 lg:py-24 bg-primary text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Globe className="w-16 h-16 text-primary-light mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Why Choose Unani Medicine?
          </h2>
          <p className="text-xl text-primary-light leading-relaxed mb-10">
            Unani medicine is not just a method of treating diseases; it is a holistic way of life. By focusing on preventative care, enhancing the body's natural immunity, and using natural remedies, you will learn to heal the whole person—mind, body, and spirit—creating a lasting impact on global health.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/admissions" 
              className="inline-flex justify-center items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-slate-50 transition-colors shadow-lg"
            >
              Apply for Admissions
            </a>
            <a 
              href="/contact" 
              className="inline-flex justify-center items-center gap-2 bg-transparent text-white border border-white/30 px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors"
            >
              Request Syllabus
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
