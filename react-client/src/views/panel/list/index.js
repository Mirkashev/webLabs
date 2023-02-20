import { useState, useEffect, useContext } from "react";
import Form from "../../../components/form";
import Api from "../../../services/api";
import { DataContext } from "../../../store";
import styles from './index.module.css'

export default function List(props) {
  async function updatePage(){
    Api.get({url:props.listType, cache:'reload'}).then((result) =>{
      return result.json()
    }).then((parsedData) => {
      if(props.listType === 'requests') {
        updateRequests(parsedData)
      }else {
        updateCategories(parsedData)
      }
    })
  }

  async function submit(id, e) {
    e.preventDefault();
    // добавить трайкетчи потому что не всегда отправляется запрос и приходит промис и перенести сюда превент дефолт
    Api.patch({id:id, url:props.listType, e:e}).then((response) => {
      if(response.ok) {
        alert("Успешное редактирование!");
        updatePage();
      }else {
        alert('Что-то пошло не так, повторите запрос позднее');
      }
    })
  }

  async function remove(id, e) {
    e.preventDefault();

    Api.delete({id:id, url:props.listType}).then((response) => {
      if(response.ok) {
        alert("Успешное удаление!");
        updatePage();
      }else {
        alert('Что-то пошло не так, повторите запрос позднее');
      }
    })
  }

  const [list, setList] = useState([]);

  const {categories, requests, updateCategories, updateRequests} = useContext(DataContext);

  useEffect(()=> {
    console.log(categories)
    const data = (props.listType === 'categories' ? categories : requests);

    if(data !== null) {
      setList(data.map((element, index)=> <Form 
        formType={props.listType} 
        isList={true} 
        styles={styles} 
        key={props.listType + index} 
        submit={(e) => submit(element.id, e)} 
        element={element} 
        remove={(e) => remove(element.id, e)}
        categories={categories}
      />))
    }

  }, [(props.listType === 'categories' ? categories : requests), props.listType])

  return list;
}