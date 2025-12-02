export let Messages = {

  get_messages_rooms: async function (dataCollect) {
    let endpoint = Helpers.combineRequest('messages_rooms', dataCollect.combinedData);
    let api = new ApiClass();
    await api.get(endpoint, false);
    return api.response;
  },

  get_messages: async function (dataCollect) {
    let endpoint = Helpers.combineRequest('messages', dataCollect.combinedData);
    let api = new ApiClass();
    await api.get(endpoint, true);
    return api.response;
  },

  post_messages: async function (dataCollect) {

    // Запазваме единствената валидна логика — да не се праща празно съобщение
    if (!dataCollect.text || dataCollect.text === "") return 0;

    let endpoint = Helpers.combineRequest('messages', dataCollect.combinedData);
    let api = new ApiClass();
    await api.post(endpoint, dataCollect.combinedData);

    return api.response;
  },

};

window.Messages = Messages;
