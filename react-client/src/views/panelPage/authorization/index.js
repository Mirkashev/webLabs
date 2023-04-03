import { useState } from "react";
import styles from "./index.module.css";
import Login from "./login";
import Registration from "./registration";
export default function Authorization(props) {
  // const [isRegistration, switchPageType] = useState(true);
  return(

    <div className={styles.wrapper}>
      {props.isRegistration ? 
      <Registration toggleRegistration={props.toggleRegistration} toggleAuth={props.toggleAuth}/> : 
      <Login toggleRegistration={props.toggleRegistration} toggleAuth={props.toggleAuth}/>}
    </div>  
  )
}