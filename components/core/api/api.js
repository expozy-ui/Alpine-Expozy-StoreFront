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
				cacheSet(url, json);
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

		// --- GET / DELETE нямат FormData ---
		if (method === 'GET') return options;
		if (method === 'DELETE') {
			options.headers['Content-Type'] = 'application/json';
			options.body = JSON.stringify(data);
			return options;
		}

		// --- POST / PUT ---
		if (data instanceof FormData) {
			options.body = data;
		} else if (typeof data === 'object') {
			const formData = new FormData();

			for (let key in data) {

				// multiple files
				if (Array.isArray(data[key]) && data[key][0] instanceof File) {

					for (const file of data[key]) {
						if (key.endsWith('[]')) formData.append(key, file);
						else formData.append(key + '[]', file);
					}

				} else if (Array.isArray(data[key])) {

					// multiple select
					data[key].forEach(v => formData.append(key, v));

				} else {

					// normal field
					formData.append(key, data[key]);
				}
			}

			options.body = formData;
		} else {
			// raw JSON
			options.headers['Content-Type'] = 'application/json';
			options.body = JSON.stringify(data);
		}

		return options;
	}

	getAuth() {
		let sessionId = /SESS\w*ID=([^;]+)/i.test(document.cookie) ? RegExp.$1 : false;
		return localStorage.getItem('token')
			? 'bearer ' + localStorage.getItem('token')
			: 'session ' + sessionId;
	}
}
