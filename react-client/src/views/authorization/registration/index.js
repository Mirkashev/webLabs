import styles from "./index.module.css";

export default function Registration (props){
  return(
    <form className={styles.form} action="" method="post">
      <span className={styles.header}>Регистрация:</span>
      <input className={styles.input} type='text' placeholder="Имя пользователя"/>
      <input className={styles.input} type='text' placeholder="Логин пользователя"/>
      <input className={styles.input} type='text' placeholder="Пароль пользователя"/>
      <button className={styles.switch_type} onClick={(e)=>{
        e.preventDefault();
        props.switchPageType(false);
      } }>Уже есть аккаунт?</button>
      <input className={styles.submit} value="Войти" type='submit' />
    </form>
  )
}