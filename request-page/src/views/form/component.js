import { Form, Input, Button, Container, TextArea } from 'semantic-ui-react';
import styles from './index.module.css';

export default function FormComponent({categories, send}) {
  return(
  <Container className={styles.container}>
    <Form className={styles.form} onSubmit={send} action=''>
      <Form.Field 
        label='Введите своё имя'
        control={Input}
        type='text'
        name='name'
        required
        >
      </Form.Field>
      <Form.Field 
        label='Введите свой номер телефона'
        control={Input}
        type='tel'
        name='phone'
        required
        >
      </Form.Field>
      <Form.Field 
        label='Введите описание'
        control={TextArea}
        type='text'
        name='description'
        required
        >
      </Form.Field>
      <Form.Field 
        label='Выберите категорию'
        type='text'
        name='categories_id'
        control='select'
        >
          {categories}
      </Form.Field>
      <Form.Field>
        <Button>Отправить</Button>
      </Form.Field>
    </Form>
  </Container>
  )
}