export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { type } = req.query || {};

  const videoProjects = [
    {
      id: "podcast-viral-clip",
      title: "Viral Podcast Hook & Dynamic Captions",
      category: "Podcast",
      client: "The Mindset Podcast",
      views: "1.2M Views",
      tools: ["Premiere Pro", "After Effects"],
      thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "gaming-montage-reels",
      title: "High-Paced Gaming & Sci-Fi Edit",
      category: "Gaming",
      client: "Apex Creator Channel",
      views: "850K Views",
      tools: ["After Effects", "Premiere Pro"],
      thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "talking-head-coach",
      title: "Executive Talking Head Reel",
      category: "Talking Head",
      client: "SaaS Founder",
      views: "450K Views",
      tools: ["Premiere Pro", "Photoshop"],
      thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const devProjects = [
    {
      id: "finsync",
      name: "FinSync - Financial Platform",
      category: "Full Stack / Web3",
      tech: ["React", "Node.js", "TailwindCSS"],
      github: "https://github.com/Ankit25akofficial"
    },
    {
      id: "redoxchess",
      name: "Redox Chess Engine",
      category: "WASM / AI",
      tech: ["Rust", "WebAssembly", "React"],
      github: "https://github.com/Ankit25akofficial"
    }
  ];

  if (type === 'video') {
    return res.status(200).json({ success: true, count: videoProjects.length, data: videoProjects });
  }

  if (type === 'dev') {
    return res.status(200).json({ success: true, count: devProjects.length, data: devProjects });
  }

  return res.status(200).json({
    success: true,
    data: {
      video: videoProjects,
      developer: devProjects
    }
  });
}
