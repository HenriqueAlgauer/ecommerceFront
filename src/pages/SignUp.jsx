import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Signup = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [tel, setTel] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await api.post('/usuarios', { nome, email, senha, tel });
            console.log('Resposta do backend:', response); 

            if (response.status === 200 || response.status === 201) {
                setSuccess('Usuário criado com sucesso! Redirecionando para a página de login...');
                console.log('Cadastro bem-sucedido. Redirecionando para login...'); 

                
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                console.log('Resposta inesperada do backend:', response.data); 
                setError('Resposta inesperada do servidor.');
            }
        } catch (err) {
            console.error('Erro ao fazer signup:', err); 
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError('Erro ao criar usuário');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {/* Formulário de Signup */}
            <div className="bg-white p-8 shadow rounded w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Cadastro</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nome</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Digite seu nome"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">E-mail</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Digite seu e-mail"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Telefone</label>
                        <input
                            type="tel"
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Digite seu telefone"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Senha</label>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Digite sua senha"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                    >
                        Cadastrar
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Já tem uma conta? <Link to="/login" className="text-blue-500 hover:underline">Faça Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
