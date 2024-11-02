import React, { useEffect, useState } from 'react';
import api from '../services/api';


const ProductsList = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await api.get('/produtos');
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  return (
    <div className="container bg-red mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Produtos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {produtos.map((produto) => (
          <div key={produto.id} className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-semibold">{produto.nome}</h2>
            <p>{produto.descricao}</p>
            <p className="font-bold">R$ {produto.valor.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
