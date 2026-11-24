export const profile = {
  name: 'Shaikh Aseel',
  role: 'Software developer',
  location: 'Nanded, India',
  email: 'shaikhmdaseel@gmail.com',
  avatar: '/images/avatar.webp',
  intro:
    'I build software that is simple, useful and genuinely nice to use: interfaces, AI tooling and developer tools, from the first sketch to something people can actually use.',
}

export const github = {
  user: 'Aseel012',
  // Baked snapshot taken 2026-11-23 from the public GitHub API.
  // The Open source page refreshes every count when the API answers.
  snapshotDate: 'Nov 23, 2026',
  mergedExternalPRs: 10,
  openExternalPRs: 5,
  closedExternalPRs: 7,
  contributedProjects: 8,
  followers: 8,
}

export const projects = [
  {
    slug: 'kavynui',
    title: 'kavynUI',
    year: '2026',
    blurb: 'A growing open-source library of animated React components and page sections, installed by name.',
    note: 'live at kavynui.com',
    body: [
      'kavynUI is a library of animated React components and full page sections. Every piece has a live preview and copy-paste code, covering WebGL, 3D, scroll effects, physics and more.',
      'Components are distributed through a shadcn-style registry: register the library once, then add anything by name with the CLI.',
    ],
    stack: ['React', 'JavaScript', 'Tailwind CSS'],
    links: [
      { label: 'GitHub', href: 'https://github.com/Aseel012/kavynui' },
      { label: 'Live', href: 'https://www.kavynui.com' },
    ],
    image: '/images/kavynui.webp',
  },
  {
    slug: 'tarrarium',
    title: 'Tarrarium',
    year: '2026',
    blurb: 'A cellular simulation engine that runs in the browser with Web Workers.',
    note: 'runs fully in your browser',
    body: [
      'Tarrarium simulates evolving digital organisms with procedural environments and real-time rendering.',
      'The heavy simulation work lives in Web Workers and typed arrays so the interface stays responsive, with time-travel scrubbing through every generation.',
    ],
    stack: ['React', 'TypeScript', 'Web Workers'],
    links: [
      { label: 'GitHub', href: 'https://github.com/Aseel012/tarrarium' },
      { label: 'Live', href: 'https://tarrarium.vercel.app' },
    ],
    image: '/images/tarrarium.webp',
  },
  {
    slug: 'removeanything',
    title: 'RemoveAnything.in',
    year: '2025',
    blurb: 'An AI image editor for removing objects, backgrounds and watermarks.',
    note: 'from upload to a clean image',
    body: [
      'RemoveAnything.in takes an image from upload to object or background removal and download in one pass.',
      'The processing pipeline uses Flask and Docker.',
    ],
    stack: ['Python', 'Flask', 'OpenCV'],
    links: [
      { label: 'Live', href: 'https://removeanything.in/' },
    ],
    image: '/images/removeanything.webp',
  },
  {
    slug: 'real-estate-ai',
    title: 'Real Estate AI',
    year: '2026',
    blurb: 'An AI voice-calling bot that follows up with real estate leads.',
    note: 'it literally calls people',
    body: [
      'A Flask API for scheduling and batch-running voice calls through Bland AI, with Google Sheets holding lead data.',
      'Webhook callbacks record call results. The project brings the calling service and lead workflow together behind a REST API.',
    ],
    stack: ['Python', 'Flask', 'Bland AI'],
    links: [{ label: 'GitHub', href: 'https://github.com/Aseel012/RealEstate-Ai' }],
    image: '/images/real_estate_banner.webp',
  },
  {
    slug: 'ai-carousel',
    title: 'AI Carousel Design System',
    year: '2025',
    blurb: 'Prompts, layout templates and typography rules for AI-generated carousel posts.',
    note: 'better slides, fewer guesses',
    body: [
      'A design system for social-media carousel posts: structured prompts, reusable HTML layouts, spacing rules and color references.',
      'The aim is consistent slide design through explicit constraints rather than hoping an image model gets the layout right.',
    ],
    stack: ['HTML', 'Prompts', 'Typography'],
    links: [{ label: 'GitHub', href: 'https://github.com/Aseel012/AI-Carousel-Design-System' }],
    image: '/images/carousel.webp',
  },
  {
    slug: 'shareyou',
    title: 'ShareYou',
    year: '2025',
    blurb: 'Share files across devices on the same network, no cloud upload.',
    note: null,
    body: [
      'ShareYou is a cross-platform Flutter app that moves files between devices on the same local network.',
      'Nothing goes through the cloud. Devices find each other automatically, and the interface stays minimal.',
    ],
    stack: ['Flutter', 'Dart'],
    links: [{ label: 'GitHub', href: 'https://github.com/Aseel012/shareyou' }],
    image: '/images/shareyou_banner.webp',
  },
  {
    slug: 'recipe-api',
    title: 'Recipe API',
    year: '2026',
    blurb: 'A recipe management REST API with validation, pagination and Swagger docs.',
    note: null,
    body: [
      'A NestJS API covering CRUD, validation, pagination and filtering.',
      'The database is normalized with Prisma on PostgreSQL, and every endpoint is documented with Swagger.',
    ],
    stack: ['NestJS', 'PostgreSQL', 'Prisma'],
    links: [{ label: 'GitHub', href: 'https://github.com/Aseel012/recepiapi' }],
    image: null,
  },
]

