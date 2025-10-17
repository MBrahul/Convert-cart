import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import { ScanSearch, RotateCcw } from 'lucide-react'
import ProductCard from './components/ProductCard';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import { ToastContainer, toast } from 'react-toastify';



function App() {

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rules, setRules] = useState("");

  const getAllProducts = async () => {
    try {
      const data = await fetch(`${BASE_URL}/products/`, {
        method: "GET",
      });
      const res = await data.json();
      //  console.log(res);
      if (res.status) setProducts(res.data);
      else {
        toast.error(res.error);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error)
    }
  }


  const getFilteredProducts = async () => {
    try {
      setProducts([]);
      setIsLoading(true);
      const data = await fetch("http://localhost:5500/products/segments/evaluate", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rules })
      })
      const res = await data.json();
      if (res.status) setProducts(res.data);
      else toast.error(res.error);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Navbar />

      <div className='flex flex-col justify-center items-center p-5 gap-2 w-[60%] mx-[20%] border mt-4 p-5 rounded shadow'>
        <h1 className='text-center font-semibold text-2xl font-light'>Define Filter Conditions</h1>
        <label className='self-start text-zinc-600' htmlFor="">Enter filter rules (one per line):</label>
        <textarea className='w-full' name="" id="" rows={10} cols={50} placeholder={''} value={rules} onChange={(e) => {
          setRules(e.target.value);
        }}></textarea>
        <p className='self-start mb-4 text-zinc-400'>{"Examples: price > 2000 , category = Smartphones, stock_status = instock"}</p>
        <div className='flex w-full gap-2'>
          <button className='w-[80%] bg-black text-white p-2 rounded' onClick={getFilteredProducts}><div className='flex justify-center gap-2'><p><ScanSearch /> </p><p className='font-semibold'>Evaluate Filter</p></div></button>
          <button className='w-[20%] p-2 rounded border' onClick={() => {
            setRules("");
            getAllProducts();
          }}><div className='flex justify-center gap-2'><p><RotateCcw /> </p><p className='font-semibold'>Reset</p></div></button>
        </div>

        <div className='border p-3 text-zinc-500 rounded text-sm mt-3'>
          <pre>{'! Supported operators : =    !=    >    <    >=    <='}</pre>
        </div>

      </div>

      <div className='p-5 flex gap-5 justify-center flex-wrap align-center'>

        {isLoading && <Loader />}

        {products.length === 0 && !isLoading && (<p className='p-5 mt-5 text-2xl text-zinc-400'>No Products Found !</p>)}

        {
          products.map((product, i) => {
            return (<ProductCard key={i} product={product} />)
          })
        }
      </div>
      <ToastContainer />
    </>
  )

}

export default App
