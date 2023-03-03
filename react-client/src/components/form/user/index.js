import SelectList from "../../selectList";

export default function User(props) {
  return(
    <>
      <span className={props?.styles?.form__row__title}>Логин</span>
      <input 
        className={props?.styles?.form__input} 
        name="login" 
        type="text" 
        minLength="1" 
        maxLength="128" 
        required 
        defaultValue={props?.element?.login}
      />
      <span className={props?.styles?.form__row__title}>Пароль</span>
      <input 
        className={props?.styles?.form__input} 
        name="password"  
        type="text" 
        required 
        defaultValue={props?.element?.password}
      />
      <span className={props?.styles?.form__row__title}>Роль</span>
      <SelectList 
        data={props.roles}
        selectedElement={props?.element?.roles_id}
        name={'roles_id'}
      />
    </>
  )
}