export let Warehouse = {

  get_warehouses: async function (dataCollect) {
    let endpoint = Helpers.combineRequest('warehouses', dataCollect.combinedData);
    let api = new ApiClass();
    await api.get(endpoint, false);

    return api.response;
  },

};

window.Warehouse = Warehouse;
