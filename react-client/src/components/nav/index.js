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
        (result.json()).then((parsedData) => {
          if(result.ok) {
            updateTables(parsedData)
          }else {
            alert(parsedData.message);
            if(result.status === 401) {
              localStorage.removeItem('token');
            }
          }
        })
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
        {
          !props.isAuth ? 
          <button onClick={()=> props.toggleRegistration(!props.isRegistration)}>
            {!props.isRegistration ? 'Регистрация' : 'Вход'}</button> : 
          <button onClick={()=> {
            props.toggleAuth('');
            localStorage.removeItem('token');
          }}>Выйти</button>
        }
      </div>
    </div>
  )
}