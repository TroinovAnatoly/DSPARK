import React from 'react';
import '../styles/forms.css';
import { useForm } from 'react-hook-form';
import {Link} from 'react-router-dom';

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    async function SumbitForm(data) {
        const data_of_person = {
            username: data.login_name,
            password: data.password
        };

        console.log("Отправляем:", data_of_person);

        try {
            const response = await fetch("http://localhost:8000/api/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data_of_person)
            });

            const result = await response.json();
            console.log("Ответ Django:", result);

            if (response.ok) {
                localStorage.setItem("access", result.access);
                localStorage.setItem("refresh", result.refresh);

                alert("Вы успешно вошли!");
            } else {
                alert("Ошибка: Неверный логин или пароль");
            }
        } catch (error) {
            console.error("Ошибка запроса:", error);
            alert("Сервер недоступен");
        }
    }

    return (
        <div id="content_login">
            <form onSubmit={handleSubmit(SumbitForm)}>
                <p id="form_name">Авторизация</p>
                <input
                    id="form_input_place"
                    type="text"
                    placeholder="Логин"
                    {...register('login_name', { required: true })}
                />
                {errors.login_name && <p>Введите логин.</p>}

                <input
                    id="form_input_place"
                    type="password"
                    placeholder="Пароль"
                    {...register('password', { required: true })}
                />
                {errors.password && <p>Пароль обязателен.</p>}

                <input type="submit" value="Войти" id="accept_form_button"/>

                <p id="change_form_button"><Link to="/register">Зарегистрироваться</Link></p>
            </form>
        </div>
    );
}

export default LoginPage;
