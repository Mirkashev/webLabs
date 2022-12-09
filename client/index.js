const { response } = require('express');

document.getElementById('submit').onclick = () => {
  const regex =
    /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

  const phone = document.getElementById('phone').value;
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  //   const advice = document.getElementById('advice').value;

  if (phone.match(regex)) {
    console.log('validated phone');
  }

  console.log(name, phone, description);

  fetch('http://localhost:3030/api/requests', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify({
      name: name,
      phone: phone,
      description: description,
      type: 0,
    }), // body data type must match "Content-Type" header
  }).then((response) => {
    if (response.ok) {
      alert('Заявка успешно отправлена!');
    }
  });
};
