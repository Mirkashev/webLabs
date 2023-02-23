export default new class Api{
  constructor(){
    this.location = 'http://localhost:3030/api/'
    this.requestHeaders = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      cache: 'reload', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
    }
  }

  async sendRequest(params){
    delete this.requestHeaders.body;

    this.requestHeaders.method = params.method;
    this.request = this.location + params.url;

    if(!!params?.body) {
      this.requestHeaders.body = params.body;
    }

    if(!!params?.cache) {
      this.requestHeaders.cache = params.cache;
    }

    if(!!params?.searchWord || !!params?.searchingParams) {
      if(!!params?.searchWord && !!params?.searchingParams) {
        const requestParams = `?search_word=${params.searchWord}&search_params=${params.searchingParams}`;
        return await fetch(this.request + requestParams, this.requestHeaders)
      }

      if(!!params?.searchWord) {
        const requestParams = `?search_word=${params.searchWord}`;
        return await fetch(this.request + requestParams, this.requestHeaders)
      }

      if(!!params?.searchingParams) {
        const requestParams = `?search_params=${params.searchingParams}`;
        return await fetch(this.request + requestParams, this.requestHeaders)
      }
    }

    if(!!params?.id) {
      const requestParams = `?id=${params.id}`;
      return await fetch(this.request + requestParams, this.requestHeaders)
    }

    return await fetch(this.request, this.requestHeaders)
  }

  async get(params){
    let tempObject = params;
    tempObject.method = 'GET';

    return this.sendRequest(tempObject);
  }

  async post(params){
    params.e.preventDefault();

    let tempObject = params;
    tempObject.method = 'POST';

    const reqBody = {};
    
    const formData = new FormData(params.e.target)
    formData.forEach((value, key) => (reqBody[key] = value));
    tempObject.body = JSON.stringify(reqBody);

    return this.sendRequest(tempObject);
  }

  async delete(params) {
    let tempObject = params;
    tempObject.method = 'DELETE';
    return this.sendRequest(tempObject);
  }

  async patch(params) {
    let tempObject = params;
    tempObject.method = 'PATCH';

    const reqBody = {};
    
    const formData = new FormData(params.e.target)
    formData.forEach((value, key) => (reqBody[key] = value));
    tempObject.body = JSON.stringify(reqBody);

    return this.sendRequest(tempObject);
  }

}();