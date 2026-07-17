import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, Check, ChevronRight, Landmark, Download, FileSpreadsheet, User, Mail, Shield, Sparkles, X, PlusCircle, AlertCircle, Loader2 } from "lucide-react";
import { COMMITTEES_DATA, CONFIG } from "../data";
import { RegistrationData } from "../types";
import { supabase } from "../lib/supabase";

interface RegistrationProps {
  initialSelectedCommittee?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationForm({ initialSelectedCommittee, isOpen, onClose }: RegistrationProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    institution: "",
    whatsapp: "",
    primaryCommittee: initialSelectedCommittee || COMMITTEES_DATA[0].name,
    secondaryCommittee: COMMITTEES_DATA[1].name,
    previousMunExperience: "none",
    positionStatement: ""
  });

  const [registeredData, setRegisteredData] = useState<RegistrationData | null>(null);
  const [showForm, setShowForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load existing registration from LocalStorage (kept as a "show my pass again" cache only —
  // the real source of truth is now the Supabase database)
  useEffect(() => {
    const saved = localStorage.getItem("cda_mun_registration");
    if (saved) {
      setRegisteredData(JSON.parse(saved));
      setShowForm(false);
    }
  }, []);

  // Update primary committee selection if passed as initial prop
  useEffect(() => {
    if (initialSelectedCommittee) {
      setFormData((prev) => ({
        ...prev,
        primaryCommittee: initialSelectedCommittee
      }));
      setShowForm(true);
    }
  }, [initialSelectedCommittee]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApply = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Minimal validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.institution.trim()) {
      setErrorMsg("Please fill out all required fields: Name, Email & Institution.");
      return;
    }

    setIsSubmitting(true);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const primaryId = formData.primaryCommittee.substring(0, 3).toUpperCase();
    const passId = `CDA-26-${primaryId}-${randomSuffix}`;

    // Save to Supabase — this is the real database, visible to organizers
    const { error } = await supabase.from("registrations").insert({
      full_name: formData.fullName,
      email: formData.email,
      whatsapp: formData.whatsapp,
      institution: formData.institution,
      primary_committee: formData.primaryCommittee,
      secondary_committee: formData.secondaryCommittee,
      previous_mun_experience: formData.previousMunExperience,
      position_statement: formData.positionStatement,
      pass_id: passId
    });

    setIsSubmitting(false);

    if (error) {
      // Most common case: duplicate email (unique constraint)
      if (error.code === "23505") {
        setErrorMsg("This email has already registered. Check your inbox for your pass, or contact us if you need help.");
      } else {
        setErrorMsg("Something went wrong submitting your registration. Please try again or contact us directly.");
        console.error("Supabase insert error:", error);
      }
      return;
    }

    const confirmedPass: RegistrationData = {
      ...formData,
      registeredAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
      passId
    };

    // Cache locally too, just so returning visitors instantly see their pass again
    localStorage.setItem("cda_mun_registration", JSON.stringify(confirmedPass));
    setRegisteredData(confirmedPass);
    setShowForm(false);
  };

  const handleResetRegistration = () => {
    if (confirm("Are you sure you want to cancel or reset your registration details?")) {
      localStorage.removeItem("cda_mun_registration");
      setRegisteredData(null);
      setShowForm(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative bg-brand-surface w-full max-w-2xl rounded-xl border border-brand-border2 p-6 sm:p-8 shadow-2xl z-10 overflow-y-auto max-h-[90vh]"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-1 text-brand-muted hover:text-brand-gold rounded border border-transparent hover:border-brand-border transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* If Not Registered yet OR wanting to show form */}
            {showForm ? (
              <div>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-syne font-bold uppercase tracking-widest text-brand-gold mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Interactive Portfolio Wizard
                  </div>
                  <h3 className="font-syne font-extrabold text-2xl text-brand-text">
                    Apply for Delegate Seat
                  </h3>
                  <p className="font-sans font-light text-xs text-brand-muted mt-1 leading-relaxed">
                    Set up your portfolio badge right inside the portal first, then proceed to the official form. All fields matched securely in local cache.
                  </p>
                </div>

                {errorMsg && (
                  <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleApply} className="space-y-4">
                  {/* Grid fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-syne font-bold uppercase tracking-wider text-brand-muted mb-1.5">
                        Full Name <span className="text-brand-gold">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Priyanshu Sharma"
                        className="w-full bg-brand-bg border border-brand-border focus:border-brand-gold/60 focus:outline-none rounded px-4 py-2 text-xs text-brand-text font-sans font-light"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-syne font-bold uppercase tracking-wider text-brand-muted mb-1.5">
                        E-mail Address <span className="text-brand-gold">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. delegate@domain.com"
                        className="w-full bg-brand-bg border border-brand-border focus:border-brand-gold/60 focus:outline-none rounded px-4 py-2 text-xs text-brand-text font-sans font-light"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-syne font-bold uppercase tracking-wider text-brand-muted mb-1.5">
                        School / University Institution <span className="text-brand-gold">*</span>
                      </label>
                      <input
                        type="text"
                        name="institution"
                        required
                        value={formData.institution}
                        onChange={handleInputChange}
                        placeholder="e.g. Delhi Public School"
                        className="w-full bg-brand-bg border border-brand-border focus:border-brand-gold/60 focus:outline-none rounded px-4 py-2 text-xs text-brand-text font-sans font-light"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-syne font-bold uppercase tracking-wider text-brand-muted mb-1.5">
                        WhatsApp Contact / Mobile No.
                      </label>
                      <input
                        type="text"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-brand-bg border border-brand-border focus:border-brand-gold/60 focus:outline-none rounded px-4 py-2 text-xs text-brand-text font-sans font-light"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-syne font-bold uppercase tracking-wider text-brand-muted mb-1.5">
                        First Choice Committee
                      </label>
                      <select
                        name="primaryCommittee"
                        value={formData.primaryCommittee}
                        onChange={handleInputChange}
                        className="w-full bg-brand-bg border border-brand-border focus:border-brand-gold/60 focus:outline-none rounded px-3 py-2 text-xs text-brand-text font-sans font-light select-none cursor-pointer"
                      >
                        {COMMITTEES_DATA.map((c) => (
                          <option key={c.abbr} value={c.name} className="bg-brand-surface">
                            {c.abbr} — {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-syne font-bold uppercase tracking-wider text-brand-muted mb-1.5">
                        Second Choice Committee
                      </label>
                      <select
                        name="secondaryCommittee"
                        value={formData.secondaryCommittee}
                        onChange={handleInputChange}
                        className="w-full bg-brand-bg border border-brand-border focus:border-brand-gold/60 focus:outline-none rounded px-3 py-2 text-xs text-brand-text font-sans font-light select-none cursor-pointer"
                      >
                        {COMMITTEES_DATA.map((c) => (
                          <option key={c.abbr} value={c.name} className="bg-brand-surface">
                            {c.abbr} — {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-syne font-bold uppercase tracking-wider text-brand-muted mb-1.5">
                      Prior MUN Conference Experience
                    </label>
                    <div className="flex gap-3">
                      {[
                        { val: "none", lbl: "Beginner (0-1 conferences)" },
                        { val: "medium", lbl: "Intermediate (2-4 conferences)" },
                        { val: "expert", lbl: "Expert (5+ conferences)" }
                      ].map((exp) => (
                        <label
                          key={exp.val}
                          className={`flex-1 border text-center py-2.5 rounded text-[11px] font-syne font-bold uppercase tracking-wider select-none cursor-pointer ${
                            formData.previousMunExperience === exp.val
                              ? "bg-brand-gold/10 border-brand-gold text-brand-gold"
                              : "border-brand-border bg-brand-bg/50 text-brand-muted hover:text-brand-text hover:border-brand-border2"
                          }`}
                        >
                          <input
                            type="radio"
                            name="previousMunExperience"
                            value={exp.val}
                            checked={formData.previousMunExperience === exp.val}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          {exp.lbl.split(" ")[0]}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-syne font-bold uppercase tracking-wider text-brand-muted mb-1.5">
                      Brief Statement of Interest or Demands
                    </label>
                    <textarea
                      name="positionStatement"
                      rows={3}
                      value={formData.positionStatement}
                      onChange={handleInputChange}
                      placeholder="Why do you wish to participate in your chosen committee agendas? (Optional)"
                      className="w-full bg-brand-bg border border-brand-border focus:border-brand-gold/60 focus:outline-none rounded px-4 py-2 text-xs text-brand-text font-sans font-light leading-relaxed"
                    />
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3 items-center justify-between border-t border-brand-border/40">
                    <p className="text-[11px] font-sans font-light text-brand-muted text-center sm:text-left">
                      <strong>Fee:</strong> <span className="text-brand-gold font-bold">{CONFIG.fee}</span>. Payment details will be shared via email after registration.
                    </p>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="flex-1 sm:flex-none px-5 py-3 border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-border2 font-syne font-bold text-xs uppercase tracking-widest rounded transition-all cursor-pointer disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-brand-gold hover:bg-brand-gold2 text-black font-syne font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded cursor-pointer transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Generate Pass &amp; Apply
                            <ChevronRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              /* IF USER ALREADY SUBMITTED THEIR DETAILS -> RENDER THEIR GORGEOUS CUSTOM PASS CARD */
              <div className="flex flex-col items-center">
                
                {/* Intro status alert */}
                <div className="mb-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6 animate-bounce" />
                  </div>
                  <h3 className="font-syne font-extrabold text-2xl text-brand-text mb-1 select-none">
                    Digital Delegate Pass Active!
                  </h3>
                  <p className="font-sans font-light text-xs text-brand-muted max-w-md mx-auto leading-relaxed">
                    Your seat details have been cached dynamically. To complete registration, ensure you submit form options on the verified Google Forms tab.
                  </p>
                </div>

                {/* THE PASS BADGE (STUFFED WITH DETAILS AND CHIC ACCENTS) */}
                <motion.div
                  initial={{ rotateY: 90 }}
                  animate={{ rotateY: 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className="w-full max-w-sm bg-gradient-to-b from-brand-surface to-brand-bg3 border-2 border-brand-gold rounded-xl p-6 relative overflow-hidden shadow-2xl select-none flex flex-col justify-between min-h-[440px]"
                >
                  <div className="absolute inset-0 hero-grid-mesh opacity-30 pointer-events-none" />
                  
                  {/* Glowing halo indicator */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-brand-gold/10 blur-xl pointer-events-none" />

                  {/* Pass Header */}
                  <div className="flex justify-between items-center border-b border-brand-border/60 pb-4 mb-4 z-10">
                    <div className="flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-brand-gold" />
                      <span className="font-syne font-extrabold text-sm text-brand-text tracking-wide uppercase">CDA MUN 2026</span>
                    </div>
                    <span className="font-mono text-[9px] bg-brand-gold/15 border border-brand-gold/40 text-brand-gold px-2.5 py-1 rounded">
                      DELEGATE
                    </span>
                  </div>

                  {/* Core Member Details inside frame */}
                  <div className="space-y-4 z-10 text-left">
                    <div>
                      <span className="block text-[8px] font-syne font-bold uppercase tracking-widest text-brand-dim mb-0.5">Full Name</span>
                      <p className="font-syne font-extrabold text-lg text-brand-text truncate leading-tight uppercase">
                        {registeredData?.fullName}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="block text-[8px] font-syne font-bold uppercase tracking-widest text-brand-dim mb-0.5">ID / PASSCODE</span>
                        <p className="font-mono font-medium text-xs text-brand-gold uppercase truncate">
                          {registeredData?.passId}
                        </p>
                      </div>
                      <div>
                        <span className="block text-[8px] font-syne font-bold uppercase tracking-widest text-brand-dim mb-0.5">Admissions Status</span>
                        <p className="font-mono font-extrabold text-xs text-emerald-400 capitalize flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          CONFIRMED
                        </p>
                      </div>
                    </div>

                    <div>
                      <span className="block text-[8px] font-syne font-bold uppercase tracking-widest text-brand-dim mb-0.5">Primary Chamber</span>
                      <p className="font-sans font-medium text-xs text-brand-text truncate">
                        {registeredData?.primaryCommittee}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="block text-[8px] font-syne font-bold uppercase tracking-widest text-brand-dim mb-0.5">Institution</span>
                        <p className="font-sans text-xs text-brand-muted truncate block">
                          {registeredData?.institution}
                        </p>
                      </div>
                      <div>
                        <span className="block text-[8px] font-syne font-bold uppercase tracking-widest text-brand-dim mb-0.5">Issue Date</span>
                        <p className="font-sans text-xs text-brand-muted truncate block">
                          {registeredData?.registeredAt}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Barcode / Mock security seal */}
                  <div className="mt-6 pt-4 border-t border-brand-border/60 flex items-center justify-between z-10">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex gap-[1px]">
                        {[2, 4, 1, 3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 2, 4, 1, 3, 1, 4].map((width, barIdx) => (
                          <div
                            key={barIdx}
                            className="bg-brand-text h-6"
                            style={{ width: `${width}px` }}
                          />
                        ))}
                      </div>
                      <span className="font-mono text-[7px] text-brand-dim tracking-wider text-center">
                        SECURE TICKET ENCRYPTED
                      </span>
                    </div>

                    <Landmark className="w-8 h-8 text-brand-dim/50 border border-brand-border rounded-lg p-1.5 bg-brand-surface" />
                  </div>
                </motion.div>

                {/* Sub Action buttons */}
                <div className="mt-8 flex flex-wrap gap-3 justify-center border-t border-brand-border/40 pt-6 w-full max-w-sm">
                  <a
                    href={CONFIG.registrationUrl}
                    target="_blank"
                    className="flex-1 flex items-center justify-center gap-1.5 bg-brand-gold hover:bg-brand-gold2 text-black font-syne font-bold text-xs uppercase tracking-wider py-3.5 rounded cursor-pointer transition-all duration-200"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    Open Google Form
                  </a>
                  <button
                    onClick={handleResetRegistration}
                    className="px-4 py-3 border border-red-500/20 text-red-500 hover:text-red-400 hover:border-red-500/40 font-syne font-bold text-xs uppercase tracking-wider rounded transition-all cursor-pointer"
                  >
                    Reset Seed
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-3 bg-brand-surface border border-brand-border text-brand-text hover:border-brand-border2 font-syne font-bold text-xs uppercase tracking-wider rounded transition-all cursor-pointer"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
