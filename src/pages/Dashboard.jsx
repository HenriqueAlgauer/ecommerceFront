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
            <div className="flex flex-col gap-4">
                <button
                    onClick={handleProdutos}
                    className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors"
                >
                    Produtos
                </button>
                <button
                    onClick={handleVendas}
                    className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition-colors"
                >
                    Vendas
                </button>
                <button
                    onClick={handleFinanceiro}
                    className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition-colors"
                >
                    Financeiro
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
