export default function Category(props) {
  return(
    <>
      <span className={props?.styles?.form__row__title}>Название категории</span>
      <input 
        className={props?.styles?.form__input} 
        name="name" 
        type="text" 
        minLength="1" 
        maxLength="128" 
        required 
        defaultValue={props?.element?.name}
      />
    </>
  )
}