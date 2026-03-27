import React from "react";
import '../styles/forms.css';
import { useForm } from "react-hook-form";
import {Link} from 'react-router-dom';

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    async function SubmitForm(data) {
        if (data.password !== data.confirm_password) {
            alert("Пароли не совпадают");
            return;
        }

        const userData = {
            username: data.login_name,
            password: data.password
        };

        console.log("Отправляем на Django:", userData);

        try {
            const response = await fetch("http://localhost:8000/api/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();
            console.log("Ответ Django:", result);

            if (response.ok) {
                alert("Регистрация успешна!");
            } else {
                alert("Ошибка: " + (result.detail || "Не удалось создать пользователя"));
            }
        } catch (error) {
            console.error("Ошибка запроса:", error);
            alert("Сервер недоступен");
        }
    }

    return (
        <div id="content_login">
            <form onSubmit={handleSubmit(SubmitForm)}>
                <p id="form_name">Регистрация</p>
                <input
                    id="form_input_place"
                    type="text"
                    placeholder="Логин"
                    {...register("login_name", { required: true })}
                />
                {errors.login_name && <p>Введите логин.</p>}

                <input
                    id="form_input_place"
                    type="password"
                    placeholder="Пароль"
                    {...register("password", { required: true })}
                />
                {errors.password && <p>Введите пароль.</p>}

                <input
                    id="form_input_place"
                    type="password"
                    placeholder="Подтвердите пароль"
                    {...register("confirm_password", { required: true })}
                />
                {errors.confirm_password && <p>Подтвердите пароль.</p>}

                <input type="submit" value="Зарегистрироваться" id="accept_form_button" />

                <p id="change_form_button"><Link to="/login">Войти</Link></p>
            </form>
        </div>
    );
}

export default RegisterPage;
