import React, { useState } from 'react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('author');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Регистрация:', { name, email, password, role });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Имя"
                required
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="author">Автор</option>
                <option value="reviewer">Рецензент</option>
            </select>
            <button type="submit">Зарегистрироваться</button>
        </form>
    );
};

export default Register;