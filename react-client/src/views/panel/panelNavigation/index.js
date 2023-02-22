import SelectList from "../../../components/selectList"
import styles from "./index.module.css"
import { useContext, useState } from 'react';
import { PanelStageContext, DataContext } from "../../../store";


export default function PanelNavigation(props) {
  const [isSettingsShown, toggleSettings] = useState(false)
  const [inputValue, setInputValue] = useState('');
  const {categories} = useContext(DataContext);
  const {stage} = useContext(PanelStageContext);

  return(
    <div className={styles.search}>
      <div className={styles.search__item}>
      <input 
        className={styles.search__input} 
        placeholder={stage === 'categories' ? 
          'Поиск по названию категории': 
          'Поиск по имени или номеру телефона'} 
        type="search" 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className={styles.search__button} onClick={()=>  props.goSearch(inputValue)}>Поиск</button>
      </div>
      <div className={styles.search_extra_params}>
        <button onClick={()=>
          props.isAddFormShown ? props.toggleAddForm(false) : props.toggleAddForm(true)}>
            Добавить новую запись
        </button>
        {stage === 'requests' ? 
          <button onClick={() => toggleSettings(!isSettingsShown)}>
            {isSettingsShown ? 
              'скрыть параметры поиска': 
              'показать параметры поиска'}
          </button> : <></>}
      </div>
      {isSettingsShown && stage === 'requests' ? 
        <SelectList 
          setSearchingParams={props.setSearchingParams}
          isSearchSettings={true} 
          data={categories}/> : 
        <></>}
    </div>
  )
}