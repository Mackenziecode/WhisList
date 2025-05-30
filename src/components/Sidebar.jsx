import { Link } from "react-router-dom"
import { useState } from "react"
import { FaHome, FaPhone, FaInfoCircle, FaPlus, FaStar } from "react-icons/fa"
import { HiMenu, HiX } from "react-icons/hi"

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    
    const isMobile = window.innerWidth < 768;

    return (
        <>
            <button className={`md:hidden fixed top-4 ${isOpen ? 'left-[250px]' : 'left-4'} z-50 bg-emerald-600 text-white p-2 rounded-lg shadow`} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>

            <div className={`fixed top-0 left-0 w-[250px] h-screen bg-black pt-5 text-white shadow z-40 ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'} transition-transform duration-300`}>

                <div className="p-4 mb-6">
                    <h1 className="text-2xl font-bold text-center">
                        Lista de deseos
                    </h1>
                    <div className="w-16 h-1 bg-white mx-auto mt-2 rounded opacity-70"></div>
                </div>
                
                <ul className="list-none px-3">
                    <li className="mb-2">
                        <Link to="/" className="flex items-center px-4 py-3 hover:bg-white hover:bg-opacity-20 rounded" onClick={() => isMobile && setIsOpen(false)}>
                            <FaHome className="mr-3 text-xl" />
                            <span>Home</span>
                        </Link>
                    </li>
                    
                    <div className="my-4 border-t border-white border-opacity-20 mx-4"></div>

                    <li className="px-4 mt-4">
                        <Link to="/create-wishlist" className="flex items-center justify-center bg-white text-emerald-800 font-bold p-3 rounded shadow hover:bg-opacity-90" onClick={() => isMobile && setIsOpen(false)}>
                            <FaPlus className="mr-2 text-xl" />
                            <span>Crea una listat</span>
                        </Link>
                    </li>
                </ul>
            </div>
            {isMobile && isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </>
    )
}