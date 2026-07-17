import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, SlidersHorizontal, BookOpen, AlertCircle, X, Award } from "lucide-react";
import { COMMITTEES_DATA } from "../data";
import { Committee } from "../types";

interface CommitteesListProps {
  onOpenRegisterForCommittee: (committeeName: string) => void;
}

export default function CommitteesList({ onOpenRegisterForCommittee }: CommitteesListProps) {
  const [selectedCommittee, setSelectedCommittee] = useState<Committee | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filters = ["All", "Advanced", "Intermediate", "Beginner–Intermediate", "All Levels"];

  const filteredCommittees = COMMITTEES_DATA.filter((c) => {
    const matchesFilter = activeFilter === "All" || c.tag === activeFilter;
    const matchesQuery =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.abbr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.agenda.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <section id="committees" className="py-20 lg:py-28 bg-brand-bg px-6 lg:px-12 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Intro */}
        <div className="max-w-3xl mb-12">
          <span className="font-sans font-semibold text-xs tracking-widest text-brand-gold uppercase mb-3 block">
            Committees
          </span>
          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-brand-text mb-6">
            Pick Your Arena
          </h2>
          <div className="w-10 h-[3px] bg-brand-gold mb-6 rounded" />
          <p className="font-sans font-light text-brand-muted text-[15px] leading-relaxed">
            Seven interactive simulations. Zero boilerplate. Every committee presents a distinct lens on international relations, law, and modern societal crisis clusters — find the one that fits your strategic mindset.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-10 pb-6 border-b border-brand-border/40">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded text-[11px] sm:text-xs font-syne font-bold uppercase tracking-wider transition-all duration-300 pointer-events-auto cursor-pointer ${
                  activeFilter === filter
                    ? "bg-brand-gold text-black shadow-lg shadow-brand-gold/10"
                    : "bg-brand-surface border border-brand-border text-brand-muted hover:border-brand-border2 hover:text-brand-text"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-dim" />
            <input
              type="text"
              placeholder="Search by name or agenda..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-surface border border-brand-border focus:border-brand-gold/60 focus:outline-none rounded pl-10 pr-4 py-2 text-xs text-brand-text font-sans font-light transition-all/300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-text text-sm cursor-pointer"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Committees Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredCommittees.map((c, idx) => (
              <motion.div
                layout
                key={c.abbr}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedCommittee(c)}
                className="relative bg-brand-surface border border-brand-border hover:border-brand-border2 p-6 rounded-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 group overflow-hidden flex flex-col justify-between min-h-[220px]"
              >
                {/* Border glow */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-syne font-extrabold text-2xl lg:text-3xl text-brand-gold leading-none">
                      {c.abbr}
                    </span>
                    <span className={`text-[9px] font-syne font-bold uppercase tracking-widest border px-2.5 py-1 rounded-full ${
                      c.tag.includes("Advanced") 
                        ? "border-amber-500/30 text-amber-500 bg-amber-500/5"
                        : c.tag.includes("Intermediate")
                        ? "border-sky-500/30 text-sky-500 bg-sky-500/5"
                        : "border-emerald-500/30 text-emerald-500 bg-emerald-500/5"
                    }`}>
                      {c.tag}
                    </span>
                  </div>
                  
                  <h4 className="font-syne font-bold text-xs text-brand-muted uppercase tracking-wider mb-4 leading-tight">
                    {c.name}
                  </h4>
                  
                  <p className="font-sans font-light text-brand-text text-[13px] leading-relaxed line-clamp-3 mb-6">
                    {c.agenda}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-syne font-bold text-brand-gold uppercase mt-auto tracking-wider pt-3 border-t border-brand-border/20 group-hover:text-brand-gold2 transition-colors">
                  <BookOpen className="w-3.5 h-3.5" />
                  View Chambers Info &rarr;
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredCommittees.length === 0 && (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-brand-surface/40 border border-brand-border rounded-xl">
              <AlertCircle className="w-10 h-10 text-brand-dim mb-3" />
              <p className="font-syne font-bold text-sm text-brand-muted uppercase tracking-wider">No matching committees found</p>
              <p className="font-sans font-light text-xs text-brand-dim mt-1">Try resetting filters or typing another query.</p>
              <button
                onClick={() => { setActiveFilter("All"); setSearchQuery(""); }}
                className="mt-4 px-4 py-2 bg-brand-border hover:bg-brand-border2 text-brand-text font-syne font-bold text-xs uppercase tracking-wider rounded transition-all cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          )}
        </motion.div>

      </div>

      {/* Detail Modal Dialog */}
      <AnimatePresence>
        {selectedCommittee && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCommittee(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="relative bg-brand-surface w-full max-w-xl rounded-xl border border-brand-border2 p-6 sm:p-10 shadow-2xl z-10 overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedCommittee(null)}
                className="absolute top-5 right-5 p-1 text-brand-muted hover:text-brand-gold rounded border border-transparent hover:border-brand-border transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <div className="font-syne font-extrabold text-brand-gold text-4xl sm:text-5xl leading-none tracking-tight mb-2">
                  {selectedCommittee.abbr}
                </div>
                <h3 className="font-syne font-bold text-base sm:text-[19px] text-brand-text uppercase tracking-wide leading-snug">
                  {selectedCommittee.name}
                </h3>
                <span className={`inline-block text-[10px] font-syne font-bold uppercase tracking-widest border px-3 py-1 rounded-full mt-3 ${
                  selectedCommittee.tag.includes("Advanced")
                    ? "border-amber-500/30 text-amber-500 bg-amber-500/5"
                    : selectedCommittee.tag.includes("Intermediate")
                    ? "border-sky-500/30 text-sky-500 bg-sky-500/5"
                    : "border-emerald-500/30 text-emerald-500 bg-emerald-500/5"
                }`}>
                  Chamber Focus: {selectedCommittee.tag}
                </span>
              </div>

              {/* Agenda Container */}
              <div className="bg-brand-bg border-l-4 border-brand-gold p-4 rounded-r-lg mb-6 shadow-inner">
                <span className="block text-[10px] font-syne font-bold uppercase tracking-wider text-brand-muted mb-1.5">
                  Official Session Agenda:
                </span>
                <p className="font-sans font-medium text-brand-text text-sm sm:text-[15px] leading-relaxed">
                  {selectedCommittee.agenda}
                </p>
              </div>

              {/* Detailed Chamber Goals Description */}
              <div className="font-sans font-light text-brand-muted text-[13px] sm:text-sm leading-relaxed mb-8 space-y-3">
                <p>{selectedCommittee.desc}</p>
                <p>
                  As a distinguished delegate inside this chamber, you will draft policy agendas, manage coalition blocks, challenge opposing arguments, and build actionable resolutions. Study files and position reports will be provided post-registration.
                </p>
              </div>

              {/* Footer Button Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    onOpenRegisterForCommittee(selectedCommittee.name);
                    setSelectedCommittee(null);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold2 text-black font-syne font-bold text-xs uppercase tracking-widest py-3.5 rounded cursor-pointer transition-all duration-200 shadow-md"
                >
                  <Award className="w-4 h-4" />
                  Select &amp; Register for Committee
                </button>
                <button
                  onClick={() => setSelectedCommittee(null)}
                  className="sm:px-6 py-3 border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-border2 font-syne font-bold text-xs uppercase tracking-widest rounded transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
