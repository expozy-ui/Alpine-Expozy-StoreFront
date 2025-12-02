export let Invoices = {

	get_invoices: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('invoices', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, true);
		return api.response;
	},

};

window.Invoices = Invoices;