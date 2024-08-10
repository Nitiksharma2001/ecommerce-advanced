import Navbar from "../../components/navbar/navbar";
import ProductCard from "../../components/ui/card/product_card";

export default function Home() {
  return (
    <>
      <div className="navbar bg-base-100">
        <Navbar />
      </div>
      <div>
        {
          [1, 2, 3].map(item => <div className="card bg-base-100 w-96 shadow-xl"><ProductCard /> </div>)
        }
      </div>

    </>
  )
}