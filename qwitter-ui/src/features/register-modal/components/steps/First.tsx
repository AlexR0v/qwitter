import { Alert, DatePicker, Input }   from 'antd'
import locale                         from 'antd/es/date-picker/locale/ru_RU'
import { Dayjs }                      from 'dayjs'
import { Controller, useFormContext } from 'react-hook-form'
import { AiOutlineCheckCircle }       from 'react-icons/ai'
import { cn }                         from '../../../../utils/mergeStyles.ts'
import { IRegister }                  from '../../types'

interface Props {
  isAccept?: boolean
}

const First = ({ isAccept }: Props) => {
  
  const { control, formState } = useFormContext<IRegister>()
  
  return (
    <>
      <Controller
        name={'firstName'}
        control={control}
        render={({ field, formState }) => (
          <Input
            {...field}
            status={formState.errors?.firstName ? 'error' : ''}
            placeholder='Имя'
            prefix={isAccept && <AiOutlineCheckCircle color='#52c41a' />}
            disabled={isAccept}
          />
        )}
      />
      <Controller
        name={'lastName'}
        control={control}
        render={({ field, formState }) => (
          <Input
            {...field}
            status={formState.errors?.lastName ? 'error' : ''}
            placeholder='Фамилия'
            prefix={isAccept && <AiOutlineCheckCircle color='#52c41a' />}
            disabled={isAccept}
          />
        )}
      />
      <Controller
        name={'email'}
        control={control}
        render={({ field, formState }) => (
          <Input
            {...field}
            status={formState.errors?.email ? 'error' : ''}
            type='email'
            placeholder='E-mail'
            prefix={isAccept && <AiOutlineCheckCircle color='#52c41a' />}
            disabled={isAccept}
          />
        )}
      />
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Дата рождения</p>
        <p className='text-xs text-gray-400'>
          Эта информация не будет общедоступной. Подтвердите свой возраст, даже если эта учетная запись
          предназначена для компании, домашнего животного и т. д.
        </p>
        <Controller
          name={'dateOfBirth'}
          control={control}
          render={({ field, formState }) => (
            <DatePicker
              value={field.value as unknown as Dayjs}
              locale={locale}
              format={'DD.MM.YYYY'}
              onChange={field.onChange}
              status={formState.errors?.dateOfBirth ? 'error' : ''}
              placeholder='Дата рождения'
              disabled={isAccept}
            />
          )}
        />
      </div>
      <Alert
        className={cn(
          formState.errors?.lastName || formState.errors?.firstName || formState.errors?.email || formState.errors?.dateOfBirth ? 'block' : 'hidden',
        )}
        type='error'
        message={
          <ul>
            <li className={cn(formState.errors?.firstName?.message ? 'list-item' : 'hidden')}>{formState.errors?.firstName?.message}</li>
            <li className={cn(formState.errors?.lastName?.message ? 'list-item' : 'hidden')}>{formState.errors?.lastName?.message}</li>
            <li className={cn(formState.errors?.email?.message ? 'list-item' : 'hidden')}>{formState.errors?.email?.message}</li>
            <li className={cn(formState.errors?.dateOfBirth?.message ? 'list-item' : 'hidden')}>{formState.errors?.dateOfBirth?.message}</li>
          </ul>
        }
      />
    </>
  )
}

export default First