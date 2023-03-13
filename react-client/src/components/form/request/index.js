import { useContext } from "react";
import { DataContext } from "../../../store";
import SelectList from "../../selectList";

export default function Request(props) {
  const {categories} = useContext(DataContext);
  return(
    <>
      <span className={props?.styles?.form__row__title}>Имя</span>
      <input 
        className={props?.styles?.form__input} 
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
        name="description" 
        minLength='1' 
        maxLength="256" 
        defaultValue={props?.element?.description}
        >
      </textarea>
      <SelectList 
        data={categories}
        selectedElement={props?.element?.categories_id}
        name={'categories_id'}
        key='selectListParamsSelection'
      />
    </>
  )
}