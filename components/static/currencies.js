export let Currencies = {

	get_currencies: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('currencies', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, true);
		return api.response;
	},

};

window.Currencies = Currencies;
