import styles from './index.module.css'
import { useContext, useEffect } from 'react'

import SelectList from '../selectList';
import Api from '../../services/api';
import { DataContext } from '../../store';

export default function Nav(props) {
  const { tables, updateTables } = useContext(DataContext);

  useEffect(()=>{
    Api.get({url:'tables', cache:'force-cache'}).then((result) => {
      (result.json()).then((parsedData) => updateTables(parsedData))
    })
  }, [updateTables])

  return(
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <span className={styles.logo__text}>Веб программирование</span>
        {props.isAuth ? <SelectList data={tables} type={'tables'}/> : <></>}
      </div>
      <div className={styles.auth}>
        {!props.isAuth ?<>{!props.isRegistration ? <button onClick={()=> props.toggleRegistration(true)}>Регистрация</button> : 
        <button onClick={()=> props.toggleRegistration(false)}>Вход</button>}</> : <><button onClick={()=> {
          props.toggleAuth('');
          localStorage.removeItem('token');
        }}>Выйти</button></>}
      </div>
    </div>
  )
}