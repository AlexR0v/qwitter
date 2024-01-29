import First from './steps/First.tsx'

export const stepCase = (step: number) => {
  switch (step) {
    case 1:
      return <First />
    case 2:
      return <span>Шаг {step}</span>
    case 3:
      return <span>Шаг {step}</span>
    case 4:
      return <span>Шаг {step}</span>
    case 5:
      return <span>Шаг {step}</span>
    case 6:
      return <span>Шаг {step}</span>
    default:
      return <></>
  }
}
