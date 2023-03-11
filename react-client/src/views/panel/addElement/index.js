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
      console.log('addReq')
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
      const data = await response.json();

      if(response.ok) {
        updatePage();
        props.toggleAddForm(false);
      }
      alert(data.message);
    } catch (error) {
      alert('Что-то пошло не так, повторите запрос позднее');
    }
  }

  const {stage} = useContext(PanelStageContext);
  const {categories, updateCategories, updateRequests, updateUsers} = useContext(DataContext);
  
  console.log(categories);

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