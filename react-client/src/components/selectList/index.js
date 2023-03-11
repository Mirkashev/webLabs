import { useContext, useEffect, useState } from 'react'
import { PanelStageContext } from '../../store';

export default function SelectList(props) {
  async function handleList(e){
    setSelectValue(e.target.value)

    if(props.type === 'tables') {
      setStage(e.target.value)
    }

    if(props.isSearchSettings) {
      if(e.target.value === 'reset') {
        props.setSearchingParams('');
      }else {
        props.setSearchingParams(e.target.value)
      }
    }
  }

  const [selectValue, setSelectValue] = useState(props.selectedElement);
  const {setStage} = useContext(PanelStageContext);
  const [tablesList, updateList] = useState([]);

  useEffect(()=> {
    const getTablesList = async function () {
      // избавиться от ссылки
      const data = props.data;
  
      // if(props.isSearchSettings && !data.find(element => element.id === 'reset')) {
      //   data.unshift({id:'reset', name:'Искать все категории'});
      // }
      
      if(!!data) {
        updateList(data.map((element, index)=> 
        <option 
          key={'selectListKey: ' + index} 
          value={!!element?.id ? element.id : Object.values(element)} 
          // disabled={Object.values(element)[0] === 'users'} 
        >
          { !!element?.id ? element.name : Object.values(element) }
        </option>))
      }

    }

    if(props.data !== null) getTablesList();
  }, [props.data])

  return(
    <select name={props.name} onChange={handleList} value={selectValue}>
      {tablesList}
    </select>
  )
}