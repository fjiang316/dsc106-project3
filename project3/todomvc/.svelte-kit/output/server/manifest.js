export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","output.csv","repeatedCities.csv"]),
	mimeTypes: {".png":"image/png",".csv":"text/csv"},
	_: {
		client: {"start":"_app/immutable/entry/start.0d84590b.js","app":"_app/immutable/entry/app.ecfffc88.js","imports":["_app/immutable/entry/start.0d84590b.js","_app/immutable/chunks/index.85c06012.js","_app/immutable/chunks/singletons.ae74bc4e.js","_app/immutable/entry/app.ecfffc88.js","_app/immutable/chunks/index.85c06012.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