export const openSource = [
  { project: 'radix-ui/primitives', status: 'merged', detail: 'Fixed nested ContextMenu triggers all starting the touch long-press at once.', href: 'https://github.com/radix-ui/primitives/pull/4199' },
  { project: 'mantinedev/mantine', status: 'merged', detail: 'Fixed searchable inputs ignoring typing in a specific state.', href: 'https://github.com/mantinedev/mantine/pull/9278' },
  { project: 'wasmCloud/wasmCloud', status: 'merged', detail: 'OCI push and pull now trust the OS certificate store.', href: 'https://github.com/wasmCloud/wasmCloud/pull/5609' },
  { project: 'DavidHDev/react-bits', status: 'merged', detail: 'StaggeredMenu pre-layers follow the panel width.', href: 'https://github.com/DavidHDev/react-bits/pull/1104' },
  { project: 'cms-patatrack/CLUEstering', status: 'merged', detail: 'Validates the backend early with clear errors.', href: 'https://github.com/cms-patatrack/CLUEstering/pull/592' },
  { project: 'cms-patatrack/CLUEstering', status: 'merged', detail: 'Raises a clear error when a valid backend has not been compiled yet.', href: 'https://github.com/cms-patatrack/CLUEstering/pull/595' },
  { project: 'Ashutoshx7/VengeanceUI', status: 'merged', detail: 'Accessible Share Sheet with QR download and focus trap.', href: 'https://github.com/Ashutoshx7/VengeanceUI/pull/91' },
  { project: 'Ashutoshx7/VengeanceUI', status: 'merged', detail: 'Added the Share Sheet contributor credits to the docs.', href: 'https://github.com/Ashutoshx7/VengeanceUI/pull/94' },
  { project: 'naftiko/ikanos', status: 'merged', detail: 'Clarified the create-capability prompts in the CLI.', href: 'https://github.com/naftiko/ikanos/pull/765' },
  { project: 'JackFurton/who-would-build-a-kernel-in-java', status: 'merged', detail: 'String.isBlank, equalsIgnoreCase and split with tests.', href: 'https://github.com/JackFurton/who-would-build-a-kernel-in-java/pull/181' },
  { project: 'LibreChat-AI/LibreChat', status: 'open', detail: 'Adds overflow protection to the message wrapper.', href: 'https://github.com/LibreChat-AI/LibreChat/pull/15433' },
  { project: 'centricai/arvx-mcp', status: 'open', detail: 'Serves MCP 2026-07-28 alongside 2025-era clients.', href: 'https://github.com/centricai/arvx-mcp/pull/2' },
  { project: 'inkeep/agents', status: 'open', detail: 'Fixed 7 dead links and 6 broken redirects in the docs.', href: 'https://github.com/inkeep/agents/pull/3593' },
  { project: 'inkeep/agents', status: 'open', detail: 'Teaches the docs link checker to cover snippets, card links and redirects.', href: 'https://github.com/inkeep/agents/pull/3594' },
  { project: 'dubinc/docs', status: 'open', detail: 'Adds the missing API errors reference.', href: 'https://github.com/dubinc/docs/pull/546' },
  { project: 'shadcn-ui/ui', status: 'closed', detail: 'Proposed adding kavynUI to the component registry.', href: 'https://github.com/shadcn-ui/ui/pull/12696' },
  { project: 'adobe/react-spectrum', status: 'closed', detail: 'Prevented plain Enter activation after focus moves on macOS.', href: 'https://github.com/adobe/react-spectrum/pull/10752' },
  { project: 'OpenDevicePartnership/bq40z50', status: 'closed', detail: 'Limited async buffer writes to the payload size.', href: 'https://github.com/OpenDevicePartnership/bq40z50/pull/89' },
  { project: 'Significant-Gravitas/AutoGPT', status: 'closed', detail: 'Contained execution file paths per run in the backend.', href: 'https://github.com/Significant-Gravitas/AutoGPT/pull/14640' },
  { project: 'appwrite/appwrite', status: 'closed', detail: 'Fixed a missing space in the Functions description.', href: 'https://github.com/appwrite/appwrite/pull/13666' },
  { project: 'BerriAI/litellm', status: 'closed', detail: 'Tracked rerank usage metadata.', href: 'https://github.com/BerriAI/litellm/pull/36206' },
  { project: 'Astropress/astropress', status: 'closed', detail: 'Added platform request guidelines to the README.', href: 'https://github.com/Astropress/astropress/pull/37' },
]

