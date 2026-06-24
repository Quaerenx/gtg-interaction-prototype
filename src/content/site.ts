export type HeroService = {
  id: string;
  label: string;
  keyword: string;
  visual: string;
  visualAlt: string;
};

export type SolutionSlide = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  visual: string;
  visualAlt: string;
  index: string;
};

export const prototypeContent = {
  isApproved: false,
  badge: "MVP PROTOTYPE",
  companyName: "GTG Solutions & Consult",
  headline: "Complex systems, made clear.",
  description: "GTG corporate website interaction prototype.",
  primaryCta: "Explore solutions",
  unknowns: {
    officialTagline: "[TBD]",
    companyDescription: "[TBD]",
    contactDestination: "[TBD]",
    customerClaims: "[TBD]",
    certifications: "[TBD]",
    partnerStatus: "[TBD]"
  }
} as const;

export const heroServices: HeroService[] = [
  {
    id: "data-analytics",
    label: "Data & Analytics",
    keyword: "Analytical layers",
    visual: "/generated/hero-data-analytics.svg",
    visualAlt: "Procedural analytical grid placeholder"
  },
  {
    id: "data-streaming",
    label: "Data Streaming",
    keyword: "Event pulses",
    visual: "/generated/hero-data-streaming.svg",
    visualAlt: "Procedural streaming signal placeholder"
  },
  {
    id: "infrastructure-automation",
    label: "Infrastructure Automation",
    keyword: "Provisioning topology",
    visual: "/generated/hero-infrastructure-automation.svg",
    visualAlt: "Procedural infrastructure topology placeholder"
  },
  {
    id: "devops-quality",
    label: "DevOps & Quality",
    keyword: "Release confidence",
    visual: "/generated/hero-devops-quality.svg",
    visualAlt: "Procedural test matrix placeholder"
  },
  {
    id: "database-consulting",
    label: "Database Consulting",
    keyword: "Query paths",
    visual: "/generated/hero-database-consulting.svg",
    visualAlt: "Procedural database consulting placeholder"
  },
  {
    id: "technical-support",
    label: "Technical Support",
    keyword: "Diagnostics graph",
    visual: "/generated/hero-technical-support.svg",
    visualAlt: "Procedural support diagnostics placeholder"
  },
  {
    id: "training-delivery",
    label: "Training & Delivery",
    keyword: "Delivery sequence",
    visual: "/generated/hero-training-delivery.svg",
    visualAlt: "Procedural training path placeholder"
  }
];

export const solutionSlides: SolutionSlide[] = [
  {
    id: "solution-data-analytics",
    eyebrow: "Solution 01",
    title: "Data & Analytics",
    description:
      "Prototype copy for the data and analytics direction, using abstract layers and topology until GTG approves final service language.",
    visual: "/generated/solution-data-analytics.svg",
    visualAlt: "Procedural full-screen analytical topology placeholder",
    index: "01 / 05"
  },
  {
    id: "solution-data-streaming",
    eyebrow: "Solution 02",
    title: "Data Streaming",
    description:
      "Prototype copy for streaming systems, represented as directional signals and event flow without implying a confirmed platform or metric.",
    visual: "/generated/solution-data-streaming.svg",
    visualAlt: "Procedural full-screen streaming signal placeholder",
    index: "02 / 05"
  },
  {
    id: "solution-infrastructure-automation",
    eyebrow: "Solution 03",
    title: "Infrastructure Automation",
    description:
      "Prototype copy for automation structure, shown through connected nodes, provisioning paths, and neutral system maps.",
    visual: "/generated/solution-infrastructure-automation.svg",
    visualAlt: "Procedural full-screen infrastructure automation placeholder",
    index: "03 / 05"
  },
  {
    id: "solution-devops-quality",
    eyebrow: "Solution 04",
    title: "DevOps & Quality",
    description:
      "Prototype copy for release and quality workflows, expressed with staged paths and test matrices pending approved messaging.",
    visual: "/generated/solution-devops-quality.svg",
    visualAlt: "Procedural full-screen DevOps and quality placeholder",
    index: "04 / 05"
  },
  {
    id: "solution-consulting-support",
    eyebrow: "Solution 05",
    title: "Consulting & Technical Support",
    description:
      "Prototype copy for consulting and support, using diagnostics and knowledge-transfer visuals without unverified operational claims.",
    visual: "/generated/solution-consulting-support.svg",
    visualAlt: "Procedural full-screen consulting and technical support placeholder",
    index: "05 / 05"
  }
];

export const firstSolution = solutionSlides[0];
