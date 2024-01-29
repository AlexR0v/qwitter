import { IoMdArrowBack } from 'react-icons/io'
import { MdClear }       from 'react-icons/md'

export const displayIcon = (step: number) => {
  switch (step) {
    case 1:
      return <MdClear fontSize={25} />
    case 2:
      return <IoMdArrowBack fontSize={25} />
    case 3:
      return <IoMdArrowBack fontSize={25} />
    case 4:
      return <></>
    case 5:
      return <IoMdArrowBack fontSize={25} />
    case 6:
      return <></>
    default:
      return <></>
  }
}
