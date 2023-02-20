import styles from "./index.module.css";
import { useContext, useEffect, useState } from 'react';
import AddElement from "./addElement";
import List from "./list";
import { PanelStageContext, DataContext } from "../../store";
// import SearchSettings from "./searchSettings";
import SelectList from "../../components/selectList";
import Api from '../../services/api';


export default function Panel(props) {
  async function getData() {
    const isFirstLoad = (stage === 'categories' ? 
    isFirstLoadCategories : isFirstLoadRequests);

    const response = await Api.get({url:stage, cache:isFirstLoad});
    const parsedData = await response.json();

    if(stage === 'requests') {
      updateRequests(parsedData)
    }else {
      updateCategories(parsedData)
    }

    if(stage === 'categories' && isFirstLoadCategories === 'reload') {
      toggleIsFirstLoadCategories('force-cache');
    }
    if(stage === 'requests' && isFirstLoadRequests === 'reload') {
      toggleIsFirstLoadRequests('force-cache');
    }
  }

  const [isAddFormShown, toggleAddForm] = useState(false);
  const [isSettingsShown, toggleSettings] = useState(false)
  const [inputValue, setInputValue] = useState('');
  const [searchWord, goSearch] = useState('');
  const {stage} = useContext(PanelStageContext);
  const {categories, requests, updateCategories, updateRequests} = useContext(DataContext);

  // нужно сервер настроить и убрать костыль(разобраться как на сервере отправлять ответ в префлайт - data is up to date)
  const [isFirstLoadRequests, toggleIsFirstLoadRequests] = useState('reload');
  const [isFirstLoadCategories, toggleIsFirstLoadCategories] = useState('reload');
  // search function

  useEffect(()=> {
    getData();
  }, [stage])

  return(
    <div className={styles.wrapper}>
      {/* вынести в отдельный компонент навигацию панели */}
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
        <button className={styles.search__button} onClick={()=> goSearch(inputValue)}>Поиск</button>
        </div>
        <div className={styles.search_extra_params}>
          <button onClick={()=>
            isAddFormShown ? toggleAddForm(false) : toggleAddForm(true)}>
            {isAddFormShown ?
              'Закрыть форму добавления':
              'Добавить новую запись'}
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
            isSearchSettings={true} 
            data={categories}/> : 
          <></>}
      </div>
      <div className={styles.list}>
        {isAddFormShown ? 
          <AddElement 
            toggleAddForm={toggleAddForm}/> :
          <></>}
        <div className={styles.list__render_place}>
          <List inputSearch={searchWord} listType={stage} />
        </div>
      </div>
    </div>  
  )
}