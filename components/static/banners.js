export let Banners = {

	get_banners: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('banners', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, false);
		return api.response;
	},

};

window.Banners = Banners;