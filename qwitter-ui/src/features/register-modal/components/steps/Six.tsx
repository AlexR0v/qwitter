import { Alert, Input }               from 'antd'
import { Controller, useFormContext } from 'react-hook-form'
import { cn }                         from '../../../../utils/mergeStyles.ts'
import { IRegister }                  from '../../types'

export const Six = () => {
  
  const { control, formState } = useFormContext<IRegister>()
  
  return (
    <>
      <Controller
        name={'password'}
        control={control}
        render={({ field, formState }) => (
          <Input
            {...field}
            status={formState.errors?.password ? 'error' : ''}
            placeholder='Пароль'
          />
        )}
      />
      <Alert
        className={cn(
          formState.errors?.password ? 'block' : 'hidden',
        )}
        type='error'
        message={
          <ul>
            <li className={cn(formState.errors?.password?.message ? 'list-item' : 'hidden')}>{formState.errors?.password?.message}</li>
          </ul>
        }
      />
    </>
  )
}