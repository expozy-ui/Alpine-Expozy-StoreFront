export let Brands = {

	get_brands: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('brands', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, false);
		return api.response;
	},

};

window.Brands = Brands;