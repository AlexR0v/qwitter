import { yupResolver }                                                                                    from '@hookform/resolvers/yup'
import { Button }                                                                                         from 'antd'
import dayjs                                                                                              from 'dayjs'
import { useState }                                                                                       from 'react'
import { FormProvider, useForm }                                                                          from 'react-hook-form'
import { useAppSelector }                                                                                 from '../../hooks'
import { userSelector }                                                                                   from '../../redux/userSlice.ts'
import Modal                                                                                              from '../../ui/modal/Modal.tsx'
import { stepCase }                                                                                       from './components/stepCase.tsx'
import Steps                                                                                              from './components/Steps.tsx'
import { validationSchema }                                                                               from './components/validation.ts'
import { useCodeMutation, usePasswordMutation, usePhoneMutation, useRegisterMutation, useVerifyMutation } from './service/registerService.ts'
import { IRegister }                                                                                      from './types'

const RegisterModal = () => {
  
  const [step, setStep] = useState(1)
  
  const user = useAppSelector(userSelector)
  
  const [registerService, { isLoading }] = useRegisterMutation()
  const [savePhoneService, { isLoading: isLoadingPhone }] = usePhoneMutation()
  const [sentCodeService, { isLoading: isLoadingCode }] = useCodeMutation()
  const [verifyService, { isLoading: isLoadingVerify }] = useVerifyMutation()
  const [passwordService, { isLoading: isLoadingPassword }] = usePasswordMutation()
  
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
          if(res && step !== 3 && step !== 4 && step !== 5) {
            setStep(prevState => prevState + 1)
          }
        })
    }
    if(step === 3) {
      methods.trigger(['firstName', 'lastName', 'email', 'dateOfBirth'])
        .then((res) => {
          if(res) {
            onSubmit(methods.getValues())
          }
        })
    }
    if(step === 4) {
      methods.trigger(['phone'])
        .then((res) => {
          if(res) {
            onSubmitCode(methods.getValues())
          }
        })
    }
    if(step === 5) {
      methods.trigger(['code'])
        .then((res) => {
          if(res) {
            onSubmitVerify(methods.getValues())
          }
        })
    }
    if(step === 6) {
      methods.trigger(['password'])
        .then((res) => {
          if(res) {
            onSubmitPassword(methods.getValues())
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
      console.log('phone error ', e)
    }
  }
  
  const onSubmitCode = async(data: IRegister) => {
    try {
      await savePhoneService({ username: user?.username ?? '', phone: data.phone }).unwrap()
      await sentCodeService({ username: user?.username ?? '' }).unwrap()
      setStep(prev => prev + 1)
    } catch(e: any) {
      
      console.log('code error ', e)
    }
  }
  
  const onSubmitVerify = async(data: IRegister) => {
    try {
      await verifyService({ username: user?.username ?? '', code: data.code }).unwrap()
      setStep(prev => prev + 1)
    } catch(e: any) {
      
      console.log('verify error ', e)
    }
  }
  
  const onSubmitPassword = async(data: IRegister) => {
    try {
      await passwordService({ username: user?.username ?? '', password: data.password }).unwrap()
      
    } catch(e: any) {
      
      console.log('password error ', e)
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
              loading={isLoading || isLoadingPhone || isLoadingCode || isLoadingVerify || isLoadingPassword}
              disabled={step === 2 && !methods.watch('isAgree')}
              block
              type='primary'
              onClick={nextStep}
            >{step === 3 ? 'Зарегистрироваться' : 'Далее'}</Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  )
}

export default RegisterModal