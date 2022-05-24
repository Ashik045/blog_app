import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Posts from '../../component/Posts/Posts';
import SectionHeader from '../../component/SectionHeader/SectionHeader';
import './myposts.css';

const MyPosts = () => {
    const [post, setPost] = useState([]);
    const { search } = useLocation();

    useEffect(() => {
        const data = async () => {
            const res = await axios.get(`/posts/${search}`);
            setPost(res.data.message);
        };

        data();
    }, [search]);

    return (
        <div className="my_posts">
            {post.length >= 1 ? (
                <SectionHeader subHeader="Travel Story" header="Best Travel Story  Shared." />
            ) : (
                <SectionHeader subHeader="Opps!!" header="You don't have shared any storys yet!" />
            )}

            <Posts posts={post} />
            {/* <SectionHeader subHeader="Opps!!" header="You Haven't created any posts yet!" /> */}
        </div>
    );
};

export default MyPosts;
