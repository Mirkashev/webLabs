import styles from "./index.module.css";

export default function Login (props){
  return(
    <form className={styles.form} action="" method="post">
      <span className={styles.header}>Вход:</span>
      <input className={styles.input} type='text' placeholder="Имя или логин пользователя"/>
      <input className={styles.input} type='text' placeholder="Пароль пользователя"/>
      <button className={styles.switch_type} onClick={(e)=>{
        e.preventDefault();
        props.switchPageType(true);
      } }>Ещё нет аккаунта?</button>
      <input className={styles.submit} type='submit' />
    </form>
  )
}