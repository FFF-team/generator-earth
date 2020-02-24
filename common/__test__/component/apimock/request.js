function parseJSON(response){
	return response.json();
}
const stringifyParams = (params) => {
	if (!params) return null;
	return Object.keys(params).map((key) => (key + '=' + params[key])).join('&');

};

function checkStatus(response){
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else if (response.status === 404) {
		return response;
	} else {
		// message.error('出错啦,错误代码：' + response.status);
	}

	const error = new Error(response.statusText);
	error.response = response;
	throw error;
}

function handleData(data){
	//过滤条件
	if (data.rCode === 1) {
	}
	return data;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
let params = {};
export default {
	get: function(url, options){
		if (options && JSON.stringify(options) !== '{}') {
			url += '?' + stringifyParams(options);
		}

		return fetch(url, {
			method: 'get',
			headers: {
				'cache-control': 'no-cache',
				'referer-url': window.location.href,
				'Content-Type': 'application/json; charset=utf-8',
				'Accept': 'application/json'
			},
			credentials: 'include'
		})
			.then(checkStatus)
			.then(parseJSON)
			.then(handleData)
			.catch(err => {
				console.log(err);
			});
	},
	post: function(url, options,headers = {}){
		return fetch(url, {
			method: 'post',
			headers: Object.assign(
				{
					'cache-control': 'no-cache',
					'referer-url': window.location.href,
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json'
				},
				headers
			),
			credentials: 'include',
			body: JSON.stringify(options)
		})
			.then(checkStatus)
			.then(parseJSON)
			.then(handleData)
			.catch(err => {
				console.log(err);
			});
	},
	postForm: function(url, options,headers = {}){
		return fetch(url, {
			method: 'post',
			headers: Object.assign(
				{
					'cache-control': 'no-cache',
					'referer-url': window.location.href,
					'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
					'Accept': 'application/json'
				},
				headers,
			),
			credentials: 'include',
			body: stringifyParams(options)
		})
			.then(checkStatus)
			.then(parseJSON)
			.then(handleData)
			.catch(err => {
				console.log(err);
			});
	},
	uploadImage: function(url, options){
		return fetch(url, {
			method: 'POST',
			body: options
		})
			.then(response => response.text())
			.then(res => res)
			.catch(err => {
				console.log(err);
			});
	}
};
