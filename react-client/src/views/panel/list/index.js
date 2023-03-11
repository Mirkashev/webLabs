import { useState, useEffect, useContext } from "react";
import Form from "../../../components/form";
import Api from "../../../services/api";
import { DataContext, PanelStageContext } from "../../../store";
import styles from './index.module.css'

export default function List(props) {
  const [list, setList] = useState([]);
  const {categories, requests, users, updateCategories, updateRequests, updateUsers} = useContext(DataContext);
  const {stage} = useContext(PanelStageContext);

  useEffect(()=> {
    const updatePage = async function(){
      try {
        const response = await Api.get({url:props.listType, cache:'reload'});
        const parsedData = await response.json();
    
        if(response.ok) {
          if(props.listType === 'requests') {
            updateRequests(parsedData);
          }

          if(props.listType === 'categories') {
            updateCategories(parsedData);
          }

          if(props.listType === 'users') {
            updateUsers(parsedData);
          }

        }else {
          alert("При обновлении данных возникла ошибка, повторите позднее");
        }
      } catch (error) {
        alert(error);
      }
    }
  
    const submit = async function(id, e){
      e.preventDefault();
      try {
        const response = await Api.patch({id:id, url:props.listType, e:e});
        const data = await response.json();
  
        if(response.ok) {
          updatePage();
        }
        
        alert(data.message);

      } catch (error) {
        alert('Что-то пошло не так, повторите запрос позднее');

      }
  
    }
  
    const remove = async function(id, e){
      e.preventDefault();
  
      try {
        const response = await Api.delete({id:id, url:props.listType});
        const data = await response.json();
  
        if(response.ok) {
          updatePage();
        }        

        alert(data.message);

      } catch (error) {
        alert('Что-то пошло не так, повторите запрос позднее');
      }
    }
    
    const data = stage === 'categories' ? categories : stage === 'requests' ? requests : users;

    if(!!data) {
      setList(data.map((element, index)=> <Form 
      formType={props.listType} 
      isList={true} 
      styles={styles} 
      key={props.listType + element.id}
      forInputs={props.listType + index} 
      submit={(e) => submit(element.id, e)} 
      element={element} 
      remove={(e) => remove(element.id, e)}
      categories={categories}
    />))
    }

  }, [categories, requests, users, updateCategories, updateRequests, updateUsers, props.listType])

  return list;
}