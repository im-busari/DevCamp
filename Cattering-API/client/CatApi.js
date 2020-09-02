const fetch = require('node-fetch');

class CatApi {
  constructor(config) {
    this.api_url = config.api_url;
  }

  request(endpoint = '', options = {}) {
    let url = this.api_url + endpoint;
    console.log(url);
    let headers = {
      'Content-type': 'application/json',
      Accept: 'application / json',
    };

    let config = {
      method: options.method,
      body: options.body,
      'Content-type': 'application/json',
      Accept: 'application/json',
    };

    return fetch(url, config);
  }

  createCat(body) {
    const options = {
      method: 'POST',
      body: JSON.stringify(body),
    };
    console.log(options.body);
    return this.request('/register', options);
  }
}

module.exports = CatApi;
