export let Blog = {

	get_blogPosts: async function (dataCollect) {
		debugger;
		let endpoint = Helpers.combineRequest('blogPosts', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, false);
		return api.response;
	},

	get_blogCategories: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('blogCategories', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, false);
		return api.response;
	},

	get_blogPosts_filters: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('blogPosts_filters', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, false);
		return api.response;
	},

};

window.Blog = Blog;