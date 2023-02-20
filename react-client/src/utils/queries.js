export  async function getQuery(apiUrl, searchWord) {
  const requestParams = `${!!searchWord ? `?search_word=${searchWord}` : ''}`
  const response = await fetch(`http://localhost:3030/api/${apiUrl + requestParams}`, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    cache: 'force-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
  })

  console.log(apiUrl, !!searchWord, response)

  return response;
}

export async function getQueryForce(apiUrl, searchWord) {
  const requestParams = `${!!searchWord ? `?search_word=${searchWord}` : ''}`
  const response = await fetch(`http://localhost:3030/api/${apiUrl + requestParams}`, {
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
  })
  console.log(apiUrl, !!searchWord, response)


  return response;
}

export async function deleteQuery(apiUrl, id) {
  const response = await fetch(`http://localhost:3030/api/${apiUrl}?id=${id}`, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
  })

  return response;
}

export  async function otherQuery(e, apiUrl, method, id) {
  e.preventDefault();

  const reqBody = {};
  
  const formData = new FormData(e.target)
  formData.forEach((value, key) => (reqBody[key] = value));
  console.log(reqBody)

  const response = await fetch(`http://localhost:3030/api/${apiUrl}?id=${id}`, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(reqBody), // body data type must match "Content-Type" header
  })
  return response;
}