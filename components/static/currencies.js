

export let Currencies = {

	//  ========= Фунцкия за форматиране на цената ===============
	// const formatted = new Intl.NumberFormat('en-US', {
	// 	style: 'currency',
	// 	currency: 'USD',
	//    }).format(123456.78); // "$123,456.78"




	get_currencies: async function (data, options) {
		let response = [];

		let endpoint = Helpers.combineRequest('currencies', data);

		let api = new ApiClass();
		await api.get(endpoint, true);

		if (!api.response) return response['internalError'] = 'No response from api for Currencies.get_currencies';

		response['obj'] = api.response;
		response['keyName'] = 'currencies';

		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		if ("initial" in options && options['initial'] == true) return Handler.responseHandler(response);

		return response;
	},





}

window.Currencies = Currencies;
