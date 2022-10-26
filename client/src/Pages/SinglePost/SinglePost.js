/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { MdBorderColor } from 'react-icons/md';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PopularPost from '../../component/PopularPost/PopularPost';
import { Context } from '../../Context/Context';
import postt from '../../Image/no-image-available-icon-6.png';
// import loader1 from '../../Image/Spinner-1s-71px.png';
import './singlePost.css';

const SinglePost = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [singlPost, setSinglePost] = useState([]);
    const [popularPost, setPopularPost] = useState([]);
    const [updMode, setUpdMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const { user } = useContext(Context);

    const nevigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const res = await axios.get(`https://weblog.up.railway.app/api/posts/${path}`);
            const res2 = await axios.get(`https://weblog.up.railway.app/api/posts?popular=true`);

            setSinglePost(res.data.message);
            setPopularPost(res2.data.message);
            setTitle(res.data.message.title);
            setDesc(res.data.message.desc);
            setLoading(false);
        };

        fetchData();
    }, [path]);

    const handleUpdate = async () => {
        try {
            setLoading(true);
            await axios.put(`https://weblog.up.railway.app/api/posts/${singlPost._id}`, {
                username: user.username,
                title,
                desc,
            });

            window.location.reload();
            setUpdMode(false);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setUpdMode(false);
        }
    };

    const deletePost = async () => {
        try {
            setLoading(true);

            await axios.delete(`https://weblog.up.railway.app/api/posts/${singlPost._id}`, {
                data: { username: user.username },
            });

            setLoading(false);
            nevigate('/');
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <div className="singlePost container mt-5">
            <div className="singlePost_detail">
                {loading ? (
                    <>
                        <Skeleton height={500} />
                        <Skeleton height={70} />
                        <Skeleton count={5} />
                    </>
                ) : (
                    <>
                        {singlPost.photo ? (
                            <img src={singlPost.photo} alt="noimg" />
                        ) : (
                            <img src={postt} alt="default-img" />
                        )}

                        <div className="title_updel">
                            {updMode ? (
                                <input
                                    className="post_title_inp"
                                    type="text"
                                    value={title}
                                    // eslint-disable-next-line jsx-a11y/no-autofocus
                                    autoFocus
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            ) : (
                                <h3 className="post_title ">{singlPost.title}</h3>
                            )}

                            {singlPost.username === user?.username && (
                                <div className="updel">
                                    {!updMode && (
                                        <MdBorderColor
                                            // onClick={updatePost}
                                            size={26}
                                            color="#182747"
                                            style={{ cursor: 'pointer' }}
                                            className="updel_btnn"
                                            onClick={() => setUpdMode(true)}
                                        />
                                    )}
                                    <BiTrash
                                        size={26}
                                        color="#E94560"
                                        style={{ marginLeft: '20px', cursor: 'pointer' }}
                                        className="updel_btnn"
                                        onClick={deletePost}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="post_text">
                            <p>
                                Author:{' '}
                                <Link
                                    to={`/users/?user=${singlPost.username}`}
                                    className="authorName"
                                >
                                    <b>{singlPost.username}</b>
                                </Link>{' '}
                                <i className="text-muted">
                                    <small style={{ marginLeft: '20px', fontSize: '14px' }}>
                                        {new Date(singlPost.createdAt).toDateString()}
                                    </small>
                                </i>
                            </p>

                            {updMode ? (
                                <textarea
                                    rows={8}
                                    type="text"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    className="textDesc_inp"
                                />
                            ) : (
                                <p className="textDesc">
                                    {singlPost.desc || <Skeleton count={6} />}
                                </p>
                            )}

                            {updMode && (
                                <button
                                    type="submit"
                                    onClick={handleUpdate}
                                    style={{
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        position: 'relative',
                                    }}
                                    className="update_post"
                                >
                                    Update Post
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>

            <div className="popular_post_sec">
                <h4 style={{ color: '#ff577ec5', letterSpacing: '2px' }}>MOST POPULAR</h4>
                {loading ? (
                    <>
                        <Skeleton height={100} style={{ marginBottom: '15px' }} />
                        <Skeleton height={100} style={{ marginBottom: '15px' }} />
                        <Skeleton height={100} style={{ marginBottom: '15px' }} />
                    </>
                ) : (
                    popularPost
                        .filter((item) => item._id !== singlPost._id)
                        .slice(0, 3)
                        .map((popularpost) => (
                            <PopularPost key={popularpost._id} post={popularpost} />
                        ))
                )}
            </div>
        </div>
    );
};

export default SinglePost;
