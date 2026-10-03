export interface ShortFormProject {
  id: string;
  title: string;
  category: 'Podcast' | 'Gaming' | 'Talking Head' | 'Lifestyle' | 'Tech';
  client: string;
  thumbnail: string;
  videoUrl: string;
  views?: string;
  tools: string[];
  description: string;
}

export interface ObumeService {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface ValueProp {
  icon: string;
  title: string;
  description: string;
}

export const HERO_OBUME_DATA = {
  badge: "Available for work",
  titlePart1: "I turn your content into",
  titleHighlight: "high-retention",
  titlePart2: "videos.",
  subtitle: "Short-form edits engineered for the scroll — punchy hooks, clean captions, relentless pacing. Built to keep eyes on screen and grow your audience.",
  primaryCta: "View My Work",
  secondaryCta: "Hire Me",
  socialProof: ["Trusted by creators", "48h turnaround", "3+ Years Exp."]
};

export const MARQUEE_ITEMS = [
  "Podcasts", "Coaches", "Lifestyle", "Brands", "Fitness", "Tech", "Creators",
  "Podcasts", "Coaches", "Lifestyle", "Brands", "Fitness", "Tech", "Creators"
];

export const SHORT_FORM_PROJECTS: ShortFormProject[] = [
  {
    id: "porsche-911-edit",
    title: "Porsche 911 Cinematic Velocity Edit",
    category: "Lifestyle",
    client: "Automotive Creator",
    thumbnail: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
    videoUrl: "/911edit_.mp4",
    views: "2.4M Views",
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    description: "High-adrenaline speed ramps, velocity transitions, synced bass drops, and cinematic grading."
  },
  {
    id: "chatgpt-motion-graphics",
    title: "ChatGPT AI Motion Graphics & Kinetic Typography",
    category: "Tech",
    client: "AI Tech Brand",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
    videoUrl: "/chatgptedit.mp4",
    views: "1.8M Views",
    tools: ["After Effects", "Premiere Pro", "Illustrator"],
    description: "High-retention motion graphics, UI animations, clean kinetic text, and rhythmic sound effects."
  },
  {
    id: "tu11-motion-graphics",
    title: "Kinetic Motion Graphics & VFX Title Edit",
    category: "Tech",
    client: "Creator Studio",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
    videoUrl: "/TU11.mp4",
    views: "1.4M Views",
    tools: ["After Effects", "Premiere Pro", "Cinema 4D"],
    description: "Dynamic motion design, kinetic type transitions, sound design, and impact visuals."
  },
  {
    id: "talking-head-coach",
    title: "Executive Talking Head Reel",
    category: "Talking Head",
    client: "SaaS Founder",
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-holding-a-camera-in-a-field-at-sunset-42898-large.mp4",
    views: "450K Views",
    tools: ["Premiere Pro", "Photoshop"],
    description: "Tight jump cuts, contextual b-roll popups, and clean minimalist lower thirds designed for business engagement."
  },
  {
    id: "lifestyle-vlog-shorts",
    title: "Aesthetic Travel & Lifestyle Reel",
    category: "Lifestyle",
    client: "Lifestyle Vlog",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4",
    views: "920K Views",
    tools: ["DaVinci Resolve", "Premiere Pro"],
    description: "Teal & orange color grading, speed ramps, ambient sound design, and smooth zoom transitions."
  },
  {
    id: "tech-review-shorts",
    title: "Futuristic 3D Product & Tech Reel",
    category: "Tech",
    client: "Tech Reviewer",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-connection-dots-and-lines-41555-large.mp4",
    views: "680K Views",
    tools: ["Blender", "After Effects"],
    description: "Blender 3D camera turnarounds combined with sleek motion graphics and product callouts."
  }
];

export const OBUME_SERVICES: ObumeService[] = [
  {
    id: "short-form",
    title: "Short-Form Editing",
    description: "Reels, TikToks, and Shorts crafted to maximize watch time and reshares.",
    icon: "film",
    features: ["Hook in 1.5s", "Retention pacing", "Native captions"]
  },
  {
    id: "talking-head",
    title: "Talking Head Edits",
    description: "Podcast clips and coach content tightened with cuts, b-roll, and emphasis.",
    icon: "mic",
    features: ["Jump cuts", "Dynamic captions", "B-roll layering"]
  },
  {
    id: "sound-vfx",
    title: "Premium Sound & VFX",
    description: "Advanced audio mixing, sound effects styling, and color correction for a cinematic finish.",
    icon: "headphones",
    features: ["Sound design & SFX", "Cinematic grading", "Audio enhancement"]
  }
];

export const WHY_ANKIT_VALUES: ValueProp[] = [
  {
    icon: "captions",
    title: "Clean Captions",
    description: "Readable, on-brand, perfectly synced -- every frame."
  },
  {
    icon: "zap",
    title: "Fast Pacing",
    description: "Cuts that match the beat of the scroll, never the script."
  },
  {
    icon: "target",
    title: "Hook-Focused",
    description: "First 3 seconds engineered to stop the thumb."
  },
  {
    icon: "trending",
    title: "Trend Aware",
    description: "Editing styles tuned to what's working this week."
  }
];

export const ABOUT_OBUME_DATA = {
  header: "-- About",
  title: "I'm a freelance editor obsessed with making creators grow.",
  paragraph: "I run a focused video editing studio specializing in short-form content. I work with creators, coaches, and brands who care about retention — not just posting. If you have the raw footage, I'll turn it into edits people watch twice."
};

export const CONTACT_OBUME_DATA = {
  header: "-- Let's Work",
  title: "Ready to grow your short-form?",
  subtitle: "Tell me about your channel and goals. I reply within 24 hours.",
  email: "ankit.devfx@gmail.com",
  instagram: "..."
};

export const BEFORE_AFTER_SAMPLES = [
  {
    id: "sample-1",
    title: "Cinematic Color Grade",
    rawLabel: "RAW LOG Footage",
    editedLabel: "Final Teal & Orange Grade",
    rawImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop",
    editedImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
    description: "Flat Rec.709 footage transformed with high-contrast color grading, dynamic glow, and atmospheric depth."
  },
  {
    id: "sample-2",
    title: "VFX & Compositing",
    rawLabel: "Raw Green Screen",
    editedLabel: "3D Sci-Fi Composited",
    rawImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200&auto=format&fit=crop",
    editedImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    description: "Keyed out raw background, integrated 3D Blender camera tracking, particle effects, and sound risers."
  }
];

export const SHOWREEL_VIDEO_URL = "/edit_intro.mp4";
export const SHOWREEL_POSTER = "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop";

export const CLIENT_CTA_DATA = {
  heading: "Ready to Transform Your Content?",
  subtext: "Let's turn your raw footage into high-retention edits.",
  primaryBtn: "Hire Me Now",
  secondaryBtn: "View Work"
};

export const CREATIVE_JOURNEY_TIMELINE = [
  {
    year: "2022",
    title: "Started Short-Form Editing",
    subtitle: "Premiere Pro & Fundamentals",
    description: "Began crafting cuts for YouTube creators and social media."
  }
];

export const CREATIVE_TOOLKIT = [
  {
    icon: "Pr",
    name: "Premiere Pro",
    category: "Video Editing",
    description: "Pacing & Assembly",
    experience: "3+ Years"
  }
];
