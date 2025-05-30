import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"

import { Sidebar } from "./components/Sidebar"
import { Home } from "./pages/Home"
import { WishesList } from "./components/WishesList"
import { WishCardDetails } from "./pages/WishCardDetails"
import { CreateWishlist } from "./pages/CreateWishlist"
import { AddWishes } from "./pages/AddWishes"

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth < 768);
    });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className={`flex-1 p-6 transition-all duration-300 ${isMobile ? 'ml-0' : 'ml-[250px]'}`}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/create-wishlist" element={<CreateWishlist />} />
          <Route path="/wishlist/:id/add-wishes" element={<AddWishes />} />
          <Route path="/wisheslist/:id" element={<WishesList/>} />
          <Route path="/wisheslist/:id/wish/:id" element={<WishCardDetails/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
