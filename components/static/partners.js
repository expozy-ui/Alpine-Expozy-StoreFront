export let Partners = {

	get_partners: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('partners', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, false);
		return api.response;
	},

};

window.Partners = Partners;
