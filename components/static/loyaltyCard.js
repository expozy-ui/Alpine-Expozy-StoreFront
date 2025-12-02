export let LoyaltyCard = {

	get_loyalty_card: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('loyalty_card', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, true);
		return api.response;
	},

	get_my_loyalty_card: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('my_loyalty_card', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, true);
		return api.response;
	},

};

window.LoyaltyCard = LoyaltyCard;