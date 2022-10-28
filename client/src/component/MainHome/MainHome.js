/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
// import loader from '../../Image/Spinner-1s-71px.png';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { InpContext } from '../../InpContext/Context';
import Header from '../Header/Header';
import PopularPost from '../PopularPost/PopularPost';
import Posts from '../Posts/Posts';
import SectionHeader from '../SectionHeader/SectionHeader';
import './mainHome.css';

const MainHome = () => {
    const [post, setPost] = useState([]);
    const [filteredPost, setFilteredPost] = useState([]);
    const [popularPost, setPopularPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const { input, isFetching, dispatchh } = useContext(InpContext);
    console.log(`home page ${input}`);
    console.log(post);
    console.log(filteredPost);
    console.log(isFetching);

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

    useEffect(() => {
        dispatchh({ type: 'SEARCH_START' });

        if (input !== '') {
            setLoading(true);
            const filterData = post.filter((item) =>
                Object.values(item.title).join('').toLowerCase().includes(input.toLowerCase())
            );
            setFilteredPost(filterData);
            dispatchh({ type: 'SEARCH_END', payload: input });

            setLoading(false);
        } else {
            setFilteredPost(post);
            dispatchh({ type: 'SEARCH_CLEAR' });
        }
    }, [input, post, dispatchh]);

    return (
        <div className="main_home">
            <Header />

            <div className="main_body container" id="about">
                <SectionHeader subHeader="Travel Story" header="Best Tourist's Shared Story" />

                <div className="home_content">
                    <div className="left">
                        {(loading || isFetching) && (
                            <div className="loading">
                                <div>
                                    <Skeleton height={250} />
                                    <Skeleton
                                        height={40}
                                        style={{ marginTop: '10px', marginBottom: '10px' }}
                                    />
                                    <Skeleton count={4} />
                                </div>
                                <div>
                                    <Skeleton height={250} />
                                    <Skeleton
                                        height={40}
                                        style={{ marginTop: '10px', marginBottom: '10px' }}
                                    />
                                    <Skeleton count={4} />
                                </div>
                                <div>
                                    <Skeleton height={250} />
                                    <Skeleton
                                        height={40}
                                        style={{ marginTop: '10px', marginBottom: '10px' }}
                                    />
                                    <Skeleton count={4} />
                                </div>
                                <div>
                                    <Skeleton height={250} />
                                    <Skeleton
                                        height={40}
                                        style={{ marginTop: '10px', marginBottom: '10px' }}
                                    />
                                    <Skeleton count={4} />
                                </div>
                            </div>
                        )}
                        {post.length === 0 || filteredPost.length === 0 ? (
                            <p style={{ textAlign: 'center' }}>No post found!</p>
                        ) : (
                            <Posts posts={filteredPost || post} loading={loading} />
                        )}
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
