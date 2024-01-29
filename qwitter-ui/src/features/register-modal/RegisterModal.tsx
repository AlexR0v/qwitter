import { yupResolver }           from '@hookform/resolvers/yup'
import { Button }                from 'antd'
import dayjs                     from 'dayjs'
import { useState }              from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Modal                     from '../../ui/modal/Modal.tsx'
import { stepCase }              from './components/stepCase.tsx'
import Steps                     from './components/Steps.tsx'
import { validationSchema }      from './components/validation.ts'
import { useRegisterMutation }   from './service/registerService.ts'
import { IRegister }             from './types'

const RegisterModal = () => {
  
  const [step, setStep] = useState(1)
  
  const [registerService, { isLoading }] = useRegisterMutation()
  
  const methods = useForm<IRegister>({
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange',
  })
  
  const changeStep = () => {
    if(step > 1) {
      setStep(step - 1)
    } else {
      setStep(6)
    }
  }
  
  const nextStep = () => {
    if(step < 6) {
      methods.trigger(['firstName', 'lastName', 'email', 'dateOfBirth'])
        .then((res) => {
          if(res) {
            onSubmit(methods.getValues())
          }
        })
    }
  }
  
  const onSubmit = async(data: IRegister) => {
    try {
      data.dateOfBirth = dayjs(data.dateOfBirth).format('YYYY-MM-DD')
      await registerService(data).unwrap()
      setStep(prev => prev + 1)
    } catch(e: any) {
      if(e.originalStatus === 409) {
        methods.setError('email', {
          type: 'custom',
          message: 'Пользователь с таким Email уже существует',
        })
      }
      console.log('register error ', e)
    }
  }
  
  return (
    <Modal>
      <Steps
        step={step}
        changeStep={changeStep}
      />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className='flex flex-1 flex-col px-24'
        >
          <div className='flex flex-1 flex-col my-4 gap-10 justify-center'>
            {stepCase(step)}
          </div>
          <div className='flex gap-2'>
            <Button
              loading={isLoading}
              block
              type='primary'
              onClick={nextStep}
            >{step === 6 ? 'Зарегистрироваться' : 'Далее'}</Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  )
}

export default RegisterModal