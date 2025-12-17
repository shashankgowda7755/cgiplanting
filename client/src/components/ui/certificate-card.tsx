import { QRCodeSVG } from "qrcode.react";
import { Goal } from "@/lib/goals";
import { Card } from "@/components/ui/card";
import { forwardRef } from "react";
import { Globe } from "lucide-react";

interface CertificateProps {
  name: string;
  goal: Goal;
  story?: string;
  date: string;
  pledgeId: string;
}

export const Certificate = forwardRef<HTMLDivElement, CertificateProps>(
  ({ name, goal, story, date, pledgeId }, ref) => {
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
          className="absolute inset-4 border-4 border-double" 
          style={{ borderColor: goal.color }}
        />

        {/* Corner Accents */}
        <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4" style={{ borderColor: goal.color }} />
        <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4" style={{ borderColor: goal.color }} />
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4" style={{ borderColor: goal.color }} />
        <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4" style={{ borderColor: goal.color }} />

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center z-10">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-2 uppercase text-slate-900">
              Certificate of Pledge
            </h1>
            <p className="text-slate-500 font-serif italic text-lg">
              Official Commitment to the Sustainable Development Goals
            </p>
          </div>

          {/* Body */}
          <div className="flex-1 flex flex-col items-center justify-center space-y-6">
            <p className="text-xl text-slate-600">This certifies that</p>
            
            <h2 className="font-serif text-3xl md:text-4xl font-bold border-b-2 px-8 py-2 min-w-[300px]" style={{ borderColor: goal.color }}>
              {name}
            </h2>

            <p className="text-xl text-slate-600">
              Has officially pledged to support
            </p>

            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div 
                className="w-16 h-16 flex items-center justify-center text-white font-bold text-2xl rounded shadow-sm"
                style={{ backgroundColor: goal.color }}
              >
                {goal.id}
              </div>
              <div className="text-left">
                <h3 className="font-bold text-xl leading-none mb-1">{goal.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 max-w-[300px]">{goal.description}</p>
              </div>
            </div>

            {story && (
              <p className="text-slate-500 italic max-w-lg text-sm mt-4">
                "{story}"
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="w-full flex items-end justify-between mt-8 pt-6 border-t border-slate-200">
            <div className="text-left">
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Date Issued</p>
              <p className="font-mono font-medium">{date}</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-32 h-px bg-slate-300 mb-2"></div>
              <p className="font-serif text-sm text-slate-500 italic">Global Pledge Initiative</p>
            </div>

            <div className="flex flex-col items-end">
               <div className="bg-white p-2 shadow-sm border border-slate-100 rounded">
                <QRCodeSVG value={`https://global-pledge.replit.app/verify/${pledgeId}`} size={64} />
               </div>
               <p className="text-[10px] text-slate-400 font-mono mt-1">ID: {pledgeId.slice(0, 8)}</p>
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
