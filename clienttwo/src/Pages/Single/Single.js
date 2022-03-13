import React from 'react';
import SideBar from '../../component/Sidebar/Sidebar';
import SinglePost from '../SinglePost/SinglePost';
import './single.css';

const Single = () => (
    <div className="single container">
        <SinglePost />
        <div className="centers">
            <SideBar />
        </div>
    </div>
);

export default Single;
