export let Marketplace = {

	post_marketplace_orders: async function (dataCollect) {
		let api = new ApiClass();
		await api.post('marketplace_orders', dataCollect.combinedData);
		return api.response;
	},

};

window.Marketplace = Marketplace;