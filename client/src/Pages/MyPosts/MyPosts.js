import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useLocation } from 'react-router-dom';
import Posts from '../../component/Posts/Posts';
import SectionHeader from '../../component/SectionHeader/SectionHeader';
import './myposts.css';

const MyPosts = () => {
    const [post, setPost] = useState([]);
    const { search } = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const data = async () => {
            setLoading(true);
            const res = await axios.get(`https://weblog.up.railway.app/api/posts/${search}`);
            setPost(res.data.message);
            setLoading(false);
        };

        data();
    }, [search]);

    return (
        <div className="my_posts">
            {loading ? (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '50% 50%',
                        gridGap: '20px',
                        marginTop: '100px',
                    }}
                >
                    <div>
                        <Skeleton height={250} />
                        <Skeleton height={40} style={{ marginTop: '10px', marginBottom: '10px' }} />
                        <Skeleton count={4} />
                    </div>
                    <div>
                        <Skeleton height={250} />
                        <Skeleton height={40} style={{ marginTop: '10px', marginBottom: '10px' }} />
                        <Skeleton count={4} />
                    </div>
                </div>
            ) : (
                <div className="posts">
                    {post.length > 0 ? (
                        <SectionHeader
                            subHeader="Travel Story"
                            header="Best Travel Story  Shared."
                        />
                    ) : (
                        <SectionHeader
                            subHeader="Opps!!"
                            header="You don't have shared any stories yet!"
                        />
                    )}

                    <Posts posts={post} />
                </div>
            )}
        </div>
    );
};

export default MyPosts;
