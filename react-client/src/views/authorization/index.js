import { useState } from "react";
import styles from "./index.module.css";
import Login from "./login";
import Registration from "./registration";
export default function Authorization(props) {
  const [isRegistration, switchPageType] = useState(true);
  return(

    <div className={styles.wrapper}>
      {isRegistration ? <Registration switchPageType={switchPageType}/>: <Login switchPageType={switchPageType}/>}
    </div>  
  )
}