export interface Committee {
  abbr: string;
  name: string;
  tag: string;
  agenda: string;
  desc: string;
}

export interface TeamMember {
  initials: string;
  name: string;
  role: string;
  image: string | null;
  bio: string;
  ig: string;
  ln: string;
  email: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  desc: string;
}

export interface ScheduleDay {
  dayName: string;
  dateStr: string;
  items: ScheduleItem[];
}

export interface RegistrationData {
  fullName: string;
  email: string;
  institution: string;
  whatsapp: string;
  primaryCommittee: string;
  secondaryCommittee: string;
  previousMunExperience: string; // "none" | "1-2" | "3-5" | "6+"
  positionStatement: string;
  registeredAt: string;
  passId: string;
}
