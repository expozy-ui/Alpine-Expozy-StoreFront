export let Timeslots = {

	get_time_slots: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('time_slots', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, false);
		return api.response;
	},

	get_time_slots_days: async function (dataCollect) {
		let endpoint = Helpers.combineRequest('time_slots_days', dataCollect.combinedData);
		let api = new ApiClass();
		await api.get(endpoint, false);
		return api.response;
	},

};

window.Timeslots = Timeslots;
