export let Regions = {

	get_regions: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('regions', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, false);
		return api.response;
	},

};

window.Regions = Regions;
