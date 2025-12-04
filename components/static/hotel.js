export let Hotel = {

    get_hotel_room_types: async function (dataCollect) {


        data.date_start = localStorage.getItem('date_start');
        data.date_end = localStorage.getItem('date_end');


        if (data.date_start != undefined && data.date_end != undefined) {
            dataCollect.combinedData.daterange = `${data.date_start} : ${data.date_end}`;
        }
        if (data.guestsSearch != undefined) {
            dataCollect.combinedData.guests = data.guestsSearch;
        }

        let response = [];

        let endpoint = Helpers.combineRequest('hotel_room_types', dataCollect.combinedData);

        let api = new ApiClass();
        await api.get(endpoint, false);

        if (!api.response) {
            response['internalError'] = 'No response from api for Hotel.hotel_room_types';
            return response;
        }

        response.obj = api.response;

        return response;
    },

    post_hotel_reservations: async function (dataCollect) {

        let response = [];
        response.errors = [];

        let api = new ApiClass();

        dataCollect.combinedData.feeding_id = 1;
        dataCollect.combinedData.daterange = `${data.date_start} : ${data.date_end}`;

        // Rooms & guests from localStorage
        let rooms = JSON.parse(localStorage.getItem('rooms')) || [];
        let guests = JSON.parse(localStorage.getItem('guests')) || [];

        dataCollect.combinedData['room_types[]'] = rooms;
        dataCollect.combinedData['room_guests[]'] = guests;
        dataCollect.combinedData.room_count = rooms.length;

        // Required fields
        let reqInputs = document.getElementsByClassName('req');
        Array.from(reqInputs).forEach(input => {
            if (!input.value.trim()) {

                const name = input.getAttribute('name');
                if (name) {
                    response.errors[`[name="${name}"]`] =
                        LANG == 'bg'
                            ? 'Моля, попълнете полето.'
                            : 'Please fill in the field.';

                    response.status = 0;
                }
            }
        });

        // Terms
        if (dataCollect.combinedData.terms == undefined || dataCollect.combinedData.terms == 0) {
            response.errors[`[name="termAgreeError"]`] =
                LANG == 'bg'
                    ? 'Моля, сългасете се с условията за резервиране.'
                    : 'Please agree to the booking conditions.';
        }

        if (response.status == 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return response;
        }

        // Build clients structure
        let clients = [];

        for (let room = 0; room < data.hotelCart.rooms.length; room++) {
            let guestIndex = 0;
            let roomGuest = [];

            while (dataCollect.combinedData[`first_name[${room}][${guestIndex}]`] !== undefined) {

                roomGuest.push({
                    email: dataCollect.combinedData[`email[${room}][${guestIndex}]`],
                    phone: dataCollect.combinedData[`phone[${room}][${guestIndex}]`],
                    first_name: dataCollect.combinedData[`first_name[${room}][${guestIndex}]`],
                    last_name: dataCollect.combinedData[`last_name[${room}][${guestIndex}]`],
                    middle_name: dataCollect.combinedData[`middle_name[${room}][${guestIndex}]`],
                    nationality: dataCollect.combinedData[`nationality[${room}][${guestIndex}]`],
                });

                guestIndex++;
            }

            clients.push(roomGuest);
        }

        dataCollect.combinedData.clients = JSON.stringify(clients);

        await api.post('hotel_reservations', dataCollect.combinedData);

        if (!api.response) {
            response['internalError'] = 'No response from api for Shop.hotel_reservations';
            return response;
        }

        if (api.response.status == 1) {

            localStorage.removeItem('rooms');
            localStorage.removeItem('guests');

            response = api.response;

            if (api.response.form != undefined) {
                document.open();
                document.write(api.response.form);
                document.close();
            }

            response.keyName = 'checkout';
        }

        return response;
    },

    post_hotel_calculate: async function (dataCollect) {

        let response = {
            emtpy: 1
        };
        let api = new ApiClass();


        data.date_start = localStorage.getItem('date_start');
        data.date_end = localStorage.getItem('date_end');

        dataCollect.combinedData.daterange = `${data.date_start} : ${data.date_end}`;
        dataCollect.combinedData.calculate = 1;
        dataCollect.combinedData.feeding_id = 1;

        let rooms = JSON.parse(localStorage.getItem('rooms')) || [];
        let guests = JSON.parse(localStorage.getItem('guests')) || [];

        // Add room before calculation
        if (dataCollect.combinedData.newRoom != undefined && dataCollect.combinedData.type != undefined && dataCollect.combinedData['guests[]'] != undefined) {
            dataCollect.combinedData['guests[]'].forEach(function (item) {
                rooms.push(dataCollect.combinedData.type);
                guests.push(item);
            });
        }

        // Delete room
        if (dataCollect.combinedData.delete != undefined && dataCollect.combinedData.index != undefined) {
            rooms.splice(dataCollect.combinedData.index, 1);
            guests.splice(dataCollect.combinedData.index, 1);

            localStorage.setItem('rooms', JSON.stringify(rooms));
            localStorage.setItem('guests', JSON.stringify(guests));
        }

        dataCollect.combinedData['room_types[]'] = rooms;
        dataCollect.combinedData['room_guests[]'] = guests;
        dataCollect.combinedData.room_count = rooms.length;

        if (dataCollect.combinedData.room_count == 0) {
            data.hotelCart = '';
            return response;
        }

        await api.post('hotel_reservations', dataCollect.combinedData);

        if (api.response.error_code == 0 && dataCollect.combinedData.newRoom != undefined) {
            api.response.status = 1;
            api.response.msg =
                LANG == 'bg'
                    ? 'Успешно добавена стая към количката'
                    : 'Room successfully added to cart';
        }


        if (api.response.error == '') {
            delete api.response.error;
            localStorage.setItem('rooms', JSON.stringify(rooms));
            localStorage.setItem('guests', JSON.stringify(guests));
        } else {
            api.response.status = 0;
            api.response.erros = api.response.error;
        }
        data.addRoom = '';

        return api.response;
    },

    setDates: async function (dataCollect) {

        let response = [];
        response.keyName = 'searchOptions';
        response.errors = {};

        if (dataCollect.combinedData.date_end == "") {
            response.errors['[name="errDate"]'] =
                LANG == 'bg'
                    ? 'Моля, въведете дати за настаняване'
                    : 'Please enter check-in dates';

            response.status = 0;
        }

        if (dataCollect.combinedData.date_start == "") {
            response.errors['[name="errDate"]'] =
                LANG == 'bg'
                    ? 'Моля, въведете дати за настаняване'
                    : 'Please enter check-in dates';

            response.status = 0;
        }

        if (response.status == 0) return response;

        // Save to global Alpine data
        data.date_start = dataCollect.combinedData.date_start;
        data.date_end = dataCollect.combinedData.date_end;
        data.guestsSearch = dataCollect.combinedData.guestsSearch;

        // Save locally
        localStorage.setItem('date_start', dataCollect.combinedData.date_start);
        localStorage.setItem('date_end', dataCollect.combinedData.date_end);
        localStorage.setItem('guestsSearch', dataCollect.combinedData.guestsSearch);

        href(`/${LANG}/accommodation`);

        return response;
    },

    get_hotel_reservations: async function (dataCollect) {

        let response = [];
        // response.errors = [];

        // Summary request – redirect if missing data
        if (
            (dataCollect.combinedData.last_name == undefined ||
                dataCollect.combinedData.date == undefined) &&
            dataCollect.combinedData.summary != undefined
        ) {
            href('/');
            return response;
        }

        // Modal request
        if (dataCollect.combinedData.modalCheck != undefined) {

            if (!dataCollect.combinedData.last_name) {
                response.errors[`[name="last_name"]`] =
                    LANG == 'bg'
                        ? 'Моля, попълнете фамилия.'
                        : 'Please fill in your last name.';
                response.status = 0;
            }

            if (!dataCollect.combinedData.date) {
                response.errors[`[name="dateErr"]`] =
                    LANG == 'bg'
                        ? 'Моля, изберете дата за резервация.'
                        : 'Please select a booking date';
                response.status = 0;
            }

            if (response.status == 0) return response;
        }

        let endpoint = Helpers.combineRequest('hotel_reservations', dataCollect.combinedData);

        let api = new ApiClass();
        await api.get(endpoint, true);

        if (dataCollect.combinedData.modalCheck != undefined) {
            if (api.response.id == 0 || api.response.id == undefined) {
                response.status = 0;
                response.errors[`[name="modalCheck"]`] =
                    LANG == 'bg'
                        ? 'Няма намерена резервация за този период.'
                        : 'No reservation found for this period.';
                return response;
            }

            data.reserveCheck = false;
            href(`/${LANG}/ordersummary?date=${dataCollect.combinedData.date}&last_name=${dataCollect.combinedData.last_name}`);
        }

        if (!api.response) {
            response['internalError'] = 'No response from api for Hotel.hotel_reservations';
            return response;
        }

        response.obj = api.response;
        response.keyName = 'hotel_reservations';

        return response;
    },

};

window.Hotel = Hotel;
