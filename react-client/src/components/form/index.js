import Category from "./category"
import Request from "./request"
import User from "./user";

export default function Form(props) {

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
        <Request styles={props.styles} element={props.element}/> : 
        <User styles={props.styles} element={props.element}/>}
      <input className={props?.styles?.form__send} type="submit" value={'Сохранить'}/>
      {props.isList ? 
        <button className={props?.styles?.form__send} onClick={props?.remove}>Удалить</button> : 
        <></>}
    </form>
  )
}