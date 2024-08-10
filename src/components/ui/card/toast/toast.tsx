import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  isError: boolean
}
export default function Toast({ message, isError }: ToastProps) {
  const [isShowToast, setIsShowToast] = useState(false)

  useEffect(() => {
    if (message) {
      setIsShowToast(true)
      setTimeout(() => {
        setIsShowToast(false)
      }, 2000)
    }
  }, [message])

  return (
    <div className={`${isShowToast ? 'block' : 'invisible'} toast`}>
      <div className={`alert alert-info ${isError ? 'bg-red-400':  ''}`}>
        <span className='font-bold'>{message}</span>
      </div>
    </div>
  )
}
