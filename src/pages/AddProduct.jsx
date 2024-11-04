import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const AddProduct = () => {
    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [descricao, setDescricao] = useState('');
    const [sku, setSku] = useState(''); 
    const [estoque, setEstoque] = useState(''); 
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        
        console.log({
            nome,
            valor: parseFloat(valor),
            descricao,
            sku,
            estoque: parseInt(estoque, 10)
        });

        try {
            
            const response = await api.post('/produtos', { 
                nome, 
                valor: parseFloat(valor), 
                descricao, 
                sku, 
                estoque: parseInt(estoque, 10) 
            });

            console.log('Resposta do backend:', response);

            if (response.status === 201 || response.status === 200) { 
                setSuccess('Produto criado com sucesso! Redirecionando para a página de produtos...');
                setTimeout(() => {
                    navigate('/produtos');
                }, 2000);
            } else {
                setError('Resposta inesperada do servidor.');
            }
        } catch (err) {
            console.error('Erro ao criar produto:', err);
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError('Erro ao criar produto.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {/* Formulário de Adição de Produto */}
            <div className="bg-white p-8 shadow rounded w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Adicionar Produto</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nome</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Digite o nome do produto"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Valor (R$)</label>
                        <input
                            type="number"
                            step="0.01"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Digite o valor do produto"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">SKU</label>
                        <input
                            type="text"
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Digite o SKU do produto"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Estoque</label>
                        <input
                            type="number"
                            value={estoque}
                            onChange={(e) => setEstoque(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Digite a quantidade em estoque"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Descrição</label>
                        <textarea
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Digite a descrição do produto"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Cadastrando...' : 'Cadastrar Produto'}
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Voltar para <Link to="/produtos" className="text-blue-500 hover:underline">Produtos</Link>
                </p>
            </div>
        </div>
    );
};

export default AddProduct;
