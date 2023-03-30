import styles from "./index.module.css"
import { useContext, useEffect, useState } from 'react';
import { PanelStageContext, DataContext } from "../../../store";
import Api from "../../../services/api";


export default function PanelNavigation(props) {
  const [inputValue, setInputValue] = useState('');
  const [inputPlaceholder, setInputPlaceholder] = useState('Поиск по названию категории');
  const {updateCategories, updateRequests, updateUsers} = useContext(DataContext);
  const {stage} = useContext(PanelStageContext);

  const search = async () => {
    const response = await Api.get({url:stage, searchWord: inputValue});
    const data = await response.json();
    if(response.ok) {
      switch (stage) {
        case 'categories':
          return updateCategories(data);
        case 'requests':
          return updateRequests(data);
        case 'users':
          return updateUsers(data);
        default:
          return;
      }
    }else {
      alert(data.message);
      if(response.status == 401) {
        localStorage.removeItem('token');
      }
    }

  }

  useEffect(()=>{
    const handlePlaceholder = ()=> {
      if(stage === 'categories' || stage === 'requests') {
        setInputPlaceholder('Поиск по названию категории');
      }

      // if(stage === 'requests') {
      //   setInputPlaceholder('Поиск по категории');
      // }

      if(stage === 'users') {
        console.log('here')
        setInputPlaceholder('Поиск по логину');
      }
    }

    handlePlaceholder();

    setInputValue('');
  }, [stage])

  return(
    <div className={styles.search}>
      <div className={styles.search__item}>
      <input 
        className={styles.search__input} 
        placeholder={inputPlaceholder} 
        type="search" 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className={styles.search__button} onClick={search}>Поиск</button>
      </div>
      <div className={styles.search_extra_params}>
        {localStorage.getItem('role') != 1 ? <button onClick={()=>
          props.isAddFormShown ? props.toggleAddForm(false) : props.toggleAddForm(true)}>
            Добавить новую запись
        </button> : <></>}
      </div>
    </div>
  )
}