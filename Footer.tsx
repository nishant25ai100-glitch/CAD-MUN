import { Landmark, ArrowRight, CheckCircle2, Instagram, Linkedin, Twitter } from "lucide-react";
import { CONFIG } from "../data";

interface FooterProps {
  onOpenRegister: () => void;
}

export default function Footer({ onOpenRegister }: FooterProps) {
  const perks = [
    "Full 3-day conference access",
    "Premium Delegate Kit",
    "Cultural Evening Pass",
    "Certificate of Participation",
    "Networking Opportunities",
    "Meals & Refreshments included for all three days"
  ];

  const handleOfficialFormRedirect = () => {
    window.open(CONFIG.registrationUrl, "_blank");
  };

  return (
    <>
      {/* Registration Section exactly mirroring HTML Wireframe */}
      <section id="registration" className="py-20 lg:py-28 bg-gradient-to-b from-brand-bg2 to-brand-bg px-6 lg:px-12 text-center border-b border-brand-border/20">
        <div className="max-w-4xl mx-auto">
          
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 sm:p-14 relative overflow-hidden shadow-2xl">
            {/* Ambient gold glow highlight inside container */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-brand-gold/5 to-transparent blur-3xl pointer-events-none" />

            <span className="font-sans font-semibold text-xs tracking-widest text-brand-gold uppercase mb-3 block">
              Registration
            </span>
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-brand-text mb-6">
              Ready to Represent?
            </h2>
            <div className="w-10 h-[3px] bg-brand-gold mb-10 mx-auto rounded" />
            
            <p className="font-sans font-light text-brand-muted text-[15px] leading-relaxed max-w-2xl mx-auto mb-10">
              Secure your spot at Council of Diplomatic Affairs Season 1. Step into the arena alongside a premier network of thinkers, debaters, and future change makers.
            </p>

            {/* Perks Bullet Grid */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto mb-10">
              {perks.map((perk, perkIdx) => (
                <li key={perkIdx} className="font-sans font-light text-brand-muted text-sm flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>

            {/* Price Frame */}
            <div className="mb-10 text-center">
              <p className="font-sans font-medium text-[10px] sm:text-xs text-brand-muted tracking-widest uppercase mb-1">
                Registration Fee
              </p>
              <p className="font-syne font-extrabold text-4xl sm:text-5xl text-brand-gold tracking-tight">
                {CONFIG.fee}
              </p>
            </div>

            {/* Master Button Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={onOpenRegister}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold2 text-black font-syne font-extrabold text-[14px] tracking-wider uppercase px-8 py-4 rounded cursor-pointer shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                Apply Now &mdash; Secure Your Seat
              </button>
              <button
                onClick={handleOfficialFormRedirect}
                className="w-full sm:w-auto flex items-center justify-center gap-2 border border-brand-border hover:border-brand-border2 text-brand-muted hover:text-brand-text font-syne font-semibold text-[13px] tracking-wider uppercase px-8 py-4 rounded cursor-pointer transition-all duration-300"
              >
                Go to Google Forms
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="font-sans font-light text-[11px] text-brand-dim mt-6 leading-relaxed">
              Confirming your seat takes less than 3 minutes. After portfolio caching, you will review details on the verified Google registration forms.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-bg3 border-t border-brand-border/40 pt-16 pb-8 px-6 lg:px-12 relative overflow-hidden select-none">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Branding Column */}
            <div className="flex flex-col">
              <a href="#home" className="flex items-center gap-2 font-syne font-extrabold text-xl tracking-wider text-brand-gold mb-4 uppercase">
                CDA<span className="text-brand-text">MUN</span>
              </a>
              <p className="font-sans font-light text-brand-muted text-[13px] leading-relaxed max-w-xs">
                Council of Diplomatic Affairs &mdash; a premier Model United Nations conference platform where the next generation of global minds and policymakers find their voice.
              </p>
            </div>

            {/* Navigation Directory Column */}
            <div>
              <h4 className="font-syne font-bold text-[11px] text-brand-text tracking-widest uppercase mb-4">
                Navigate
              </h4>
              <ul className="font-sans font-light text-[13px] text-brand-muted space-y-2.5">
                <li><a href="#home" className="hover:text-brand-gold transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-brand-gold transition-colors">About</a></li>
                <li><a href="#committees" className="hover:text-brand-gold transition-colors">Committees</a></li>
                <li><a href="#schedule" className="hover:text-brand-gold transition-colors">Schedule</a></li>
                <li><a href="#team" className="hover:text-brand-gold transition-colors">Team</a></li>
              </ul>
            </div>

            {/* Quick Register Column */}
            <div>
              <h4 className="font-syne font-bold text-[11px] text-brand-text tracking-widest uppercase mb-4">
                Register
              </h4>
              <ul className="font-sans font-light text-[13px] text-brand-muted space-y-2.5">
                <li>
                  <button onClick={onOpenRegister} className="hover:text-brand-gold text-left transition-colors cursor-pointer bg-transparent border-none p-0">
                    Delegate Registration
                  </button>
                </li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-gold transition-colors">Press Corps Portfolio</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-gold transition-colors">Sponsorship Proposal</a></li>
                <li><a href="mailto:contact@cdamun.com" className="hover:text-brand-gold transition-colors">Contact Support</a></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="font-syne font-bold text-[11px] text-brand-text tracking-widest uppercase mb-4">
                Legal Info
              </h4>
              <ul className="font-sans font-light text-[13px] text-brand-muted space-y-2.5">
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-gold transition-colors">Terms &amp; Conditions</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-gold transition-colors">Privacy Policy</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-gold transition-colors">Refund Policy Statement</a></li>
              </ul>
            </div>

          </div>

          {/* Socials & Copyright frame */}
          <div className="pt-8 border-t border-brand-border/45 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-sans font-light text-[12px] text-brand-dim text-center md:text-left">
              &copy; 2026 Council of Diplomatic Affairs. All Rights Reserved.
            </p>
            
            <div className="flex gap-2.5 select-none">
              <a
                href="#"
                title="Follow on Instagram"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 border border-brand-border rounded flex items-center justify-center text-brand-dim hover:text-brand-gold hover:border-brand-gold/60 transition-all cursor-pointer bg-brand-surface/40"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                title="Connect on LinkedIn"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 border border-brand-border rounded flex items-center justify-center text-brand-dim hover:text-brand-gold hover:border-brand-gold/60 transition-all cursor-pointer bg-brand-surface/40"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                title="Follow on Twitter"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 border border-brand-border rounded flex items-center justify-center text-brand-dim hover:text-brand-gold hover:border-brand-gold/60 transition-all cursor-pointer bg-brand-surface/40"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
