import { motion } from "motion/react";
import { BrainCircuit, Globe, Users, Trophy, ChevronRight } from "lucide-react";

interface AboutProps {
  onOpenRegister: () => void;
}

export default function About({ onOpenRegister }: AboutProps) {
  const cardItems = [
    {
      icon: <BrainCircuit className="w-6 h-6 text-brand-gold" />,
      title: "Top Exec Board",
      desc: "Seasoned MUN professionals and active debate circuit veterans ensuring authentic, top-tier simulations."
    },
    {
      icon: <Globe className="w-6 h-6 text-brand-gold" />,
      title: "Global Committees",
      desc: "From local Lok Sabha reforms to the UNSC — curated agendas that are intensely relevant to today's news."
    },
    {
      icon: <Users className="w-6 h-6 text-brand-gold" />,
      title: "Elite Network",
      desc: "Connect with the most ambitious student leaders from institutions nationwide. Build real friendships."
    },
    {
      icon: <Trophy className="w-6 h-6 text-brand-gold" />,
      title: "Skill Mastery",
      desc: "Public speaking, strategic negotiation, crisis analysis, and consensus-building — completely levelled up."
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-brand-bg2 px-6 lg:px-12 relative border-b border-brand-border/20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Side: Editorial Typography */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col text-left"
        >
          <span className="font-sans font-semibold text-xs tracking-widest text-brand-gold uppercase mb-3">
            Who We Are
          </span>
          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-brand-text mb-6 leading-tight">
            More Than A Conference.<br />
            <span className="text-brand-gold bg-gradient-to-r from-brand-gold to-brand-gold2 bg-clip-text text-transparent">A Movement.</span>
          </h2>
          <div className="w-10 h-[3px] bg-brand-gold mb-8 rounded" />
          
          <div className="font-sans text-brand-muted text-[15px] leading-relaxed space-y-4 font-light">
            <p>
              Council of Diplomatic Affairs is a Model United Nations conference built for a generation that doesn't just scroll past global challenges — <strong className="font-medium text-brand-text">we address them directly</strong>.
            </p>
            <p>
              We blend the rigorous structure of traditional UN diplomacy with a Gen Z energy that keeps debate sharp, practical, and highly relevant. Whether you're a first-timer testing your voice or a veteran delegate with directories of binders — this chamber is yours.
            </p>
            <p>
              Our committees are selected for maximum intellectual impact, our executive board brings deep experience, and our delegates are standard-setters who refuse to accept cookie-cutter answers to the world's most critical crisis nodes.
            </p>
          </div>

          <div className="mt-8">
            <button
              onClick={onOpenRegister}
              className="inline-flex items-center gap-2 text-brand-gold font-syne font-bold text-xs tracking-widest uppercase hover:text-brand-gold2 transition-colors cursor-pointer group"
            >
              Be Part of It
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Right Side: Visual Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cardItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-brand-surface border border-brand-border hover:border-brand-border2 p-6 rounded-lg transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30"
            >
              <div className="w-12 h-12 bg-brand-bg/50 rounded-lg flex items-center justify-center border border-brand-border/40 group-hover:border-brand-gold/30 transition-colors duration-300 mb-4 shadow-inner">
                {item.icon}
              </div>
              <h4 className="font-syne font-bold text-[15px] text-brand-text mb-2 tracking-wide uppercase">
                {item.title}
              </h4>
              <p className="font-sans font-light text-brand-muted text-[13px] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
