import * as React from 'react'

interface Props {
  children: React.ReactNode
}

const Modal: React.FC<Props> = ({ children }) => {
  return (
    <div className='flex items-center justify-center w-full h-full z-1 bg-black bg-light-black'>
      <div className='w-[600px] h-[650px] flex flex-col rounded-3xl bg-bg-color p-8'>
        {children}
      </div>
    </div>
  )
}

export default Modal
