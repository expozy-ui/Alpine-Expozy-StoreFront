export let Sliders = {

	get_sliders: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('sliders', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, false);
		return api.response;
	},

	get_sliders_sections: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('sliders_sections', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, false);
		return api.response;
	},

};

window.Sliders = Sliders;
