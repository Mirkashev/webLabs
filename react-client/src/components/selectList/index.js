import { useEffect, useState } from 'react'

export default function SelectList(props) {
  async function handleList(e){
    setSelectValue(e.target.value)

    if(props.isSearchSettings) {
      if(e.target.value === 'reset') {
        props.setSearchingParams('');
      }else {
        props.setSearchingParams(e.target.value)
      }
    }
  }

  const [selectValue, setSelectValue] = useState(props.selectedElement);
  const [tablesList, updateList] = useState([]);

  useEffect(()=> {
    const getTablesList = async function () {
      if(!!props.data) {
        updateList(props.data.map((element, index)=> 
        <option 
          key={'selectListKey: ' + index} 
          value={!!element?.id ? element.id : Object.values(element)} 
        >
          { !!element?.id ? element.name : Object.values(element) }
        </option>))
      }

    }

    if(props.data !== null) getTablesList();
  }, [props.data])

  return(
    <select name={props.name} onChange={handleList} value={selectValue} disabled={localStorage.getItem('role') != 1 ? false: true}>
      {tablesList}
    </select>
  )
}