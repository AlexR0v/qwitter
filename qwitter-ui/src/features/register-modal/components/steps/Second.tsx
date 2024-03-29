import { Checkbox }                   from 'antd'
import { Controller, useFormContext } from 'react-hook-form'
import { IRegister }                  from '../../types'

export const Second = () => {
  
  const { control } = useFormContext<IRegister>()
  
  return (
    <>
      <p>Настройте Qwitter, как вам удобно</p>
      <p>Получайте электронные письма с рекомендациями и уведомлениями о ваших действиях в Qwitter.</p>
      <Controller
        name={'isAgree'}
        control={control}
        render={({ field }) => (
          <Checkbox
            {...field}
          />
        )}
      />
      <p>Вы всегда видите в Qwitter рекламные объявления, подобранные с учетом ваших действий в Qwitter. Если этот параметр включен, Qwitter также
         может показывать вам
         персонализированные рекламные объявления от своих рекламодателей и на страницах Qwitter, и на других сайтах, подобранные на основе данных о
         ваших
         действиях в сети и информации от наших партнеров. Регистрируясь, вы принимаете наши Условия, Политику конфиденциальности и Политику
         использования
         файлов cookie. Qwitter может использовать ваши контактные данные, в том числе адрес электронной почты и номер телефона, в целях, описанных в
         нашей
         Политике конфиденциальности.</p>
    </>
  )
}
