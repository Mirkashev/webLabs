import styles from "./index.module.css";
import { useContext, useEffect, useState } from 'react';
import AddElement from "./addElement";
import List from "./list";
import { PanelStageContext, DataContext } from "../../store";
// import SearchSettings from "./searchSettings";
// import SelectList from "../../components/selectList";
import Api from '../../services/api';
import PanelNavigation from "./panelNavigation";


export default function Panel(props) {
  const [isAddFormShown, toggleAddForm] = useState(false);
  const [searchWord, goSearch] = useState('');
  const [searchingParams, setSearchingParams] = useState('');

  const {stage} = useContext(PanelStageContext);
  const {updateCategories, updateRequests, updateUsers} = useContext(DataContext);
  // нужно сервер настроить и убрать костыль(разобраться как на сервере отправлять ответ в префлайт - data is up to date)
  const [isFirstLoadRequests, toggleIsFirstLoadRequests] = useState('reload');
  const [isFirstLoadCategories, toggleIsFirstLoadCategories] = useState('reload');
  const [isFirstLoadUsers, toggleIsFirstLoadUsers] = useState('reload');
  // search function
  useEffect(()=> {
    const getData = async function() {
      const isFirstLoad = (stage === 'categories' ? 
      isFirstLoadCategories : stage === 'requests' ? isFirstLoadRequests : isFirstLoadUsers);

      const requestParams = {
        url:stage, 
        cache:isFirstLoad,
      }

      if(!!searchWord) {
        requestParams.searchWord = searchWord;
        requestParams.cache = 'reload';
      }
      
      if(!!searchingParams) {
        requestParams.searchingParams = searchingParams;
        requestParams.cache = 'reload';
      }
  
      const response = await Api.get(requestParams);
      const parsedData = await response.json();
  
      if(stage === 'requests') {
        updateRequests(parsedData)
      }
      if(stage === 'categories'){
        updateCategories(parsedData)
      }
      if(stage === 'users'){
        updateUsers(parsedData)
      }
  
      // if(stage === 'categories' && isFirstLoadCategories === 'reload') {
      //   toggleIsFirstLoadCategories('force-cache');
      // }
      // if(stage === 'requests') {
      //   toggleIsFirstLoadRequests('force-cache');
      // }
      // if(stage === 'users' && isFirstLoadUsers === 'reload') {
      //   toggleIsFirstLoadUsers('force-cache');
      // }
    }

    getData();
  }, [stage, searchWord, searchingParams])

  return(
    <div className={styles.wrapper}>
      <PanelNavigation toggleAddForm={toggleAddForm} goSearch={goSearch} isAddFormShown={isAddFormShown} setSearchingParams={setSearchingParams}/>
      <div className={styles.list}>
        {isAddFormShown ? 
          <AddElement 
            toggleAddForm={toggleAddForm}/> :
          <></>}
        <div className={styles.list__render_place}>
          <List inputSearch={searchWord} listType={stage}/>
        </div>
      </div>
    </div>  
  )
}