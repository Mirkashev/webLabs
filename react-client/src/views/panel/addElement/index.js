import { useContext } from 'react';
import { CategoriesForm, RequestsForm } from '../../../components/form';
import { PanelStageContext } from '../../../store';
import { otherQuery } from '../../../utils/queries';
import queryCheck  from '../../../utils/queryCheck';

import styles from './index.module.css'
export default function AddElement(props) {

  async function submit(e) {
    const response = await otherQuery(e, context, 'POST');
    if(response.ok) {
      alert("Ваша заявка отправлена!");
      // обновить кэш
      toggleIsNeedUpdate(true);
    }else {
      alert('Что-то пошло не так, повторите запрос позднее');
    }
  }

  const {context, toggleIsNeedUpdate} = useContext(PanelStageContext);
  
  return(
    <div className={styles.wrapper} onClick={(e)=> {
      props.toggleAddForm(false)
    }}>
      {context === "categories" ? <CategoriesForm styles={styles} submit={submit}/>: context === "requests" ? <RequestsForm styles={styles} submit={submit}/> : <></>}
    </div>
  )
}