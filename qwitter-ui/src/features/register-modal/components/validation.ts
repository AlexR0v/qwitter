import * as Yup           from 'yup'
import { stringToNumber } from '../../../utils/stringToNumber.ts'

export const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(30, 'Поле должно содержать не более 30-ти символов')
    .required('Имя не может быть пустым'),
  lastName: Yup.string()
    .max(30, 'Поле должно содержать не более 30-ти символов')
    .required('Фамилия не может быть пустой'),
  password: Yup.string()
    .max(30, 'Поле должно содержать не более 30-ти символов')
    .required('Пароль не может быть пустым'),
  phone: Yup.string()
    .transform((_, origValue) => {
      return origValue === '+_(___)___-__-__' ? '00000000000' : stringToNumber(
        origValue || '00000000000')
    })
    .min(11, 'Некорректный Телефон. Формат +7(999)999-99-99')
    .required('Телефон не может быть пустым'),
  email: Yup.string()
    .required('Email не может быть пустым')
    .email('Некорректный Email. Формат Email')
    .min(2, 'Длина Логина должна быть менее 2-ч символов')
    .max(50, 'Длина Логина должна быть не более 50-ти символов'),
  dateOfBirth: Yup.string()
    .required('Дата рождения не может быть пустой'),
  isAgree: Yup.boolean().required(),
  code: Yup.string().required(),
})