

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.2f73ff2d.js","_app/immutable/chunks/index.85c06012.js"];
export const stylesheets = ["_app/immutable/assets/2.c1609e92.css"];
export const fonts = [];
