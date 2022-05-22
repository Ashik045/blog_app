/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Posts from '../Posts/Posts';
import SectionHeader from '../SectionHeader/SectionHeader';
import './mainHome.css';

const MainHome = () => {
    const [post, setPost] = useState([]);
    const { search } = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`/posts${search}`);
            setPost(res.data.message);
        };

        fetchData();
    }, [search]);

    return (
        <div className="main_home">
            <Header />

            <div className="main_body container" id="about">
                <SectionHeader subHeader="Travel Story" header="Best Tourist's Shared Story" />
                <Posts posts={post} />
            </div>
        </div>
    );
};

export default MainHome;
