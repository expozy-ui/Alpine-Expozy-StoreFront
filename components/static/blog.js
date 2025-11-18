


export let Blog = {

	get_blogPosts: async function (dataCollect) {

		let response = [];

		response.keyName = 'blogPosts';


		// if ("chnageurl" in options || (dataProxy[response.keyName] != undefined && "chnageurl" in dataProxy[response.keyName])) {
		// 	if (!("initial" in options)) {
		// 		delete dataProxy.pageUrl.page;
		// 	}
		// 	data = Object.assign({}, dataProxy.pageUrl, data);
		// 	dataProxy.pageUrl = data;
		// }


		let endpoint = Helpers.combineRequest('blogPosts', dataCollect.combinedData);

		let api = new ApiClass();
		await api.get(endpoint, false);


		response = api.response;



		// if ("chnageurl" in options || (dataProxy[response.keyName] != undefined && "chnageurl" in dataProxy[response.keyName])) {
		// 	response['obj'].chnageurl = true;

		// 	endpoint = endpoint.replace(response.keyName, "");
		// 	history.replaceState(null, null, endpoint);
		// }

		// if ('scroll' in options) {
		// 	document.getElementById('main').scrollIntoView(true);
		// }


		return response;
	},

	get_blogCategories: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('blogCategories', dataCollect.combinedData);
		let api = new ApiClass();

		await api.get(endpoint, false);

		return api.response;
	},

	get_blogPosts_filters: async function (dataCollect) {

		let response = [];

		let endpoint = Helpers.combineRequest('blogPosts_filters', dataCollect.combinedData);
		let api = new ApiClass();

		await api.get(endpoint, false);

		return api.response;

	},





};
window.Blog = Blog;
