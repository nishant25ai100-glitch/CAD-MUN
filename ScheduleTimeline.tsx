import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react";
import { SCHEDULE_DATA, CONFIG } from "../data";

export default function ScheduleTimeline() {
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);

  return (
    <section id="schedule" className="py-20 lg:py-28 bg-brand-bg2 px-6 lg:px-12 border-b border-brand-border/20">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 flex flex-col text-left">
          <span className="font-sans font-semibold text-xs tracking-widest text-brand-gold uppercase mb-3">
            Schedule
          </span>
          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-brand-text mb-6">
            Three Days. Maximum Intensity.
          </h2>
          <div className="w-10 h-[3px] bg-brand-gold mb-6 rounded" />
          <p className="font-sans font-light text-brand-muted text-[15px] leading-relaxed">
            Join us on {CONFIG.dates}. Every moment of CDA MUN is curated to stretch your debate stamina, connect you with premier peers, and ignite long-term impact.
          </p>
        </div>

        {/* Mobile Tab Selectors (visible on smaller screens) */}
        <div className="flex md:hidden bg-brand-surface border border-brand-border p-1 rounded-lg mb-8">
          {SCHEDULE_DATA.map((day, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedDayIdx(idx)}
              className={`flex-1 text-center py-2.5 rounded font-syne font-extrabold text-xs uppercase tracking-wider transition-all pointer-events-auto cursor-pointer ${
                selectedDayIdx === idx
                  ? "bg-brand-gold text-black shadow-md"
                  : "text-brand-muted hover:text-brand-text"
              }`}
            >
              {day.dayName}
            </button>
          ))}
        </div>

        {/* Mobile Accordion Content (Visible on Mobile only based on active index state) */}
        <div className="block md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDayIdx}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center pb-2 border-b border-brand-border/40">
                <h3 className="font-syne font-extrabold text-xl text-brand-gold">
                  {SCHEDULE_DATA[selectedDayIdx].dayName}
                </h3>
                <span className="text-xs text-brand-muted font-mono bg-brand-surface border border-brand-border px-3 py-1 rounded">
                  {SCHEDULE_DATA[selectedDayIdx].dateStr}
                </span>
              </div>

              <div className="relative pl-6 border-l border-brand-gold/30 space-y-8">
                {SCHEDULE_DATA[selectedDayIdx].items.map((item, idx) => (
                  <div key={idx} className="relative">
                    {/* Ring indicator */}
                    <div className="absolute -left-[29px] top-1 w-2.5 h-2.5 rounded-full bg-brand-bg border-2 border-brand-gold" />
                    
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-gold font-mono tracking-wide mb-1">
                      <Clock className="w-3.5 h-3.5" />
                      {item.time}
                    </div>
                    
                    <h4 className="font-syne font-extrabold text-brand-text text-[15px] mb-1.5">
                      {item.title}
                    </h4>
                    
                    <p className="font-sans font-light text-brand-muted text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop View (Standard adjacent grids matching the mockup) */}
        <div className="hidden md:grid grid-cols-3 gap-8 items-start">
          {SCHEDULE_DATA.map((day, dIdx) => (
            <div key={dIdx} className="bg-brand-surface/40 border border-brand-border p-6 rounded-lg flex flex-col h-full min-h-[460px]">
              
              {/* Day header */}
              <div className="flex justify-between items-center mb-8 pb-3 border-b border-brand-border/40">
                <h3 className="font-syne font-extrabold text-lg text-brand-gold select-none">
                  {day.dayName}
                </h3>
                <span className="font-sans font-medium text-xs text-brand-muted tracking-wider uppercase bg-brand-surface/80 border border-brand-border/40 px-2.5 py-1 rounded">
                  {day.dateStr}
                </span>
              </div>

              {/* Vertical timeline items */}
              <div className="relative pl-5 border-l border-brand-border/60 flex-1 space-y-6">
                {day.items.map((item, iIdx) => (
                  <div key={iIdx} className="relative group">
                    {/* Circle bulb indicator */}
                    <div className="absolute -left-[25px] top-1.5 w-2 h-2 rounded-full bg-brand-bg border border-brand-gold group-hover:bg-brand-gold transition-colors duration-300" />
                    
                    <div className="flex items-center gap-1.5 text-[10px] font-sans font-medium text-brand-gold font-mono tracking-wider mb-1 uppercase">
                      <Clock className="w-3.5 h-3.5" />
                      {item.time}
                    </div>
                    
                    <h4 className="font-syne font-bold text-[14px] text-brand-text group-hover:text-brand-gold transition-colors duration-200">
                      {item.title}
                    </h4>
                    
                    <p className="font-sans font-light text-brand-muted text-[12px] leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Note info block */}
        <div className="mt-8 bg-brand-surface border border-brand-border border-l-2 border-brand-gold p-4 rounded-r-lg font-sans text-xs text-brand-muted flex items-center gap-2">
          <span className="text-brand-gold font-bold select-none text-base">&bull;</span>
          <span>
            <strong>Please Note:</strong> All session timings and schedules are tentative and subject to adjustments. Admitted delegates will receive finalized schedule books, agendas, and block maps via email post-registration.
          </span>
        </div>

      </div>
    </section>
  );
}
