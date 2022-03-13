/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/Context';
import profile from '../../Image/no-photo.png';
import './sidebar.css';

const Sidebar = () => {
    const [cats, setCats] = useState([]);
    const { user } = useContext(Context);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('/categories');
            setCats(res.data.message);
        };

        fetchData();
    }, []);

    return (
        <>
            {user && (
                <div className="sidebar">
                    <h4>about me</h4>
                    {user ? <img src={user.profilepic} alt="" /> : <img src={profile} alt="" />}
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi at
                        consequatur illo libero saepe distinctio.
                    </p>

                    <div className="category">
                        <h5>Category</h5>
                        <ul>
                            {cats.map((e) => (
                                <li key={e._id}>
                                    <Link className="link_cat" to={`/?cat=${e.name}`}>
                                        {e.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
