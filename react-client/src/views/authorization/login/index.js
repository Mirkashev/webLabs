import Api from "../../../services/api";
import styles from "./index.module.css";

export default function Login (props){
  const submit = async function(e) {
    e.preventDefault();
    Api.post({url:'login', e:e}).then(async (result) => {
      const data = await result.json();

      if(result.ok) {
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('role', data.role);
        props.toggleAuth(data.accessToken);
      }else {
        if(data.message) {
          alert('Неправильный логин или пароль!');
        }else {
          alert('Что-то пошло не так, повторите запрос позднее');
        }
      }
    })
  }
  return(
    <form className={styles.form} action="" onSubmit={submit}>
      <span className={styles.header}>Вход:</span>
      <input 
        className={styles.input} 
        name='login' 
        type='text' 
        minLength={6} 
        maxLength={64}  
        placeholder="Логин пользователя" 
        required/>
      <input 
        className={styles.input} 
        name='password' 
        type='password'         
        minLength={6} 
        maxLength={64}  
        placeholder="Пароль пользователя" 
        required/>
      <button className={styles.switch_type} onClick={(e)=>{
        e.preventDefault();
        props.toggleRegistration(true);
      } }>Ещё нет аккаунта?</button>
      <input className={styles.submit} value="Войти" type='submit' />
    </form>
  )
}