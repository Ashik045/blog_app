/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext, useState } from 'react';
import { BiMenu, BiX } from 'react-icons/bi';
import { NavLink, useNavigate } from 'react-router-dom';
import { Context } from '../../Context/Context';
import noPhoto from '../../Image/no-photo.png';
import './navbar.css';

const Navbar = () => {
    const [toggler, setToggler] = useState(false);
    const { user, dispatch } = useContext(Context);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
        setToggler(false);
    };

    const handleClick2 = () => {
        navigate('/');
    };

    const logOut = () => {
        // setUser(false);
        setToggler(false);
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    };

    return (
        <div className="navbar">
            <div className="nav_brand">
                <h5 onClick={handleClick2}>JOURNAL</h5>
            </div>

            <div className="nav_menu">
                <a href="#">
                    <NavLink to="/">Home</NavLink>
                </a>
                <a href="#">
                    <NavLink to="/">About</NavLink>
                </a>
                <a href="">
                    <NavLink to="/seetings">User</NavLink>
                </a>
                <a href="#">
                    <NavLink to="/write">Write</NavLink>
                </a>
                {user && (
                    <a href="#">
                        <NavLink to={`users/?user=${user.username}`}>My Posts</NavLink>
                    </a>
                )}
            </div>

            <div className="nav_reg">
                {user ? (
                    <>
                        <img
                            onClick={() => navigate('/seetings')}
                            className="profilePic"
                            src={user.profilepic ? user.profilepic : noPhoto}
                            alt=""
                        />
                        <button type="button" onClick={logOut}>
                            Log out
                        </button>
                    </>
                ) : (
                    <button type="button" onClick={handleClick}>
                        Log in
                    </button>
                )}
            </div>

            <div className="res_navbar">
                {toggler ? (
                    <BiX size={29} onClick={() => setToggler(false)} />
                ) : (
                    <BiMenu size={29} onClick={() => setToggler(true)} />
                )}
                {toggler && (
                    <div className="res_nav_menu">
                        <a onClick={() => setToggler(false)} href="#home">
                            <NavLink to="/">Home</NavLink>
                        </a>
                        <a onClick={() => setToggler(false)} href="">
                            <NavLink to="/">About</NavLink>
                        </a>
                        <a onClick={() => setToggler(false)} href="">
                            <NavLink to="/seetings">User</NavLink>
                        </a>
                        <a onClick={() => setToggler(false)} href="#write">
                            <NavLink to="/write">Write</NavLink>
                        </a>
                        {user && (
                            <a href="#" onClick={() => setToggler(false)}>
                                <NavLink to={`users/?user=${user.username}`}>My Posts</NavLink>
                            </a>
                        )}

                        <div className="res_nav_reg">
                            {user ? (
                                <button type="button" onClick={logOut}>
                                    Log out
                                </button>
                            ) : (
                                <button type="button" onClick={handleClick}>
                                    Log In
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
