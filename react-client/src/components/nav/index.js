import styles from './index.module.css'
import { useContext, useEffect } from 'react'

import SelectList from '../selectList';
import Api from '../../services/api';
import { DataContext } from '../../store';

export default function Nav(props) {
  console.log('rendering nav')
  let isAuth = props.page === "auth";
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
        {!isAuth ? <SelectList data={tables} type={'tables'}/> : <></>}
      </div>
      <div className={styles.auth}>
        {/* {!isAuth ?<><button>Регистрация</button>
        <button>Вход</button></> : <><button>Выйти</button></>} */}
      </div>
    </div>
  )
}