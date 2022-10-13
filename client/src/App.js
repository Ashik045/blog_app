import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.css';
import HomePage from './component/HomePage/HomePage';
import Navbar from './component/Navbar/Navbar';
import { Context } from './Context/Context';
import Login from './Pages/Login/Login';
import MyPosts from './Pages/MyPosts/MyPosts';
import Seetings from './Pages/Seetings/Seetings';
import Signup from './Pages/Signup/Signup';
import SinglePost from './Pages/SinglePost/SinglePost';
import Write from './Pages/Write/Write';

function App() {
    const { user } = useContext(Context);
    return (
        <BrowserRouter>
            <Navbar />

            {/* routing sec */}
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/signup" element={user ? <HomePage /> : <Signup />} />

                <Route path="/login" element={user ? <HomePage /> : <Login />} />

                <Route path="/write" element={user ? <Write /> : <Login />} />

                <Route path="/seetings" element={user ? <Seetings /> : <Login />} />

                <Route path="/post/:postId" element={<SinglePost />} />

                <Route path="/users" element={<MyPosts />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
