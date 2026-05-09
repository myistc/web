import { Metadata } from "next";
import { getNotices } from "@/services/notices";
import { BellRing, Calendar, Download, FileText, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Notice Board | Al-Shifa Unani Medical College",
  description: "Stay updated with the latest announcements, academic schedules, examination dates, and official notices from Al-Shifa Unani Medical College.",
};

// Helper function to format the date nicely
function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('en-IN', options);
}

export default async function NoticesPage() {
  const notices = await getNotices();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header Section */}
      <section className="relative bg-primary-dark py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10 mix-blend-overlay" aria-hidden="true"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-light font-semibold text-sm mb-6 border border-white/20 backdrop-blur-sm">
            <BellRing className="w-4 h-4" />
            <span>Official Announcements</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Notice <span className="text-primary-light">Board</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Find the latest updates regarding admissions, examinations, college events, and administrative circulars below.
          </p>
        </div>
      </section>

      {/* Notices List Section */}
      <section className="py-16 lg:py-24 flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Empty State */}
          {notices.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Info className="w-10 h-10 text-slate-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">No Notices Available</h2>
              <p className="text-slate-500 max-w-md mx-auto">
                There are currently no official notices or circulars to display. Please check back later for updates.
              </p>
            </div>
          ) : (
            /* Notices List */
            <div className="space-y-5">
              {notices.map((notice) => (
                <article 
                  key={notice.id} 
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 hover:shadow-md hover:border-primary/30 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6 group relative overflow-hidden"
                >
                  {/* Decorative Left Border */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary/20 group-hover:bg-primary transition-colors duration-300"></div>
                  
                  <div className="flex-1 pl-4 sm:pl-2">
                    {/* Date Badge */}
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-3">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={notice.publish_date}>
                        {formatDate(notice.publish_date)}
                      </time>
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-primary-dark transition-colors duration-300 mb-2">
                      {notice.title}
                    </h2>
                  </div>

                  {/* PDF Download Button */}
                  {notice.pdf_url && (
                    <div className="shrink-0 pl-4 sm:pl-0">
                      <a 
                        href={notice.pdf_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-50 text-slate-700 hover:bg-primary hover:text-white border border-slate-200 hover:border-primary rounded-xl font-bold transition-all duration-300 shadow-sm w-full sm:w-auto"
                        aria-label={`Download PDF for ${notice.title}`}
                      >
                        <FileText className="w-5 h-5" />
                        <span>View PDF</span>
                        <Download className="w-4 h-4 ml-1 opacity-70" />
                      </a>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
