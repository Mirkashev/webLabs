import { useContext } from 'react';
import Form from '../../../components/form';
import Api from '../../../services/api';
import { PanelStageContext, DataContext } from '../../../store';

import styles from './index.module.css'
export default function AddElement(props) {

  const updatePage = async function (){
    const response = await Api.get({url:stage, cache:'reload'});
    const parsedData = await response.json();

    if(stage === 'requests') {
      updateRequests(parsedData)
    }
    if(stage === 'categories') {
      updateCategories(parsedData)
    }
    if(stage === 'users') {
      updateUsers(parsedData);
    }
  }

  const submit = async function (e) {
    e.preventDefault();

    try {
      const response = await Api.post({url:stage, e:e});
  
      if(response.ok) {
        const data = await response.json();

        if(data.message) {
          alert('Данный логин уже используется!')
          return;
        }
        
        alert("Запись добавлена!");
        updatePage();
        props.toggleAddForm(false)
      }else {
        alert('Что-то пошло не так, повторите запрос позднее');
      }
    } catch (error) {
      alert(error);
    }

  }

  const {stage} = useContext(PanelStageContext);
  const {categories, updateCategories, updateRequests, updateUsers} = useContext(DataContext);

  return(
    <div className={styles.wrapper} onClick={()=> props.toggleAddForm(false)}>
      <Form 
        formType={stage} 
        isList={false} 
        styles={styles} 
        categories={categories}
        submit={submit}
      />
    </div>
  )
}