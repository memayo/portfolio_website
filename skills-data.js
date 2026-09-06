// ✏️ EDIT YOUR SKILLS HERE — this is the only file you need to touch to add,
// remove, or reorder a skill card on the Skills page.
//
// Three chapters, in the order they should scroll: Programming, Game
// Development, Design / 3D Tools. Add or remove a whole chapter by adding or
// removing an entry in this top-level array; add or remove a skill within a
// chapter by editing that chapter's `items`. The 01…NN numbering, the chapter
// counters ("03 / 08"), and the final summary grid are all derived
// automatically from this array — you never need to renumber anything by hand.
//
// Each skill needs:
//   name   Shown on its card and in the final summary.
//   icon   Path to a logo image. Drop your own file at this exact path —
//          png/svg/webp all fine. Until the file exists, the card shows an
//          empty ring rather than a placeholder graphic.
//
// PortfolioSite.dc.html reads this as window.PortfolioSkillGroups — nothing
// in that file needs to change when you edit this array.
window.PortfolioSkillGroups = [
  { category: 'Programming', items: [
    { name: 'Python', icon: 'assets/skills/python.png' },
    { name: 'Lua', icon: 'assets/skills/lua.png' },
    { name: 'C', icon: 'assets/skills/c.png' },
  ] },
  { category: 'Game Development', items: [
    { name: 'Godot', icon: 'assets/skills/godot.png' },
    { name: 'Unreal Engine 5', icon: 'assets/skills/unreal-engine.png' },
    { name: 'Roblox Studio', icon: 'assets/skills/roblox-studio.png' },
  ] },
  { category: 'Design / 3D Tools', items: [
    { name: 'Figma', icon: 'assets/skills/figma.png' },
    { name: 'Blender', icon: 'assets/skills/blender.png' },
  ] },
];
