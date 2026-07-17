import { Committee, TeamMember, ScheduleDay } from "./types";

export const CONFIG = {
  registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeItiD58WkxK9T5kDm_CIRXALcQLTaXaVmVeVu-UVslkLyf-w/viewform?usp=header",
  dates: "Dec, 2026",
  day1: "11th Dec",
  day2: "12th Dec",
  day3: "13th Dec", // Adjusted matching 2026 flow
  fee: "₹1,499",
  deadline: "Dec 1st"
};

export const COMMITTEES_DATA: Committee[] = [
  {
    abbr: "UNSC",
    name: "United Nations Security Council",
    tag: "Advanced",
    agenda: "Addressing the weaponization of Artificial Intelligence in global conflict zones.",
    desc: "The most powerful organ of the United Nations. Delegates must navigate complex geopolitical tensions where every word, resolution, or veto can shift the global balance of power. Demands strong statecraft, military strategy comprehension, and negotiation skills."
  },
  {
    abbr: "UNHRC",
    name: "UN Human Rights Council",
    tag: "Intermediate",
    agenda: "Protecting digital privacy and freedom of expression in the era of mass surveillance.",
    desc: "A platform for those passionate about justice and global equity. Under mass surveillance regimes, digital borders, and AI tracking, debate the moral dilemmas of the 21st century and draft standard-setting human rights frameworks for a fairer world."
  },
  {
    abbr: "UNGA",
    name: "UN General Assembly",
    tag: "Beginner–Intermediate",
    agenda: "Sustainable urban development: Creating resilient cities for 2050.",
    desc: "The world's town hall. Every nation has a voice and a vote. Ideal for delegates looking to master the art of consensus-building, coalition politics, and the complex process of multilateral treaty writing."
  },
  {
    abbr: "LOK",
    name: "Lok Sabha",
    tag: "Intermediate",
    agenda: "Legislative reforms for the gig economy and worker rights in modern India.",
    desc: "Experience the high-octane intensity of Indian parliamentary debate. Fast-paced, oratorical-heavy, and packed with legislative maneuvering, point-of-orders, and political strategizing at its absolute finest."
  },
  {
    abbr: "UNCSW",
    name: "Commission on Status of Women",
    tag: "All Levels",
    agenda: "Economic empowerment of women through decentralized finance and technology.",
    desc: "Advocating for systemic equity and socio-economic change. A passionate forum focused on creating modern, highly effective, and decentralized solutions that dismantle historic economic disparities."
  },
  {
    abbr: "G20",
    name: "Group of Twenty",
    tag: "Advanced",
    agenda: "Global debt restructuring and financial stability for emerging economies.",
    desc: "Where global economics meets geopolitical strategy. Analyze sovereign debts, supply-chain shocks, and build multi-lateral economic frameworks to maintain global financial stability."
  },
  {
    abbr: "IP",
    name: "International Press",
    tag: "All Levels",
    agenda: "Media ethics and reporting in a post-truth world.",
    desc: "The eyes and ears of the conference. Designed for investigative journalists, writers, photographers, and critics who hold delegations accountable through hard-hitting press releases, live questioning, and editorial reviews."
  }
];

