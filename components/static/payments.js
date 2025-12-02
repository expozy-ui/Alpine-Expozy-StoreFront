export let Payments = {

	get_payment_methods: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('payment_methods', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, false);
		return api.response;
	},

};

window.Payments = Payments;
