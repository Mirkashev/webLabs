import { useContext, useEffect, useState } from "react"
import Api from "../../services/api";

import { PanelStageContext } from "../../store";
import Category from "./category"
import Request from "./request"
import User from "./user";

export default function Form(props) {
  const [roles, setRoles] = useState('');
  const {stage} = useContext(PanelStageContext);

  useEffect(()=>{
    const getRoles = async ()=> {
      try {
        const response = await Api.get({url:'roles', cache:'force-cache'});
        const parsedData = await response.json();
    
        if(response.ok) {
          setRoles(parsedData);
  
        }else {
          alert("При обновлении данных возникла ошибка, повторите позднее");
        }
      } catch (error) {
        alert(error);
      }
    }
    if(stage === 'users') {
      getRoles();
    }
  }, [stage])
  return(
    <form 
      id={'form_' + props?.element?.id} 
      action="" 
      method="post" 
      className={props?.styles?.form} 
      onSubmit={props?.submit} 
      onClick={(e)=> e.stopPropagation()}
    >
      {props.formType === 'categories' ? 
        <Category styles={props.styles} element={props.element}/> : props.formType === 'requests' ?
        <Request styles={props.styles} element={props.element} categories={props?.categories}/> : <User styles={props.styles} element={props.element} roles={roles}/>}
      <input className={props?.styles?.form__send} type="submit" value={'Сохранить'}/>
      {props.isList ? 
        <button className={props?.styles?.form__send} onClick={props?.remove}>Удалить</button> : 
        <></>}
    </form>
  )
}