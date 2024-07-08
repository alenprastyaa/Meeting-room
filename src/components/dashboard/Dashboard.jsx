import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className='flex container bg-slate-100 ml-5 shadow-lg'>
            <div className='inline-block items-center mt-10'>
                <div>
                    <h1 className='text-[1.7rem] font-semibold'>Ruang Meeting </h1>
                </div>
                <div>
                    <p className='items-center'>Ruang Meeting </p>
                </div>
            </div>
            <div className='ml-auto p-10 flex items-center'>
                <button
                    onClick={() => navigate('/pemesanan-ruang')}
                    className='px-3 py-2 text-white bg-custom-blue rounded-lg flex items-center hover:bg-[#4999af]'
                >
                    <span className="material-symbols-outlined mr-1">add</span>
                    Pesan Ruangan
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
