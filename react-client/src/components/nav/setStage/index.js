import { useContext, useEffect, useState } from 'react'
import api from '../../../services/api';
import { DataContext, PanelStageContext } from '../../../store';

export default function SetStage(props) {
  async function contextUpdate(contextName, contextValue) {
    switch (contextName) {
      case 'categories':
        return updateCategories(contextValue);
      case 'requests':
        return updateRequests(contextValue);
      case 'users':
        return updateUsers(contextValue);
      case 'roles':
        return updateRoles(contextValue);
      default: return;
    }
  }

  async function handleList(e){
    setSelectValue(e.target.value)

    if(e.target.value === 'requests') {
      const response2 = await api.get({url:'categories'});
      const data2 = await response2.json();
      contextUpdate('categories', data2);
    }

    if(e.target.value === 'users') {
      const response2 = await api.get({url:'roles'});
      const data2 = await response2.json();
      contextUpdate('roles', data2);
    }

    const response = await api.get({url:e.target.value});
    const data = await response.json();
    contextUpdate(e.target.value, data);
    setStage(e.target.value);
  }

  const [selectValue, setSelectValue] = useState(props.selectedElement);
  const {setStage} = useContext(PanelStageContext);
  const {tables, updateCategories, updateRequests, updateUsers, updateRoles} = useContext(DataContext);
  const [tablesList, updateList] = useState([]);

  useEffect(()=> {
    const getTablesList = async function () {
      if(!!tables) {
        updateList(tables.map((element, index)=> 
        <option 
          key={'setStage: ' + index} 
          value={!!element?.id ? element.id : Object.values(element)} 
        >
          { !!element?.id ? element.name : Object.values(element) }
        </option>))
      }

    }

    if(tables !== null) getTablesList();
  }, [tables])

  return(
    <select name={props.name} onChange={handleList} value={selectValue}>
      {tablesList}
    </select>
  )
}