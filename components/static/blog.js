export let Blog = {

	get_blogPosts: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('blogPosts', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, false);
		return api.response;
	},

	get_blogCategories: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('blogCategories', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, false);
		return api.response;
	},

	get_blogPosts_filters: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('blogPosts_filters', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, false);
		return api.response;
	},

	get_home_sections: async function (dataCollect) {

		const api = new ApiClass();

		// 1) Взимаме всички категории
		await api.get('blogCategories', true);

		data.categories = api.response;

		const categories = Array.isArray(api.response) ? api.response : (api.response?.result || []);

		// 2) Първите 5 категории
		const first5 = categories.slice(0, 5);

		// 3) За всяка категория взимаме постовете
		//    Ако имаш нужда от лимит, го подай тук (пример 8).
		const limitPerCategory = 8;

		const sections = await Promise.all(
			first5.map(async (cat) => {
				const apiPosts = new ApiClass();

				// Сглобяваме request payload-а към blogPosts
				// Важно: комбинираме combinedData + category_id + limit
				const postsPayload = {
					category_id: cat.id,
					limit: limitPerCategory
				};

				const endpointPosts = Helpers.combineRequest('blogPosts', postsPayload);
				await api.get(endpointPosts, false);

				const postsResponse = api.response;
				const posts = Array.isArray(postsResponse) ? postsResponse : (postsResponse?.result || []);

				return {
					category: cat,   // {id, title, slug, ...}
					posts: posts     // масив от блог постове за тази категория
				};
			})
		);


		return sections;
	}

};

window.Blog = Blog;