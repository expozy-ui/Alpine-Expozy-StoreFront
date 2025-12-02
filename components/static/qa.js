export let Qa = {

	get_qa: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('qa', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, false);
		return api.response;
	},

	post_qa: async function (dataCollect) {
		let api = new ApiClass();
		await api.post('qa', dataCollect.combinedData);
		return api.response;
	},

};

window.Qa = Qa;
