import { cn }          from '../../../utils/mergeStyles.ts'
import { displayIcon } from './displayIcon.tsx'

interface Props {
  step: number
  changeStep: () => void
}

const Steps = ({ step, changeStep }: Props) => {
  return (
    <div className='flex items-center gap-2'>
      <div
        onClick={changeStep}
        className={cn(
          (step === 4 || step === 6) && 'hidden',
          'cursor-pointer p-2 flex justify-center items-center rounded-full hover:bg-gray-200',
        )}
      >
        {displayIcon(step)}
      </div>
      <div className={cn((step === 4 || step >= 6) ? 'block w-[41px] h-[41px]' : 'hidden')} />
      <span className='text-xl'>Шаг {step} из 6</span>
    </div>
  )
}

export default Steps