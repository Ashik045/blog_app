/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import loader from '../../Image/Spinner-1s-71px.png';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Header from '../Header/Header';
import PopularPost from '../PopularPost/PopularPost';
import Posts from '../Posts/Posts';
import SectionHeader from '../SectionHeader/SectionHeader';
import './mainHome.css';

const MainHome = () => {
    const [post, setPost] = useState([]);
    const [popularPost, setPopularPost] = useState([]);
    const [loading, setLoading] = useState(false);

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const res = await axios.get(`https://weblog.up.railway.app/api/posts`);
            const res2 = await axios.get(`https://weblog.up.railway.app/api/posts?popular=true`);
            setPost(res.data.message);
            setPopularPost(res2.data.message);
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div className="main_home">
            <Header />

            <div className="main_body container" id="about">
                <SectionHeader subHeader="Travel Story" header="Best Tourist's Shared Story" />

                <div className="home_content">
                    <div className="left">
                        <Posts posts={post} loading={loading} />
                    </div>

                    <div className="right">
                        <h4 style={{ color: '#ff577ec5', letterSpacing: '2px' }}>MOST POPULAR</h4>
                        {loading ? (
                            <>
                                <Skeleton height={100} style={{ marginBottom: '10px' }} />
                                <Skeleton height={100} style={{ marginBottom: '10px' }} />
                                <Skeleton height={100} style={{ marginBottom: '10px' }} />
                                <Skeleton height={100} style={{ marginBottom: '10px' }} />
                            </>
                        ) : (
                            popularPost
                                .slice(0, 4)
                                .map((popularpost) => (
                                    <PopularPost key={popularpost._id} post={popularpost} />
                                ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainHome;
