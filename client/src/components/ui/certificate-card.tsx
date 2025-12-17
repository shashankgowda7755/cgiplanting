import { QRCodeSVG } from "qrcode.react";
import { Goal } from "@/lib/goals";
import { Card } from "@/components/ui/card";
import { forwardRef } from "react";
import { Globe, User } from "lucide-react";

interface CertificateProps {
  name: string;
  goal: Goal;
  story?: string;
  date: string;
  pledgeId: string;
  photoUrl?: string | null;
}

export const Certificate = forwardRef<HTMLDivElement, CertificateProps>(
  ({ name, goal, story, date, pledgeId, photoUrl }, ref) => {
    return (
      <Card
        ref={ref}
        className="relative w-full max-w-[800px] aspect-[1.414/1] bg-white text-black overflow-hidden shadow-2xl border-0"
        style={{
          background: `linear-gradient(135deg, #fff 0%, #f8f9fa 100%)`,
        }}
      >
        {/* Decorative Border */}
        <div 
          className="absolute inset-4 border-4 border-double z-10 pointer-events-none" 
          style={{ borderColor: goal.color }}
        />

        {/* Corner Accents */}
        <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 z-10 pointer-events-none" style={{ borderColor: goal.color }} />
        <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 z-10 pointer-events-none" style={{ borderColor: goal.color }} />
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 z-10 pointer-events-none" style={{ borderColor: goal.color }} />
        <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 z-10 pointer-events-none" style={{ borderColor: goal.color }} />

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col p-12 z-20">
          
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight mb-2 uppercase text-slate-900">
              Certificate of Pledge
            </h1>
            <p className="text-slate-500 font-serif italic text-lg">
              Official Commitment to the Sustainable Development Goals
            </p>
          </div>

          {/* Main Body - Split Layout */}
          <div className="flex-1 flex items-center justify-center gap-8 px-4">
            
            {/* Left: Photo & Goal */}
            <div className="flex flex-col items-center gap-4">
               {/* User Photo */}
               <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 shadow-lg overflow-hidden bg-slate-100 flex items-center justify-center relative" style={{ borderColor: goal.color }}>
                  {photoUrl ? (
                    <img src={photoUrl} alt="Pledger" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-16 h-16 text-slate-300" />
                  )}
                  {/* Badge Overlay */}
                  <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm">
                     <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: goal.color }}>
                        {goal.id}
                     </div>
                  </div>
               </div>
            </div>

            {/* Right: Text Details */}
            <div className="flex-1 text-left flex flex-col justify-center">
              <p className="text-lg text-slate-600 mb-1">This certifies that</p>
              
              <h2 className="font-serif text-3xl md:text-4xl font-bold border-b-2 py-2 mb-4 inline-block" style={{ borderColor: goal.color }}>
                {name}
              </h2>

              <p className="text-lg text-slate-600 mb-2">
                Has officially pledged to support <strong>SDG {goal.id}: {goal.title}</strong>
              </p>

              {story && (
                <div className="relative mt-2 p-4 bg-slate-50 rounded-lg border border-slate-100 italic text-slate-600 text-sm max-w-md">
                   <span className="absolute top-2 left-2 text-2xl leading-none text-slate-300">"</span>
                   {story}
                   <span className="absolute bottom-0 right-2 text-2xl leading-none text-slate-300">"</span>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="w-full flex items-end justify-between mt-4 pt-4 border-t border-slate-200">
            <div className="text-left">
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Date Issued</p>
              <p className="font-mono font-medium">{date}</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-32 h-px bg-slate-300 mb-2"></div>
              <p className="font-serif text-sm text-slate-500 italic">Global Pledge Initiative</p>
            </div>

            <div className="flex items-center gap-3">
               <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mb-1">Official Verify</p>
                  <p className="font-mono font-bold text-sm tracking-widest">{pledgeId.slice(0, 8)}</p>
               </div>
               <div className="bg-white p-1.5 shadow-sm border border-slate-100 rounded">
                <QRCodeSVG value={`https://global-pledge.replit.app/verify/${pledgeId}`} size={56} />
               </div>
            </div>
          </div>
        </div>

        {/* Watermark */}
        <div 
          className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0"
        >
          <Globe className="w-96 h-96" />
        </div>
      </Card>
    );
  }
);

Certificate.displayName = "Certificate";
