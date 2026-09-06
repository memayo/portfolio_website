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
    images: ['assets/image/Spastrust.png', 'assets/image/sp1.jpg', 'assets/image/sp2.jpg', 'assets/image/sp3.png'],
    description: 'ยินดีต้อนรับสู่ Vocab Defense เกมป้องกันฐานแนวใหม่ที่คุณต้องใช้สมองและความไวในการเลือกคำศัพท์เพื่อยิงปืนใหญ่สกัดกั้นเหล่าศัตรูที่กำลังบุกรุกเข้ามา!',
    link: 'https://raidxmr.itch.io/vocab-defen',
    linkLabel: 'Play',
  },
  { title: 'Starwars Animation',
    rank: 'K', suit: 'heart',
    tags: ['Godot', 'Lua'],
    image: 'assets/image/{starwar_mung}.0277 2.png',
    description: 'A narrative puzzler about a magician who runs out of tricks — and out of time.',
  },
  { title: 'Portfolio Website',
    rank: '3', suit: 'club',
    tags: ['3D Modeling'],
    image: 'assets/image/portfolioWebsite.png',
    description: 'A card-battler with fully modeled 3D decks that warp as the game turns against you.',
  },
  { title: '{Protect Santa}',
    rank: '3', suit: 'club',
    tags: ['3D Modeling'],
    image: 'assets/image/protectsanta.png',
    description: 'A card-battler with fully modeled 3D decks that warp as the game turns against you.',
  },
  { title: 'The Shcool',
    rank: '3', suit: 'club',
    tags: ['3D Modeling'],
    description: 'A card-battler with fully modeled 3D decks that warp as the game turns against you.',
  },
  { title: 'The forest',
    rank: '3', suit: 'club',
    tags: ['3D Modeling'],
    description: 'A card-battler with fully modeled 3D decks that warp as the game turns against you.',
  },

];
