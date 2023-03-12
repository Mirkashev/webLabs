import styles from './index.module.css'
import { useContext, useEffect } from 'react'

import Api from '../../services/api';
import { DataContext } from '../../store';
import SetStage from './setStage';

export default function Nav(props) {
  const { updateTables } = useContext(DataContext);

  useEffect(()=>{
    if(!!props.isAuth) {
      Api.get({url:'tables', cache:'reload'}).then((result) => {
        (result.json()).then((parsedData) => updateTables(parsedData))
      })
    }
  }, [updateTables, props.isAuth])

  return(
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <span className={styles.logo__text}>Веб программирование</span>
        {props.isAuth ? <SetStage/> : <></>}
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