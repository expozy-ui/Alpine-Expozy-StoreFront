export let Contacts = {

	post_contacts: async function (dataCollect) {
		let api = new ApiClass();
		await api.post('contacts', dataCollect.combinedData);
		return api.response;
	},

};

window.Contacts = Contacts;