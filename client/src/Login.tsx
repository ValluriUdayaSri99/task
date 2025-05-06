import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface FormData {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: {
        [key: string]: any;  // Replace with specific user properties if known
    };
}

const Login: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const response = await axios.post<LoginResponse>('http://localhost:3000/login', formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            alert('Login successful!');
            navigate('/home');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                alert(error.response.data.message || 'Login failed');
            } else {
                alert('Login failed');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
