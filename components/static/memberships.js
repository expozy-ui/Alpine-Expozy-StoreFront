export let Memberships = {

	get_memberships: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('memberships', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, true);
		return api.response;
	},

};

window.Memberships = Memberships;