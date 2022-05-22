/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../../Context/Context';
import postt from '../../Image/no-image-available-icon-6.png';
import loader from '../../Image/Rolling-1s-24px.png';
import './singlePost.css';

const SinglePost = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [singlPost, setSinglePost] = useState([]);
    const [updMode, setUpdMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const { user } = useContext(Context);

    const nevigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`/posts/${path}`);
            setSinglePost(res.data.message);
            setTitle(res.data.message.title);
            setDesc(res.data.message.desc);
        };

        fetchData();
    }, [path]);

    const handleUpdate = async () => {
        try {
            setLoading(true);
            await axios.put(`/posts/${singlPost._id}`, {
                username: user.username,
                title,
                desc,
            });

            setLoading(false);
            window.location.reload();
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const deletePost = async () => {
        try {
            await axios.delete(`/posts/${singlPost._id}`, {
                data: { username: user.username },
            });
            nevigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="singlePost container mt-5">
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

                {singlPost.username === user.username && (
                    <div className="updel">
                        {!updMode && (
                            <BiEdit
                                // onClick={updatePost}
                                size={26}
                                color="rgb(28, 202, 28)"
                                style={{ cursor: 'pointer' }}
                                className="updel_btnn"
                                onClick={() => setUpdMode(true)}
                            />
                        )}
                        <BiTrash
                            size={26}
                            color="rgb(221, 30, 30)"
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
                    <Link to={`/users/?user=${singlPost.username}`} className="authorName">
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
                    <p className="textDesc">{singlPost.desc}</p>
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
                        {loading ? (
                            <img
                                src={loader}
                                alt="loading.."
                                style={{
                                    position: 'absolute',
                                    left: '40%',
                                    top: '1%',
                                    height: '25px',
                                    width: '25px',
                                }}
                            />
                        ) : (
                            'Update Post'
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default SinglePost;