export const TEAM_DATA: TeamMember[] = [
  { 
    initials: "SG", 
    name: "Aarav Mehta", 
    role: "Secretary General", 
    image: "https://lh3.googleusercontent.com/aida/AP1WRLuDHxuBVqyCWCSlRoVRR7NjN05cyNTfInFp1jANdI8R_7ph_A533FfSjLqDJaYdb-oghBQxvzOZjJVXGBquLqSXuSTOS2lpM_Vq4zVEalARPRG5WuyAxP4tTu53YC316yTQH2mj2QeYoiPPQGtXeZVNBj1yp6Nd-gcOTyRFWS8OZJl-eQQ2ZeJ5bw9KvC51030NEvu-7CEbr-H8V02OCdqdtmNsmnJAmhd5tTc1Q6ew0pl0_tEr8J8yCnM",
    bio: "With over 15 MUNs under his belt, Aarav ensures academic excellence, rigorous procedural training, and deep integrity across all delegate chambers.", 
    ig: "#", ln: "#", email: "aarav@cdamun.com" 
  },
  { 
    initials: "PR", 
    name: "Isha Kapoor", 
    role: "President", 
    image: "https://lh3.googleusercontent.com/aida/AP1WRLuNqHyD51QbaDbLktFlE1G1EIbFS-cCqwyIYZm-BylK8xEkNrQYGhtRVBcrqeV6uueqRF2tt7bLpxBVLAmsVSc7DCfLCf09fAycNWFg9J-xOvYkrBDo8H4-FSsRAKN4aOzfY4eZGIrgGTZmEueWoekQFntmj2P0gNBV65OUw5OT4URs1OEgRX9xN9krO_w5TljaQ2zoxm01nFhlN5c6sHnc3E08df_YSnxUhGMl6zaVYTLzuZaYJ_eRhtg",
    bio: "A strategic mastermind focused on making CDA Season 1 the most impactful, immersive, and highly organized executive experience for delegates.", 
    ig: "#", ln: "#", email: "isha@cdamun.com" 
  },
  { 
    initials: "CC", 
    name: "Rohan Das", 
    role: "Conference Convenor", 
    image: null,
    bio: "The operations virtuoso. Rohan makes sure everything from catering services to logistical structures runs flawlessly behind the scenes.", 
    ig: "#", ln: "#", email: "rohan@cdamun.com" 
  },
  { 
    initials: "DJ", 
    name: "Dhruv Raj Jain", 
    role: "Vice President", 
    image: null,
    bio: "Leading delegation relations and institution partnerships to ensure every individual has a high-quality global standard workspace experience.", 
    ig: "https://instagram.com/dhruv_raj_jain", 
    ln: "#", 
    email: "dhruvrajjain1@gmail.com" 
  },
  { 
    initials: "NG", 
    name: "Nishant Garg", 
    role: "Head of Technology", 
    image: null,
    bio: "The engineering brain behind our digital spaces. Nishant manages server deployments, tech pipelines, and live media services.", 
    ig: "https://instagram.com/nishant.__garg", 
    ln: "#", 
    email: "gargnishant498@gmail.com" 
  },
  { 
    initials: "MJ", 
    name: "Mustafa Jaipuri", 
    role: "Head of Operations", 
    image: null,
    bio: "Managing the volunteer workforce, schedule coordination, and on-ground execution. Mustafa ensures the CDA machinery flows together gracefully.", 
    ig: "https://instagram.com/mustafajaipuri", 
    ln: "#", 
    email: "jaipurimustafa@gmail.com" 
  }
];

export const SCHEDULE_DATA: ScheduleDay[] = [
  {
    dayName: "Day 1",
    dateStr: "11th Dec",
    items: [
      {
        time: "09:00 AM - 10:30 AM",
        title: "Inauguration Ceremony",
        desc: "Opening address by the Secretary General. Chief guests presentation, keynote, and the high-energy briefing that sets the entire conference vibe."
      },
      {
        time: "11:00 AM - 01:00 PM",
        title: "Committee Session I",
        desc: "Roll call, formal setting of the agenda, opening statements, and the initial general speakers list debates."
      },
      {
        time: "01:00 PM - 02:00 PM",
        title: "Lunch Break & Lobbying",
        desc: "Recharge, team up, and network. The most important geopolitical alignments and secret alliances are formed over meals."
      },
      {
        time: "02:00 PM - 05:30 PM",
        title: "Committee Session II",
        desc: "Drafting of working papers, interactive moderated caucuses, and addressing incoming crisis briefs."
      },
      {
        time: "07:00 PM onwards",
        title: "Cultural Evening & Socials",
        desc: "The premier social event. Live music, open mic, networking mixers, and unwinding with peers from across the country."
      }
    ]
  },
  {
    dayName: "Day 2",
    dateStr: "12th Dec",
    items: [
      {
        time: "09:30 AM - 12:00 PM",
        title: "Morning Committee Session III",
        desc: "Sponsor lobbying, merger of working blocks, and drafting final, binding resolutions."
      },
      {
        time: "12:00 PM - 02:00 PM",
        title: "Voting Procedure",
        desc: "Resolutions are formally presented to the floors. Hard-hitting reviews, amendments, and the definitive voting session."
      },
      {
        time: "02:00 PM - 03:00 PM",
        title: "Lunch & Reflection",
        desc: "Final group photos, bonding circles, and completing feedback logs."
      },
      {
        time: "03:00 PM - 05:30 PM",
        title: "Closing & Valedictory",
        desc: "Awards, honorable mentions, certificates distribution, and closing statements from the high command."
      }
    ]
  },
  {
    dayName: "Day 3",
    dateStr: "13th Dec",
    items: [
      {
        time: "10:00 AM - 01:00 PM",
        title: "Grand Plenary Session",
        desc: "Special cross-committee collaboration summit reviewing the global resolutions made across all chambers."
      },
      {
        time: "01:00 PM - 03:00 PM",
        title: "Farewell Networking Lunch",
        desc: "Final networking session, contact trading, certificate collection, and executive team wrap-up."
      }
    ]
  }
];
