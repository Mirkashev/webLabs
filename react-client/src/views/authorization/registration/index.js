import Api from "../../../services/api";
import styles from "./index.module.css";
import { useState } from "react";

export default function Registration (props){
  async function submit(e){
    e.preventDefault();
    Api.post({url:'registration', e:e}).then(async (result) => {
      if(result.ok) {
        const data = await result.json();

        if(data.message) {
          alert('Данный логин уже используется!');
        }else {
          alert('Успешная регистрация!');
          props.toggleRegistration(false);
        }
      }else {
        alert('Что-то пошло не так, повторите запрос позднее');
      }
    })
  }

  const [isShowPassword, togglePassword] = useState(false);
  return(
    <form className={styles.form} action="" onSubmit={(e) => submit(e)}>
      <span className={styles.header}>Регистрация:</span>
      {/* <input className={styles.input} type='text' placeholder="Имя пользователя" minLength={2} required/> */}
      <input 
        className={styles.input} 
        name='login' 
        type='text' 
        placeholder="Логин пользователя" 
        minLength={6} 
        maxLength={64} 
        required/>
      <input 
        className={styles.input} 
        name='password' 
        type={isShowPassword ? 'text' : 'password'} 
        placeholder="Пароль пользователя" 
        minLength={6} 
        maxLength={64} 
        required/>
      <button className={styles.show_password} onClick={(e)=> {
        e.preventDefault();
        togglePassword(!isShowPassword);
      }}>{isShowPassword ? 'скрыть пароль' : 'показать пароль'}</button>
      <button className={styles.switch_type} onClick={(e)=>{
        e.preventDefault();
        props.toggleRegistration(false);
      } }>Уже есть аккаунт?</button>
      <input className={styles.submit}  value="Зарегистрироваться" type='submit' />
    </form>
  )
}