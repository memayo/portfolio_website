// ✏️ EDIT YOUR CONTACT CARDS HERE — this is the only file you need to touch to
// add, remove, or update a card in the Contact page's hand of cards.
//
// Fields:
//   id           Unique, lowercase, no spaces — also names the icon/profile
//                image files below.
//   platform     Shown as the card's title (e.g. "GitHub").
//   username     Shown under the platform name.
//   handle       Optional @handle line. Set to null to hide it entirely — an
//                empty string still renders an empty "@" line, so use null.
//   description  Short line shown on the card.
//   url          Where the card opens on a second click/tap. Use 'mailto:...'
//                for email. Leave as '' if you don't have the link yet — the
//                card still works, it just shows "LINK NOT SET YET" instead of
//                an Open button, and a second click does nothing.
//   actionLabel  Button text once the card is pinned, e.g. 'Open GitHub ↗'.
//   clickBehavior  'pin-then-open' (default) | 'pin-only' — 'pin-only' never
//                  navigates, even on a second click. Omit for the default.
//
// Icon/profile images — drop files at these exact paths (per card id):
//   assets/contact/icons/<id>.png     small platform badge
//   assets/contact/profile/<id>.png   circular avatar
// Until a file exists, that slot shows an empty ring rather than a
// placeholder graphic.
//
// PortfolioSite.dc.html reads this as window.PortfolioContactCards — nothing
// in that file needs to change when you edit this array.
window.PortfolioContactCards = [
  { id: 'email', platform: 'Email', username: 'Phattarakul Saklor', handle: null,
    description: '',
    url: 'mailto:phattarakulsaklor@gmail.com', actionLabel: 'Send Email ↗' },

  { id: 'facebook', platform: 'Facebook', username: 'Phattarakul Saklor', handle: null,
    description: 'อัพเดตงานทั้งเสร็จทั้งไม่เสร็จ อยู่ในหน้าโปรไฟล์ทั้งหมด.',
    url: 'https://www.facebook.com/phattarakul.saklor', actionLabel: 'Open Facebook ↗' },

  { id: 'youtube', platform: 'YouTube', username: 'RaiD', handle: '@RaiD_Tester',
    description: 'ลงคริปยาว,Shortclips เกี่ยวกับโปรเจคต่างๆ.',
    url: 'https://www.youtube.com/@RaiD_Tester', actionLabel: 'Open YouTube ↗' },

  { id: 'github', platform: 'GitHub', username: 'RaiD', handle: '@memayo',
    description: '',
    url: 'https://github.com/memayo', actionLabel: 'Open GitHub ↗' },

  { id: 'itchio', platform: 'itch.io', username: 'raidxmr', handle: '@raidxmr',
    description: 'เกมกับผลงานหลักๆที่ทำเสร็จ.',
    url: 'https://raidxmr.itch.io', actionLabel: 'Open itch.io ↗' },

  { id: 'tiktok', platform: 'TikTok', username: 'RaiD', handle: '@raid.xmr123',
    description: 'Short clips จากโปรเจคต่างๆ.',
    url: 'https://www.tiktok.com/@raid.xmr123', actionLabel: 'Open TikTok ↗' },

  { id: 'instagram', platform: 'Instagram', username: 'RaiD', handle: '@xmerrer',
    description: 'อัพเดตผลงานต่างๆ(ยังมีไม่มาก).',
    url: 'https://www.instagram.com/xmerrer', actionLabel: 'Open Instagram ↗' },
];
