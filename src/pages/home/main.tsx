import Navbar from '../../components/navbar/navbar'
import MainContent from './main_content'

export default function Home() {
  return (
    <>
      <div className='navbar bg-base-100'>
        <Navbar />
      </div>
      <MainContent />
    </>
  )
}
