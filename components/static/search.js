export let Search = {

	get_search: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('search', dataCollect.combinedData);

		let api = new ApiClass();
		await api.get(endpoint, true);

		return api.response;
	},

};

window.Search = Search;
