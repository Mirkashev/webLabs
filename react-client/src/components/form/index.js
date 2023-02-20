import SelectList from "../selectList"

export function RequestsForm(props){
  // console.log(props)
  return(
  <form 
    id={'form_' + props?.element?.id} 
    action="" 
    method="post" 
    className={props?.styles?.form} 
    onSubmit={props?.submit} 
    onClick={(e)=> e.stopPropagation()}
    >
    <span className={props?.styles?.form__row__title}>Имя</span>
    <input 
      className={props?.styles?.form__input} 
      id="name" 
      name="name" 
      type="text" 
      minLength="1" 
      maxLength="128" 
      required 
      defaultValue={props?.element?.name}
    />
    <span className={props?.styles?.form__row__title}>Телефон</span>
    <input 
      className={props?.styles?.form__input} 
      id="phone" 
      name="phone"  
      type="tel" 
      pattern="(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}" 
      required 
      defaultValue={props?.element?.phone}
    />
    <span className={props?.styles?.form__row__title}>Описание заявки</span>
    {/* create auto updating size of textarea */}
    <textarea 
      className={props?.styles?.form__input} 
      id="description" 
      name="description" 
      minLength='1' 
      maxLength="256" 
      defaultValue={props?.element?.description}>
    </textarea>
    <SelectList 
      name={'categories_id'}
      apiUrl={'categories'} 
      selectedElement={props?.element?.categories_id}
    />
    <input className={props?.styles?.form__send} type="submit" value={'Сохранить'}/>
    {props.isList ? <button className={props?.styles?.form__send} onClick={props?.remove}>Удалить</button> : <></>}
  </form>
  )
}

export function CategoriesForm(props) {
  return(
  <form 
    id={'form_' + props?.element?.id} 
    action="" 
    method="post" 
    className={props?.styles?.form} 
    onSubmit={props?.submit} 
    onClick={(e)=> e.stopPropagation()}
  >
    <span className={props?.styles?.form__row__title}>Название категории</span>
    <input 
      className={props?.styles?.form__input} 
      id="name" 
      name="name" 
      type="text" 
      minLength="1" 
      maxLength="128" 
      required 
      defaultValue={props?.element?.name}
    />
    <input className={props?.styles?.form__send} type="submit" value={'Сохранить'}/>
    {props.isList ? <button className={props?.styles?.form__send} onClick={props?.remove}>Удалить</button> : <></>}
  </form>
  )
}

export function UsersForm(props) {
  
}