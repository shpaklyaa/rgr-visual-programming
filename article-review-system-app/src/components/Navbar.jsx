import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/author">Личный кабинет автора</Link>
                </li>
                <li>
                    <Link to="/reviewer">Личный кабинет рецензента</Link>
                </li>
                <li>
                    <Link to="/admin">Личный кабинет администратора</Link>
                </li>
                <li>
                    <Link to="/login">Вход</Link>
                </li>
                <li>
                    <Link to="/register">Регистрация</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;