/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import CommitteesList from "./components/CommitteesList";
import ScheduleTimeline from "./components/ScheduleTimeline";
import TeamList from "./components/TeamList";
import Footer from "./components/Footer";
import RegistrationForm from "./components/RegistrationForm";

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [preSelectedCommittee, setPreSelectedCommittee] = useState<string | undefined>(undefined);

  const handleOpenRegister = () => {
    setPreSelectedCommittee(undefined);
    setIsRegisterOpen(true);
  };

  const handleOpenRegisterForCommittee = (committeeName: string) => {
    setPreSelectedCommittee(committeeName);
    setIsRegisterOpen(true);
  };

  const handleCloseRegister = () => {
    setIsRegisterOpen(false);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans selection:bg-brand-gold selection:text-black">
      {/* Floating navigation panel */}
      <Navbar onOpenRegister={handleOpenRegister} />

      {/* Main page columns */}
      <main>
        {/* Dynamic hero display with metrics */}
        <Hero onOpenRegister={handleOpenRegister} />

        {/* Informative introductory blocks */}
        <About onOpenRegister={handleOpenRegister} />

        {/* Interactive committees with categorization & metadata overlays */}
        <CommitteesList onOpenRegisterForCommittee={handleOpenRegisterForCommittee} />

        {/* Schedule dates and session details */}
        <ScheduleTimeline />

        {/* Executive board flip-profile directories */}
        <TeamList />
      </main>

      {/* Master proposals and site directory map */}
      <Footer onOpenRegister={handleOpenRegister} />

      {/* Unified Registration form dialog / Pass badge generator */}
      <RegistrationForm
        isOpen={isRegisterOpen}
        initialSelectedCommittee={preSelectedCommittee}
        onClose={handleCloseRegister}
      />
    </div>
  );
}
