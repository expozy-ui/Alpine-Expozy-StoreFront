export let Econt = {

	get_offices: async function (dataCollect) {

		// Задължителен параметър за endpoint-а
		dataCollect.combinedData.offices = true;

		let endpoint = Helpers.combineRequest('econt', dataCollect.combinedData);

		let api = new ApiClass();
		await api.get(endpoint, true);

		return api.response;
	},

};

window.Econt = Econt;
