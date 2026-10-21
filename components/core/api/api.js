(async function () {
	await import(`./cache.js?v=${JS_VERSION}`);
})();

export const lang = LANG;
export const currency = localStorage.getItem('currency');


export class ApiClass {

	constructor() {
		this.response = null;
		this.statusCode = null;
	}

	// -----------------------------
	//   Общ метод за заявка
	// -----------------------------
	async request(method, endpoint, data = null, cachable = false) {

		let url = this.buildUrl(endpoint);

		this.response = null;
		this.statusCode = null;

		// ---- GET с cache ----
		if (method === 'GET') {
			const cached = await cacheGet(url);


			if (cachable && cached && Object.keys(cached).length > 0) {
				this.response = cached;
				this.statusCode = 200;
				return cached;
			}
		}

		// ---- Fetch изпълнение ----
		try {
			const options = this.buildOptions(method, data);
			const response = await fetch(url, options);

			this.statusCode = response.status;

			const json = await response.json().catch(() => ({}));
			this.response = json;

			// redirect
			if (json.redirect) {
				location.href = json.redirect;
			}

			// cache GET
			if (method === 'GET' && response.ok) {
				await cacheSet(url, this.response);
			}

			return json;

		} catch (err) {
			console.error("API ERROR:", err);
			this.response = { error: true, msg: err.message };
			return this.response;
		}
	}

	// -----------------------------
	//   Методи за удобство
	// -----------------------------
	get(endpoint, cachable = false) {
		return this.request('GET', endpoint, null, cachable);
	}

	post(endpoint, data) {
		return this.request('POST', endpoint, data);
	}

	put(endpoint, data) {
		return this.request('PUT', endpoint, data);
	}

	delete(endpoint, data) {
		return this.request('DELETE', endpoint, data);
	}


	// -----------------------------
	//   Помощни методи
	// -----------------------------

	buildUrl(endpoint) {
		let tmp = endpoint.split('?');
		let url = COREURL + tmp[0] + '?lang=' + lang;

		if (currency != undefined) {
			url += '&currency=' + currency;
		}

		if (tmp[1] !== undefined) {
			url += '&' + tmp[1];
		}

		return url;
	}

	buildOptions(method, data) {
		let headers = {
			'authentication': 'basic ' + SAAS_KEY,
			'authorization': this.getAuth()
		};

		let options = {
			method: method,
			mode: 'cors',
			cache: 'no-cache',
			headers: headers
		};

		// --- GET / DELETE ---
		if (method === 'GET') return options;

		if (method === 'DELETE') {
			options.headers['Content-Type'] = 'application/json';
			options.body = JSON.stringify(data);
			return options;
		}

		// --------------------------
		//   POST / PUT / PATCH
		// --------------------------
		let containsFile = false;

		// Проверка дали има файлове
		if (data && typeof data === 'object') {
			for (let key in data) {
				const value = data[key];

				if (value instanceof File) {
					containsFile = true;
					break;
				}

				if (Array.isArray(value) && value[0] instanceof File) {
					containsFile = true;
					break;
				}
			}
		}

		// -----------------------------------------------------
		//  Ако НЯМА файлове → Пращай JSON за PUT и POST
		// -----------------------------------------------------
		if (!containsFile) {
			options.headers['Content-Type'] = 'application/json';
			options.body = JSON.stringify(data);
			return options;
		}

		// -----------------------------------------------------
		//  Ако ИМА файлове → Пращай FormData (POST/PUT)
		// -----------------------------------------------------
		let formData = new FormData();

		for (let key in data) {
			let value = data[key];

			if (Array.isArray(value) && value[0] instanceof File) {
				// multiple files
				value.forEach(file => {
					formData.append(key.endsWith('[]') ? key : key + '[]', file);
				});

			} else if (Array.isArray(value)) {
				// multi selects
				value.forEach(v => formData.append(key, v));

			} else {
				// regular field
				formData.append(key, value);
			}
		}

		options.body = formData;
		return options;
	}

	getAuth() {
		let sessionId = /SESS\w*ID=([^;]+)/i.test(document.cookie) ? RegExp.$1 : false;
		return localStorage.getItem('token')
			? 'bearer ' + localStorage.getItem('token')
			: 'session ' + sessionId;
	}
}
