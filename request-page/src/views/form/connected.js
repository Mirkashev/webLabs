import FormComponent from "./component";
import { useEffect, useState } from 'react';

const ConnectedForm = (props)=> {
  const [categories, setCategories] = useState([<option key={'af'} value={'af'}>{'Afghanistan'}</option>]);

  useEffect(()=> {
    const url = 'http://localhost:3030/api/';

    const headers = {
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
    };

    const getCategories = async ()=> {
      try {
        const response = await fetch(url+'categories', headers);
        const data = await response.json();
    
        if(response.ok) {
          const categories = data.map(el => <option key={el.id} value={el.id}>{el.name}</option>);
          console.log(categories)
          setCategories(categories);
    
        }else {
          alert(data.message);
        }
      } catch (error) {
        alert(error);
      }
    }

    getCategories();
  }, []);

  const send = async (e) => {
    e.preventDefault();
    let reqBody = {};
    const formData = new FormData(e.target)
    formData.forEach((value, key) => reqBody[key] = value);
    reqBody = JSON.stringify(reqBody);
    console.log(reqBody);
    alert('Отправлено!')
  }

  return (<FormComponent 
    categories={categories} 
    send={send} />);

}
export default ConnectedForm;