export const writing = [
  { title: "China’s AI Stocks Lost $480 Billion in Four Months. Here Is What That Number Does and Does Not Mean", date: "Oct 28, 2026", href: "https://medium.com/@shaikhmdaseel/chinas-ai-stocks-lost-480-billion-in-four-months-here-is-what-that-number-does-and-does-not-mean-819332244d2f" },
  { title: "Meta’s AI Budget Is Growing. What Happens to the People?", date: "Oct 24, 2026", href: "https://medium.com/@shaikhmdaseel/metas-ai-budget-is-growing-what-happens-to-the-people-e2cdbde22a49" },
  { title: "Why I’m Building Another React UI Library (and What It’s Teaching Me)", date: "Oct 14, 2026", href: "https://medium.com/@shaikhmdaseel/why-im-building-another-react-ui-library-and-what-it-s-teaching-me-f7655cb19fa2" },
  { title: "Why AI-Generated UI Looks the Same, and What I Do About It", date: "Oct 14, 2026", href: "https://medium.com/@shaikhmdaseel/why-ai-generated-ui-looks-the-same-and-what-i-do-about-it-7f8ff88494d9" },
  { title: "When Experienced Developers Leave Big Tech to Build Their Own Businesses", date: "Sep 25, 2026", href: "https://medium.com/@shaikhmdaseel/when-experienced-developers-leave-big-tech-to-build-their-own-businesses-0776db6e647f" },
  { title: "ChatGPT Handles 70 Million Storage Requests Every Second. The Weird Part Is How OpenAI Got There", date: "Sep 15, 2026", href: "https://medium.com/@shaikhmdaseel/chatgpt-handles-70-million-storage-requests-every-second-the-weird-part-is-how-openai-got-there-f7a523eb179f" },
  { title: "Google Quietly Built an AI That Fine-Tunes AI While You Sleep", date: "Sep 15, 2026", href: "https://medium.com/@shaikhmdaseel/google-quietly-built-an-ai-that-fine-tunes-ai-while-you-sleep-b0c42275fa88" },
  { title: "The ‘Lethal Trifecta’ Isn’t the Threat It’s the Checklist.", date: "Aug 13, 2026", href: "https://medium.com/@shaikhmdaseel/the-lethal-trifecta-isn-t-the-threat-it-s-the-checklist-10af623e7682" },
  { title: "The Hidden Journey Behind Every AI Response", date: "Aug 2, 2026", href: "https://medium.com/@shaikhmdaseel/the-hidden-journey-behind-every-ai-response-0469c9fcb3a8" },
  { title: "AI Carousels Are Ruining Your Brand Identity (And How to Fix It)", date: "Jul 30, 2026", href: "https://medium.com/@shaikhmdaseel/ai-carousels-are-ruining-your-brand-identity-and-how-to-fix-it-8ad4616c3cc7" }
]

