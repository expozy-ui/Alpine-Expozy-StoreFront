


export let Menu = {
	get_menu: async function (data) {

		var endpoint = Helpers.combineRequest('menu', data.combinedData);
		let api = new ApiClass();

		return await api.get(endpoint, true);
	}




};
