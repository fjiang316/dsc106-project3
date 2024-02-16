

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.4b715092.js","_app/immutable/chunks/index.85c06012.js","_app/immutable/chunks/singletons.ae74bc4e.js"];
export const stylesheets = [];
export const fonts = [];
