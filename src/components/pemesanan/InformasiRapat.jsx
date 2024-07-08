import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { DatePicker } from 'rsuite';

const InformasiRapat = ({ capacity }) => {
    const [tanggalRapat, setTanggalRapat] = useState(null);
    const [waktuMulai, setWaktuMulai] = useState(null);
    const [waktuSelesai, setWaktuSelesai] = useState(null);
    const [jumlahPeserta, setJumlahPeserta] = useState('');
    const [error, setError] = useState('');
    const [konsumsi, setKonsumsi] = useState([]);
    const [selectedKonsumsi, setSelectedKonsumsi] = useState([]);
    const [nominalKonsumsi, setNominalKonsumsi] = useState(0);

    const getKonsumsi = async () => {
        await axios.get("https://6686cb5583c983911b03a7f3.mockapi.io/api/dummy-data/masterJenisKonsumsi")
            .then((res) => {
                console.log(res.data);
                setKonsumsi(res.data);
            });
    };

    useEffect(() => {
        getKonsumsi();
    }, []);

    useEffect(() => {
        const now = new Date();
        const startTime = new Date(waktuMulai);
        const endTime = new Date(waktuSelesai);

        // Check if tanggalRapat is greater than current date
        if (tanggalRapat && tanggalRapat > now) {
            // No further validation needed for waktuMulai
            setError('');
        } else {
            // Check if waktuMulai is less than current time
            if (waktuMulai && startTime < now) {
                setError('Waktu mulai tidak boleh lebih kecil dari tanggal hari ini');
            } else if (waktuMulai && waktuSelesai && startTime >= endTime) {
                setError('Waktu mulai tidak boleh lebih besar atau sama dengan waktu selesai');
            } else if (jumlahPeserta && capacity && parseInt(jumlahPeserta, 10) > parseInt(capacity, 10)) {
                setError('Jumlah peserta melebihi kapasitas');
            } else {
                setError('');
            }
        }

        if (waktuMulai && waktuSelesai && jumlahPeserta) {
            const startHour = startTime.getHours();
            const endHour = endTime.getHours();

            let konsumsiTerpilih = [];
            let totalNominal = 0;

            if (startHour < 11) {
                const snackPagi = konsumsi.find(item => item.name === 'Snack Siang');
                if (snackPagi) {
                    konsumsiTerpilih.push(snackPagi.name);
                    totalNominal += snackPagi.maxPrice;
                }
            }
            if (startHour <= 14 && endHour >= 11) {
                const makanSiang = konsumsi.find(item => item.name === 'Makan Siang');
                if (makanSiang) {
                    konsumsiTerpilih.push(makanSiang.name);
                    totalNominal += makanSiang.maxPrice;
                }
            }
            if (endHour >= 14) {
                const snackSore = konsumsi.find(item => item.name === 'Snack Sore');
                if (snackSore) {
                    konsumsiTerpilih.push(snackSore.name);
                    totalNominal += snackSore.maxPrice;
                }
            }

            setSelectedKonsumsi(konsumsiTerpilih);
            setNominalKonsumsi(totalNominal * parseInt(jumlahPeserta, 10));
        }

    }, [tanggalRapat, waktuMulai, waktuSelesai, jumlahPeserta, capacity, konsumsi]);

    const formatRupiah = (angka) => {
        return angka.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        });
    };

    const isFormValid = () => {
        return tanggalRapat && waktuMulai && waktuSelesai && jumlahPeserta && !error;
    };

    return (
        <div>
            <div className="mt-14 mb-4">
                <p className="font-semibold text-lg">Informasi Rapat</p>
            </div>
            {error && (
                <div className="bg-red-500 text-white p-2 mb-4 rounded-lg">
                    {error}
                </div>
            )}
            <div className="mt-5 mb-12 flex">
                <div>
                    <label className="font-semibold" htmlFor="tanggal-rapat">Tanggal Rapat</label>
                    <div className="">
                        <DatePicker
                            size='lg'
                            format="dd MMMM yyyy"
                            className='mt-3 flex select w-72 max-w-xs border bg-white rounded-lg '
                            placeholder="Masukan Tanggal Rapat"
                            onChange={setTanggalRapat}
                        />
                    </div>
                </div>
                <div>
                    <label className="font-semibold" htmlFor="waktu-mulai">Waktu mulai</label>
                    <div>
                        <DatePicker
                            size='lg'
                            format="HH:mm"
                            className='mt-3 flex select w-72 max-w-xs border bg-white ml-5 rounded-lg'
                            placeholder="Pilih Waktu Mulai"
                            onChange={setWaktuMulai}
                        />
                    </div>
                </div>
                <div>
                    <label className="font-semibold" htmlFor="waktu-selesai">Waktu Selesai</label>
                    <div >
                        <DatePicker
                            size='lg'
                            format="HH:mm"
                            className='mt-3 flex select w-72 max-w-xs border bg-white ml-5 rounded-lg'
                            placeholder="Pilih Waktu Selesai"
                            onChange={setWaktuSelesai}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-12">
                <label className="font-semibold" htmlFor="jumlah-peserta">Jumlah Peserta</label>
                <div className="mt-3">
                    <input
                        id="jumlah-peserta"
                        className="select w-72 max-w-xs border border-gray-300 py-2 rounded-lg transition-all duration-300 px-4 bg-slate-100"
                        type="text"
                        value={jumlahPeserta}
                        onChange={(e) => setJumlahPeserta(e.target.value)}
                    />
                </div>
            </div>
            <div className="mt-10 flex flex-col w-72 max-w-xs">
                <label className="font-semibold" htmlFor="jenis-konsumsi">Jenis Konsumsi</label>
                {selectedKonsumsi.map((konsumsiItem, index) => (
                    <label key={index} className="flex items-center mt-2">
                        <input
                            type="checkbox"
                            name={konsumsiItem}
                            className="mr-2"
                            checked
                            readOnly
                        />
                        {konsumsiItem}
                    </label>
                ))}
            </div>
            <div className="mt-12 ">
                <label className="font-semibold" htmlFor="nominal-konsumsi">Nominal Konsumsi</label>
                <div className="mt-3 flex">
                    <div className='bg-slate-200 relative rounded-l-lg'>
                        <p className='mt-2 px-3'>Rp</p>
                    </div>
                    <input
                        className="select w-72 max-w-xs border border-gray-300 py-2 rounded-r-lg transition-all duration-300 px-4 bg-slate-100"
                        type="text"
                        id="nominal-konsumsi"
                        value={formatRupiah(nominalKonsumsi)}
                        readOnly
                    />
                </div>
            </div>
            <hr className="bg-slate-300 w-full h-0.5 mt-10" />
            <div className='flex mt-12'>
                <div className='ml-auto'>
                    <button className='font-semibold text-red-600'>Batal</button>
                    <button
                        className={`bg-custom-blue px-3 py-2.5 rounded-lg text-white ml-5 font-semibold ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!isFormValid()}
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InformasiRapat;
