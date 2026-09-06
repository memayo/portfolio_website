// ✏️ EDIT YOUR PROJECT CARDS HERE — this is the only file you need to touch to
// add, remove, or reorder a project on the Projects page.
//
// Fields:
//   title        Card title.
//   rank         Playing-card rank shown in the card's corners (A, 2-10, J, Q, K).
//   suit         'spade' | 'heart' | 'diamond' | 'club' — sets the corner glyph
//                and the tag-badge color.
//   tags         Short labels shown under the title.
//   image        Cover art. Also used as the only modal slide if `images` is omitted.
//   images       Optional — full list of modal-carousel slides (cover included).
//   previewVideo Optional short muted loop that plays on card hover.
//                Drop a clip at assets/video/projects/<slug>.mp4.
//   description  Shown in the project detail modal.
//   link         Optional outbound link (e.g. an itch.io page). Omit to hide the button.
//   linkLabel    Button text when `link` is set. Defaults to "Play Demo".
//
// PortfolioSite.dc.html reads this as window.PortfolioProjects — nothing in
// that file needs to change when you edit this array.
window.PortfolioProjects = [
  { title: 'Spash Rush',
    rank: '7', suit: 'diamond',
    tags: ['Godot', '3D Modeling', 'Game Jam'],
    image: 'assets/image/Spastrust.png',
    images: ['assets/image/Spastrust.png', 'assets/image/sp1.jpg', 'assets/image/sp2.jpg', 'assets/image/sp3.png'],
    previewVideo: 'assets/video/Spastrust.mov',
    description: 'คุณ อยู่ในดินแดนรกร้างที่เต็มไปด้วย ผู้คนสติเพี้ยน ที่ต้องการจะทำร้ายคุณด้วย อาวุธ สุดอันตราย "กระป๋องแป้ง!!" คุณต้องเอาชีวิตรอดเพื่อหาทางออกไปให้ใด้!!',
    link: 'https://raidxmr.itch.io/splash-bush',
    linkLabel: 'itch.io',
  },
  { title: 'Vocab Defense',
    rank: 'Q', suit: 'spade',
    tags: ['Godot', '2D Game', 'Web Game'],
    image: 'assets/image/vocabdefent.png',
    images: ['assets/image/vocabdefent.png', 'assets/image/VCB1.jpg', 'assets/image/VCB2.jpg'],
    description: 'ยินดีต้อนรับสู่ Vocab Defense เกมป้องกันฐานแนวใหม่ที่คุณต้องใช้สมองและความไวในการเลือกคำศัพท์เพื่อยิงปืนใหญ่สกัดกั้นเหล่าศัตรูที่กำลังบุกรุกเข้ามา!',
    previewVideo: 'assets/video/Timeline 1.mov',
    link: 'https://raidxmr.itch.io/vocab-defen',
    linkLabel: 'Play',
  },
  { title: 'Starwars Animation',
    rank: '7', suit: 'diamond',
    tags: ['Unreal Engine 5', '3D animation', 'Cinematic'],
    image: 'assets/image/starwars-cover.webp',
    images: ['assets/image/starwars-animation.png', 'assets/image/starwars-scene.webp', 'assets/image/starwars-cover.webp'],
    description: 'ทำ Animation / Cinematic ด้วย Unreal Engine 5 ภายในระยะเวลา 1 สัปดาห์ ',
    previewVideo: 'assets/video/starwar.mov',
    link: 'https://www.tiktok.com/@raid.xmr123/video/7545895795749375250',
    linkLabel: 'Full video',  },
  
    { title: 'Portfolio Website',
    rank: '3', suit: 'club',
    tags: ['3D Modeling', 'Web Development', 'Portfolio','blender','AI'],
    image: 'assets/image/portfolioWebsite.png',
    images: ['assets/image/Group 17.png', 'assets/image/pw1.png', 'assets/image/portfolioWebsite.png'],
    description: 'เว็บไซต์ Portfolio ส่วนตัวสำหรับรวบรวมผลงานด้าน Game Development และ Programming  ',
    previewVideo: 'assets/video/10000979085.mp4',
  },
  { title: 'Protect Santa',
    rank: 'A', suit: 'club',
    tags: ['Roblox Studio', 'Fist Project', 'Tower Defense'],
    image: 'assets/image/protectsanta.png',
    images: ['assets/image/noFilter.webp', 'assets/image/noFilter (2).webp', 'assets/image/noFilter (1).webp'],
    description: 'เกม Tower Defense ธีมคริสต์มาส พัฒนา ด้วย Roblox Studio ',
    previewVideo: 'assets/video/santa_p.mov',
    link: 'https://www.roblox.com/games/102565007546840/unnamed',
    linkLabel: 'Roblox',  },
  
  { title: 'The Shcool',
    rank: '3', suit: 'club',
    tags: ['3D Modeling'],
    description: 'A card-battler with fully modeled 3D decks that warp as the game turns against you.',
  },
  { title: 'Lost in the Forest',
    rank: 'J', suit: 'heart',
    tags: ['Unreal Engine 5', 'horror', 'game jam'],
    image: 'assets/image/lf4.png',
    images: ['assets/image/lf1.png', 'assets/image/lf2.png', 'assets/image/lf3.png'],
    description: 'เกม Horror / Survival ที่พัฒนา ด้วย Unreal Engine 5 เข้าร่วมกิจกรรม Game Jam horror game jame 2025 (ยังไม่เสร็จ)" ',
    previewVideo: 'assets/video/lost_thef.mov',}
    

];
