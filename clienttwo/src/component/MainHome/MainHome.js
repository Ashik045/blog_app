/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import loader from '../../Image/Spinner-1s-71px.png';
import Header from '../Header/Header';
import Posts from '../Posts/Posts';
import SectionHeader from '../SectionHeader/SectionHeader';
import './mainHome.css';

const MainHome = () => {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(false);

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const res = await axios.get(`/posts`);
            setPost(res.data.message);
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div className="main_home">
            <Header />

            <div className="main_body container" id="about">
                <SectionHeader subHeader="Travel Story" header="Best Tourist's Shared Story" />
                <Posts posts={post} loading={loading} />
            </div>
        </div>
    );
};

export default MainHome;
