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
        <div className="flex flex-col min-h-screen">
            {/* Conteúdo principal */}
            <main className="flex-grow">
                <div className="container mx-auto p-4">
                    {/* Botão de Login */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleLoginClick}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                        >
                            Login
                        </button>
                    </div>

                    {/* Lista de Produtos */}
                    <h1 className="text-2xl font-bold mb-4 text-center">Produtos em Destaque</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {produtos.map((produto) => (
                            <div key={produto.id} className="bg-white p-4 shadow rounded">
                                <h2 className="text-xl font-semibold">{produto.nome}</h2>
                                <p className="text-gray-600">{produto.descricao}</p>
                                <p className="font-bold text-blue-500">R$ {produto.valor.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Rodapé */}
            <footer className="bg-gray-800 text-white p-4 text-center">
                <p>&copy; {new Date().getFullYear()} Sua Empresa. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default Home;
