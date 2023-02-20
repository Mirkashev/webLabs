import { useState, useEffect, useContext } from "react";
import { CategoriesForm, RequestsForm } from "../../../components/form";
import Api from "../../../services/api";
import { DataContext } from "../../../store";
import styles from './index.module.css'

export default function List(props) {
  async function updatePage(){
    Api.get({url:props.listType, cache:'reload'}).then((result) =>{
      return result.json()
    }).then((parsedData) => {
      props.listType === 'categories' ?
     updateCategories(parsedData) : 
     updateRequests(parsedData)
    })
  }

  async function submit(id, e) {
    // добавить трайкетчи потому что не всегда отправляется запрос и приходит промис
    Api.patch({id:id, url:props.listType, e:e}).then((response) => {
      if(response.ok) {
        alert("Успешное редактирование!");
        updatePage();
        // обновить кэш
        // toggleUpdateData(true);
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
        // обновить кэш
        // toggleUpdateData(true);
      }else {
        alert('Что-то пошло не так, повторите запрос позднее');
      }
    })
  }

  const [list, setList] = useState([]);

  const {updateCategories, updateRequests} = useContext(DataContext);

  useEffect(()=> {
    if(props.data !== null) {
      // forms to one component
      setList(props.data.map((element, index)=> props.listType === 'categories' ? 
      <CategoriesForm 
        isList={true} 
        styles={styles} 
        key={props.listType + index} 
        submit={(e) => submit(element.id, e)} 
        element={element} 
        remove={(e) => remove(element.id, e)}
      /> : 
      <RequestsForm 
        isList={true} 
        styles={styles} 
        key={props.listType + index} 
        submit={(e) => submit(element.id, e)} 
        element={element} 
        remove={(e) => remove(element.id, e)}
      />))
    }

  }, [props.data])

  return list;
}