export const experience = [
  {
    "role": "Freelance product developer",
    "org": "Self-employed, remote",
    "period": "May 2026 - Present",
    "detail": "Delivering web projects end to end for early clients: including a Shopify storefront and custom e-commerce work."
  },
  {
    "role": "Flutter development intern",
    "org": "Dream Webbies Technologies",
    "period": "",
    "detail": "Built app modules with Flutter and Dart and integrated REST APIs."
  }
]

export const education = [
  {
    "title": "B.Tech, Information Technology",
    "org": "SGGS Institute of Engineering & Technology, Nanded",
    "period": "2025 - 2028"
  },
  {
    "title": "Diploma, Computer Science",
    "org": "Gramin Technical & Management Campus, Nanded",
    "period": "2022 - 2025"
  }
]

export const certifications = [
  {
    "title": "Introduction to Model Context Protocol",
    "org": "Anthropic",
    "period": "Jul 2026"
  }
]

export const skills = [
  {
    "group": "Languages used",
    "items": [
      "JavaScript",
      "TypeScript",
      "Python",
      "Dart",
      "Java",
      "C++",
      "SQL"
    ]
  },
  {
    "group": "Frontend",
    "items": [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Flutter"
    ]
  },
  {
    "group": "Backend",
    "items": [
      "Node.js",
      "NestJS",
      "Spring Boot",
      "Microservices",
      "Flask",
      "Python",
      "Rust",
      "PostgreSQL",
      "Prisma"
    ]
  },
  {
    "group": "AI",
    "items": [
      "Model Context Protocol",
      "OpenCV",
      "Gemini API"
    ]
  },
  {
    "group": "Tools",
    "items": [
      "Git",
      "Docker",
      "Vercel",
      "Vitest",
      "Figma"
    ]
  }
]

export const tools = [
  {
    "name": "ASCII.MOTION",
    "blurb": "Visual converter that turns images into animated ASCII.",
    "href": "https://asciiu.vercel.app"
  },
  {
    "name": "DitherMe",
    "blurb": "Upload an image and dither it with Floyd-Steinberg, Bayer, Atkinson and more.",
    "href": "https://dithering-omega.vercel.app"
  },
  {
    "name": "LENS",
    "blurb": "Fish eye editor with type overlays.",
    "href": "https://fisheye-lac.vercel.app"
  },
  {
    "name": "OG Preview",
    "blurb": "Open Graph inspector that previews how a link looks when shared.",
    "href": "https://oglinker.vercel.app"
  }
]

export const socials = [
  {
    "id": "github",
    "label": "GitHub",
    "handle": "@Aseel012",
    "href": "https://github.com/Aseel012"
  },
  {
    "id": "linkedin",
    "label": "LinkedIn",
    "handle": "Shaikh Md Aseel",
    "href": "https://www.linkedin.com/in/shaikh-md-aseel-29091b27b/"
  },
  {
    "id": "x",
    "label": "X",
    "handle": "@ShaikhMdAseel25",
    "href": "https://x.com/ShaikhMdAseel25"
  },
  {
    "id": "medium",
    "label": "Medium",
    "handle": "@shaikhmdaseel",
    "href": "https://medium.com/@shaikhmdaseel"
  },
  {
    "id": "leetcode",
    "label": "LeetCode",
    "handle": "ShaikhMdAseel",
    "href": "https://leetcode.com/u/ShaikhMdAseel/"
  },
  {
    "id": "producthunt",
    "label": "Product Hunt",
    "handle": "@shaikh_md_aseel",
    "href": "https://www.producthunt.com/@shaikh_md_aseel"
  },
  {
    "id": "resume",
    "label": "Resume",
    "handle": "Google Drive",
    "href": "https://drive.google.com/file/d/18dCc-P0LYKL3qpxW5TasOTNymRNkkli-/view?usp=drive_link"
  }
]
