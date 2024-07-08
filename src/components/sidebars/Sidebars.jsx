import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'


const Sidebars = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex">
            <div className='ml-[25px] '>
                <div className='mt-5 flex p-4'>
                    <div
                        className={`${isActive('/') ? 'scale-150 bg-custom-blue text-white' : 'text-black'
                            } rounded-lg px-1.5 py-1 transition-all duration-300  cursor-pointer`}
                        onClick={() => navigate('/')}
                    >
                        <span className="material-symbols-outlined text-2xl">home</span>
                    </div>
                </div>
                <div className='mt-3 flex p-4'>
                    <div
                        className={` flex p-4 ${isActive('/pemesanan-ruang') ? 'scale-150 bg-custom-blue text-white' : 'text-black'
                            } rounded-lg px-1.5 py-1 transition-all duration-300  cursor-pointer`}
                        onClick={() => navigate('/pemesanan-ruang')}
                    >
                        <span className="material-symbols-outlined text-2xl">draft</span>
                    </div>
                </div>

            </div>
        </div>
    )
}
// p-2 bg-custom-blue text-white rounded-xl mt-4 
export default Sidebars