export let Auctions = {

	get_auctions: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('auctions', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, false);
		return api.response;
	},

};

window.Auctions = Auctions;