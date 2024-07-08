import React from 'react'
import { Link } from 'react-router-dom'

const Navbars = () => {
    return (
        <div className='bg-custom-gradient flex'>
            <div className="dashboard max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-[68px] items-center justify-between">
                    <div className='absolute inset-y-0 left-0 flex items-center '>
                        <img className='w-[38px] h-[58px]' src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Logo_PLN.png/1200px-Logo_PLN.png" alt="" />
                        <Link to="/" className='text-white mx-4 text-[16px] '>iMeeting</Link>
                    </div>
                </div>
            </div>
            <div className="ml-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex justify-end mt-4 relative">
                <div>
                    <button className="px-5 py-2 bg-custom-blue text-white rounded-xl flex items-center space-x-1 mt-[-4px]">
                        <div className="material-symbols-outlined">
                            campaign
                        </div>
                        <span>kontak aduan</span>
                    </button>
                </div>
                <span className="material-symbols-outlined mx-5 text-2xl text-white">
                    notifications
                </span>
                <div>
                    <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                        <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    </button>
                </div>
                <div className="nama text-white  mx-4">
                    <p>John doe</p>
                </div>
                <span className="material-symbols-outlined text-white text-2xl mt-[-4px] cursor-pointer">
                    arrow_drop_down
                </span>
            </div>
        </div>
    )
}

export default Navbars