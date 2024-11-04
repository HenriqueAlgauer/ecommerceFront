import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Home = () => {
    const [produtos, setProdutos] = useState([]);
    // const navigate = useNavigate();

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await api.get('/produtos');
                // Seleciona os primeiros 6 produtos
                setProdutos(response.data.slice(0, 6));
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };

        fetchProdutos();
    }, []);

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div className="flex flex-col bg-white min-h-screen items-center">
            {/* Conteúdo principal */}
            {/* Botão de Login */}
            <header className='w-full bg-gray-200 flex justify-center py-4'>
                <div className="flex justify-between items-center w-9/12">
                    <div>
                        <img className='w-24' src='../public/img/logo.png' />
                    </div>
                    <div className='bg-zinc-400 w-7/12 gap-4 px-8 py-3 rounded-full shadow-lg flex justify-between items-center'>
                        <p className='font-semibold text-white'>O que você está procurando ?</p>
                        <img className='h-7' src="../public/icon/lupa.png" alt="" />
                    </div>
                    <div className='flex items-center'>
                        <button
                            onClick={handleLoginClick}
                            className="bg-gray-100 text-gray-950 px-6 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-300 transition-colors"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </header>
            <main className='w-9/12 my-8'>
                <div className='w-full bg-zinc-300 rounded'>
                    <img className='' src="../public/img/baner.png" alt="" />
                </div>
                <div className='flex my-6 gap-4'>
                    <div className='flex items-center justify-center rounded w-4/12 h-24 border shadow cursor-pointer'><img className="w-28" src="../public/img/adidas.svg" alt="" /></div>
                    <div className='flex items-center justify-center rounded w-4/12 h-24 border shadow cursor-pointer'><img className="w-28" src="../public/img/nike.svg" alt="" /></div>
                    <div className='flex items-center justify-center rounded w-4/12 h-24 border shadow cursor-pointer'><img className="w-28" src="../public/img/air-jordan.svg" alt="" /></div>
                    <div className='flex items-center justify-center rounded w-4/12 h-24 border shadow cursor-pointer'><img className="w-28" src="../public/img/mizuno.svg" alt="" /></div>
                </div>
                <div className='my-8'>
                    <hr />
                    <h1 className="text-3xl font-semibold mt-4 uppercase">Produtos em Destaque</h1>
                </div>
                <div className='flex justify-center gap-8'>
                    <div className='flex flex-col bg-zinc-100 shadow-lg rounded w-3/12 px-8 py-4'>
                        <p className='text-2xl'>Filtros</p>
                        <hr />
                        <div className='grid grid-cols-4 gap-2 mt-3'>
                            <div className='bg-red-300 w-12 h-12 border'></div>
                            <div className='bg-green-300 w-12 h-12 border'></div>
                            <div className='bg-blue-300 w-12 h-12 border'></div>
                            <div className='bg-gray-300 w-12 h-12 border'></div>
                            <div className='bg-black w-12 h-12 border'></div>
                            <div className='bg-indigo-300 w-12 h-12 border'></div>
                            <div className='bg-pink-300 w-12 h-12 border'></div>
                            <div className='bg-sky-300 w-12 h-12 border'></div>
                        </div>
                    </div>
                    {/* Lista de Produtos */}
                    <div className="w-9/12 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {produtos.map((produto) => (
                            <div key={produto.id} className="bg-gray-100 p-4 shadow rounded flex flex-col items-center gap-4 cursor-pointer">
                                <div className='flex flex-col '>
                                    <img src='../public/img/camisa.png' className='w-52 mb-8' alt="" />
                                    <h2 className="text-lg font-semibold ">{produto.nome}</h2>
                                    <p className="text-xl font-semibold">R$ {produto.valor.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Rodapé */}
            <footer className="bg-gray-300 text-white p-4 text-center w-full">
                <p className='text-black'>&copy; {new Date().getFullYear()} HA's. Todos os direitos reservados.</p>
            </footer>
        </div >
    );
};

export default Home;
