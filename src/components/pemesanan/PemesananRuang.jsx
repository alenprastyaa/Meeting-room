import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InformasiRapat from './InformasiRapat';

const PemesananRuang = () => {
    const navigate = useNavigate();
    const [units, setUnits] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [PilihUnit, setPilihUnit] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');
    const [error, setError] = useState(false);
    const [capacity, setCapacity] = useState('0');

    const getUnits = async () => {
        try {
            const res = await axios.get("https://6666c7aea2f8516ff7a4e261.mockapi.io/api/dummy-data/masterOffice");
            setUnits(res.data);
            setError(false);
        } catch (error) {
            console.error("Error fetching units:", error);
            setError(true);
        }
    };

    const getRooms = async () => {
        try {
            const res = await axios.get("https://6666c7aea2f8516ff7a4e261.mockapi.io/api/dummy-data/masterMeetingRooms");
            setRooms(res.data);
        } catch (error) {
            console.error("Error fetching rooms:", error);
        }
    };

    useEffect(() => {
        getUnits();
        getRooms();
    }, []);

    const handleUnitChange = (e) => {
        setPilihUnit(e.target.value);
        setSelectedRoom('');
        setCapacity('0');
    };

    const handleRoomChange = (e) => {
        const selectedRoomId = e.target.value;
        setSelectedRoom(selectedRoomId);
        const room = rooms.find(room => room.id === selectedRoomId);
        setCapacity(room ? room.capacity : '0');
    };

    const filteredRooms = rooms.filter(room => room.officeId === PilihUnit);

    return (
        <div className="container bg-slate-100 shadow-lg ml-5">
            <div className="flex">
                <div className="mt-10 relative">
                    <button
                        className="material-symbols-outlined bg-custom-blue p-4 text-white rounded-lg"
                        onClick={() => navigate(-1)} // Navigate back
                    >
                        chevron_left
                    </button>
                </div>
                <div className="mt-10 ml-4">
                    <h1 className="text-[1.7rem] font-semibold">Ruang Meeting</h1>
                    <div className="flex">
                        <p className="items-center">Ruang Meeting</p>
                        <span className="material-symbols-outlined">
                            chevron_right
                        </span>
                        <button
                            className="text-custom-blue"
                            onClick={() => navigate('/')} // Navigate to home
                        >
                            Pesan Ruangan
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-14 mb-4">
                <p className="font-semibold text-lg">Informasi Ruang Meeting</p>
            </div>
            <div className="flex">
                <div>
                    <label className="font-semibold" htmlFor="unit">Unit</label>
                    <div className="mt-3">
                        <select
                            id="unit"
                            className="select w-72 max-w-xs border border-gray-300 py-2.5 rounded-lg duration-300"
                            onChange={handleUnitChange}
                            value={PilihUnit}
                        >
                            <option value="">Pilih Unit</option>
                            {units.map(unit => (
                                <option key={unit.id} value={unit.id}>{unit.officeName}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="ml-10">
                    <label className="font-semibold" htmlFor="ruang-meeting">Ruang Meeting</label>
                    <div className="mt-3">
                        <select
                            id="ruang-meeting"
                            className="select w-72 max-w-xs border border-gray-300 py-2.5 rounded-lg transition-all"
                            onChange={handleRoomChange}
                            value={selectedRoom}
                        >
                            <option value="">Pilih Ruang Meeting</option>
                            {error ? (
                                <option className="text-red-600 font-semibold">Sedang Dalam Gangguan</option>
                            ) : (
                                filteredRooms.map(room => (
                                    <option key={room.id} value={room.id}>{room.roomName}</option>
                                ))
                            )}
                        </select>
                    </div>
                </div>
            </div>
            <div className="mt-12 mb-12">
                <label className="font-semibold" htmlFor="kapasitas">Kapasitas</label>
                <div className="mt-3">
                    <input
                        id="kapasitas"
                        className="select w-72 max-w-xs border border-gray-300 py-2 rounded-lg transition-all duration-300 px-4 bg-slate-200"
                        type="text"
                        value={capacity}
                        readOnly
                    />
                </div>
            </div>
            <hr className="bg-slate-300 w-full h-0.5" />
            <InformasiRapat capacity={capacity} />
            <footer className='mb-32' />
        </div>
    );
};

export default PemesananRuang;
