export let Providers = {

	get_providers: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('providers', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, false);
		return api.response;
	},

};

window.Providers = Providers;
