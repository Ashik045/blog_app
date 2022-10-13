/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import { Context } from '../../Context/Context';
import profile from '../../Image/no-photo.png';
import './sidebar.css';

const Sidebar = () => {
    const { user } = useContext(Context);

    return (
        <>
            {user && (
                <div className="sidebar">
                    <h4>about me</h4>
                    {user.profilepic ? (
                        <img src={user.profilepic} alt="" />
                    ) : (
                        <img src={profile} alt="" />
                    )}

                    <h3>{user.username}</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi at
                        consequatur illo libero saepe distinctio.
                    </p>
                </div>
            )}
        </>
    );
};

export default Sidebar;
