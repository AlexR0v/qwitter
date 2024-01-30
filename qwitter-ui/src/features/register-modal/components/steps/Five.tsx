import { Alert, Input }               from 'antd'
import { Controller, useFormContext } from 'react-hook-form'
import { cn }                         from '../../../../utils/mergeStyles.ts'
import { IRegister }                  from '../../types'

export const Five = () => {
  
  const { control, formState } = useFormContext<IRegister>()
  
  return (
    <>
      <Controller
        name={'code'}
        control={control}
        render={({ field, formState }) => (
          <Input
            {...field}
            status={formState.errors?.code ? 'error' : ''}
            placeholder='Код верификации'
          />
        )}
      />
      <Alert
        className={cn(
          formState.errors?.code ? 'block' : 'hidden',
        )}
        type='error'
        message={
          <ul>
            <li className={cn(formState.errors?.code?.message ? 'list-item' : 'hidden')}>{formState.errors?.code?.message}</li>
          </ul>
        }
      />
    </>
  )
}