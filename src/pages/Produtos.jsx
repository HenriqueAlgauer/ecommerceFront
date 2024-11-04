import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Produtos = () => {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await api.get('/produtos');
                setProdutos(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Erro ao buscar produtos:', err);
                setError('Erro ao carregar produtos.');
                setLoading(false);
            }
        };

        fetchProdutos();
    }, []);

    const handleAddProduct = () => {
        navigate('/add-product');
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.get('/produtos', {
                params: { search: searchTerm },
            });
            setProdutos(response.data.slice(0, 6));
            setLoading(false);
        } catch (err) {
            console.error('Erro ao buscar produtos:', err);
            setError('Erro ao carregar produtos.');
            setLoading(false);
        }
    };

    if (loading) {
        return <p className="text-center mt-8">Carregando produtos...</p>;
    }

    if (error) {
        return <p className="text-center mt-8 text-red-500">{error}</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Produtos</h1>

            <div className="flex justify-end mb-4">
                <button
                    onClick={handleAddProduct}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                    Adicionar Produto
                </button>
            </div>

            {/* Lista de Produtos */}
            {produtos.length === 0 ? (
                <p className="text-center">Nenhum produto encontrado.</p>
            ) : (
                <ul className="space-y-4">
                    {produtos.map((produto) => (
                        <li key={produto.id} className="bg-white shadow rounded p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-semibold">{produto.nome}</h2>
                                    <p className="text-gray-600">Preço: R$ {produto.valor.toFixed(2)}</p>
                                    <p className="text-gray-600">Estoque: {produto.estoque}</p>
                                    <p className="text-gray-600">SKU: {produto.sku}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

};

export default Produtos;
