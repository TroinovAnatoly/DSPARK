import React from 'react';
import Image from '../assets/phonk_wallpaper.jpg';
import { Link } from "react-router-dom";
import { useProfile } from "../shared/hooks/useProfile";

function Header() {

    const {
        data: profile,
        isLoading,
        error
    } = useProfile();

    // если нет токена — сразу "Войти"
    const token = localStorage.getItem("access");

    let usernameContent;

    if (!token) {
        usernameContent = <Link to="/login">Войти</Link>;
    } else if (isLoading) {
        usernameContent = "Загрузка...";
    } else if (error) {
        usernameContent = <Link to="/login">Войти</Link>;
    } else {
        usernameContent = profile?.username;
    }

    return (
        <header>
            <p id="sait_name">
                <Link to="/">DSPARK STORE</Link>
            </p>

            <Link to="/profile" id="profile_link">
                <div id="profile">
                    <p id="profile_name">
                        {usernameContent}
                    </p>
                    <img src={Image} alt="Аватар" id="profile_image" />
                </div>
            </Link>
        </header>
    );
}

export default Header;