

import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login: loginContext } = useContext(AuthContext); 

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); 

        try {
            const response = await api.post('/login', { email, senha });
            console.log('Resposta do backend:', response.data); 

            if (response.status === 200 || response.status === 201) { 
                loginContext(response.data); 
                navigate('/dashboard'); 
            }
            else {
                console.log('Mensagem de resposta inesperada:', response.data.message); 
                setError('Resposta inesperada do servidor');
            }
        } catch (err) {
            console.error('Erro ao fazer login:', err); 
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError('Erro ao fazer login');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 shadow rounded w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleLogin}>
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
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Entrar
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Não tem uma conta? <Link to="/signup" className="text-blue-500 hover:underline">Cadastre-se</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
