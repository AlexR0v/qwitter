import { Alert, Input }               from 'antd'
import { Controller, useFormContext } from 'react-hook-form'
import InputMask                      from 'react-input-mask'
import { cn }                         from '../../../../utils/mergeStyles.ts'
import { IRegister }                  from '../../types'

export const Forth = () => {
  
  const { control, formState } = useFormContext<IRegister>()
  
  return (
    <>
      <Controller
        name={'phone'}
        control={control}
        render={({ field, formState }) => (
          <InputMask
            mask='+9(999)999-99-99'
            {...field}
          >
            {/* @ts-ignore */}
            {(inputProps: any) => (
              <Input
                {...inputProps}
                status={formState.errors?.phone ? 'error' : ''}
              />
            )}
          </InputMask>
        )}
      />
      <Alert
        className={cn(
          formState.errors?.phone ? 'block' : 'hidden',
        )}
        type='error'
        message={
          <ul>
            <li className={cn(formState.errors?.phone?.message ? 'list-item' : 'hidden')}>{formState.errors?.phone?.message}</li>
          </ul>
        }
      />
    </>
  )
}