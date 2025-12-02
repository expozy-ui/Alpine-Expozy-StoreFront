export let Returns = {

	post_returns: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('returns', dataCollect.combinedData);

		let api = new ApiClass();
		await api.post(endpoint, dataCollect.combinedData);

		return api.response;
	},

};

window.Returns = Returns;
