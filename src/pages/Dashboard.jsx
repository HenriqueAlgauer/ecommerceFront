import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleProdutos = () => {
        navigate('/produtos');
    };

    const handleVendas = () => {
        navigate('/vendas');
    };

    const handleFinanceiro = () => {
        navigate('/financeiro');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
            <div className='w-9/12 flex justify-center gap-8'>

                <button
                    onClick={handleProdutos}
                    className="bg-zinc-200 w-6/12 py-8 text-xl border shadow text-black px-6  rounded hover:bg-zinc-400 transition-colors uppercase"
                >
                    Produtos
                </button>
                <button
                    onClick={handleVendas}
                    className="bg-zinc-200 w-6/12 py-8 text-xl border text-black px-6  rounded hover:bg-zinc-400 transition-colors uppercase"
                >
                    Vendas
                </button>
                <button
                    onClick={handleFinanceiro}
                    className="bg-zinc-200 text-black w-6/12 py-8 text-xl border px-6 rounded hover:bg-zinc-400 transition-colors uppercase"
                >
                    Financeiro
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
