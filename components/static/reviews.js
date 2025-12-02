export let Reviews = {

	post_product_comments: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('product_comments', dataCollect.combinedData);

		let api = new ApiClass();
		await api.post(endpoint, dataCollect.combinedData);

		// Запазваме единственото полезно поведение
		if (api.response?.status == 1) {
			api.response.clearForm = true;
		}

		return api.response;
	},

	get_product_comments: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('product_comments', dataCollect.combinedData);

		let api = new ApiClass();
		await api.get(endpoint, false);

		return api.response;
	},

	post_blog_comments: async function (dataCollect) {

		let api = new ApiClass();
		await api.post('blog_comments', dataCollect.combinedData);

		return api.response;
	},

	get_blog_comments: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('blog_comments', dataCollect.combinedData);

		let api = new ApiClass();
		await api.get(endpoint, false);

		return api.response;
	},

};

window.Reviews = Reviews;
