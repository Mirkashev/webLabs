import Category from "./category"
import Request from "./request"

export default function Form(props) {
  console.log(props)
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
        <Category styles={props.styles} element={props.element}/> : 
        <Request styles={props.styles} element={props.element} categories={props?.categories}/>}
      <input className={props?.styles?.form__send} type="submit" value={'Сохранить'}/>
      {props.isList ? 
        <button className={props?.styles?.form__send} onClick={props?.remove}>Удалить</button> : 
        <></>}
    </form>
  )
}