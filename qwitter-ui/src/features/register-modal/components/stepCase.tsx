import First      from './steps/First.tsx'
import { Five }   from './steps/Five.tsx'
import { Forth }  from './steps/Forth.tsx'
import { Second } from './steps/Second.tsx'
import { Six }    from './steps/Six.tsx'

export const stepCase = (step: number) => {
  switch (step) {
    case 1:
      return <First />
    case 2:
      return <Second />
    case 3:
      return <First isAccept />
    case 4:
      return <Forth />
    case 5:
      return <Five />
    case 6:
      return <Six />
    default:
      return <></>
  }
}
