export let Countries = {

	get_countries: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('countries', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, true);
		return api.response;
	},

};

window.Countries = Countries;
