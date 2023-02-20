import { useContext, useEffect, useState } from 'react'
import { PanelStageContext } from '../../store';

export default function SelectList(props) {
  console.log(props)
  async function getTablesList(){
    const data = props.data;
    console.log('render list')

    if(props.isSearchSettings) {
      data.unshift({id:'reset', name:'Искать все категории'});
    }

    updateList(data.map((element, index)=> 
    <option 
      key={'selectListKey: ' + index} 
      value={!!element?.id ? element.id : Object.values(element)} 
      disabled={Object.values(element)[0] === 'users'} 
    >
      { !!element?.id ? element.name : Object.values(element) }
    </option>))

  }

  async function handleList(e){
    setSelectValue(e.target.value)

    if(props.type === 'tables') {
      setStage(e.target.value)

    }
  }

  const [selectValue, setSelectValue] = useState(props.selectedElement);
  const { stage, updateData, setStage, toggleUpdateData } = useContext(PanelStageContext);
  const [tablesList, updateList] = useState([]);


  useEffect(()=> {
    if(props.data !== null) getTablesList();
  }, [props.data])

  return(
    <select name={props.name} onChange={handleList} value={selectValue}>
      {tablesList}
    </select>
  )
}