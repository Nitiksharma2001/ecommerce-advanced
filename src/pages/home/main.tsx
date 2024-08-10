import { useContext, useState } from 'react'
import Navbar from '../../components/navbar/navbar'
import RightSidebar from '../../components/sidebar/right_sidebar'
import MainContent from './main_content'
import { ProductType } from '../../types/products'
import { UserContext, UserContextType } from '../../hooks/context'

export default function Home() {
  const [isRightSidebarOpen, setIsSidebarOpen] = useState(false)
  const { addToCart } = useContext(UserContext) as UserContextType

  const changeRightSidebarOpen = () => {
    setIsSidebarOpen(!isRightSidebarOpen)
  }

  const onProductDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.dataTransfer.getData('product_card')) {
      addToCart(
        JSON.parse(e.dataTransfer.getData('product_card')) as ProductType
      )
    }
  }
  return (
    <>
      <div className='navbar bg-base-100'>
        <Navbar changeRightSidebarOpen={changeRightSidebarOpen} />
      </div>
      <MainContent />
      <div
        className={`${
          isRightSidebarOpen ? 'block' : 'invisible'
        } bg-base-200 h-52 fixed bottom-0 z-10 w-screen flex`}
        onDrop={onProductDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <RightSidebar />
      </div>
    </>
  )
}
