import React, { useEffect, useState } from 'react';
import Image from './phonk_wallpaper.jpg';
import { Link } from "react-router-dom";

function Header() {

    const [username, setUsername] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            const token = localStorage.getItem("access");

            if (!token) {
                setUsername(<Link to="/login">Войти</Link>);
                return;
            }

            try {
                const response = await fetch("http://localhost:8000/api/user/", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsername(data.username);
                } else {
                    setUsername(<Link to="/login">Войти</Link>);
                }
            } catch (error) {
                console.error("Ошибка получения пользователя:", error);
                setUsername(<Link to="/login">Войти</Link>);
            }
        }

        fetchUser();
    }, []);

    return (
        <header>
            <p id="sait_name">
                <Link to="/">DSPARK STORE</Link>
            </p>

            <Link to="/profile" id="profile_link">
                <div id="profile">
                    <p id="profile_name">
                        {username ? username : "Войти"}
                    </p>
                    <img src={Image} alt="Аватар" id="profile_image" />
                </div>
            </Link>
        </header>
    );
}

export default Header;
