import styles from "./index.module.css";
import { useState } from 'react';
import AddElement from "./addElement";
import List from "./list";
import PanelNavigation from "./panelNavigation";


export default function Panel(props) {
  const [isAddFormShown, toggleAddForm] = useState(false);

  return(
    <div className={styles.wrapper}>
      <PanelNavigation toggleAddForm={toggleAddForm} isAddFormShown={isAddFormShown}/>
      <div className={styles.list}>
        {isAddFormShown ? 
          <AddElement 
            toggleAddForm={toggleAddForm}/> :
          <></>}
        <div className={styles.list__render_place}>
          <List/>
        </div>
      </div>
    </div>  
  )
}