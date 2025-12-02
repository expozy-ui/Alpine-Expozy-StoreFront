export let Ads = {

	// GET ADS
	get_ads: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('ads', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, false);
		return api.response;
	},

	get_ads_plans: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('ads_plans', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, false);
		return api.response;
	},

	get_ads_types: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('ads_types', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, false);
		return api.response;
	},

	get_ads_fields: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('ads_fields', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, false);
		return api.response;
	},

	get_ads_categories: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('ads_categories', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, false);
		return api.response;
	},

	get_ads_wishlist: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('ads_wishlist', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, false);
		return api.response;
	},


	// POST ADS
	post_ads: async function (dataCollect) {
		let api = new ApiClass();
		await api.post('ads', dataCollect.combinedData);
		return api.response;
	},

	// PUT ADS
	put_ads: async function (dataCollect) {
		let api = new ApiClass();
		await api.put('ads', dataCollect.combinedData);
		return api.response;
	},


	// DELETE ADS
	delete_ads: async function (dataCollect) {
		let api = new ApiClass();
		await api.delete(`ads/${dataCollect.combinedData.id}`, dataCollect);
		return api.response;
	},


	// DELETE ADS IMAGES
	delete_ads_images: async function (dataCollect) {
		let api = new ApiClass();
		await api.delete(`ads_images/${dataCollect.combinedData.id}`, dataCollect);
		return api.response;
	},

};

window.Ads = Ads;
