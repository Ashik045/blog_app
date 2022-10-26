/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Input from '../../component/Input/Input';
import SideBar from '../../component/Sidebar/Sidebar';
import { Context } from '../../Context/Context';
import loader from '../../Image/Rolling-1s-24px.png';
import './seetings.css';

const Seetings = () => {
    const { user, dispatch, isFetching } = useContext(Context);
    const [photo, setPhoto] = useState('');
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [authErr, setAuthErr] = useState(false);
    const [fileErr, setFileErr] = useState(false);

    const inputs = [
        {
            id: 1,
            label: 'Username',
            name: 'username',
            placeholder: user.username,
            type: 'text',
            required: true,
            pattern: '^[A-Za-z0-9]{3,15}$',
            errMsg: 'Username should be 3-15 characters & should not include any special character!',
        },
        {
            id: 2,
            label: 'Email',
            name: 'email',
            placeholder: user.email,
            type: 'email',
            required: true,
            errMsg: 'Email should be a valid email address!',
        },
        {
            id: 3,
            label: 'Password',
            name: 'password',
            placeholder: 'Update password',
            type: 'password',
            required: true,
            pattern: '^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{6,20}$',
            errMsg: 'Password should be 6-20 characters and include at last 1 num, 1 letter, 1 special character!',
        },
    ];

    const nevigate = useNavigate();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            width: '15rem',
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
        });

        try {
            dispatch({ type: 'UPDATE_START' });
            const data = new FormData();
            data.append('file', photo);
            data.append('upload_preset', 'uploads');

            const uploadRes = await axios.post(
                'https://api.cloudinary.com/v1_1/dqctmbhde/image/upload',
                data
            );

            const { url } = uploadRes.data;

            const updatedUser = {
                userId: user._id,
                username: values.username,
                email: values.email,
                password: values.password,
                profilepic: url,
            };

            try {
                const res = await axios.put(
                    `https://weblog.up.railway.app/api/users/${user._id}`,
                    updatedUser
                );
                dispatch({ type: 'UPDATE_SUCCESS', payload: res.data.message });

                // nevigate('/seetings');

                window.location.reload();
                Toast.fire({
                    icon: 'success',
                    title: 'User updated successfully',
                });
            } catch (error) {
                dispatch({ type: 'UPDATE_FAILURE' });
                setAuthErr(true);
            }
        } catch (error) {
            setFileErr(true);
            dispatch({ type: 'UPDATE_FAILURE' });
        }
    };

    const handleDelete = async () => {
        try {
            dispatch({ type: 'LOGOUT' });
            nevigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    if (isFetching) {
        return <p style={{ marginTop: '150px', textAlign: 'center' }}>Updating user..</p>;
    }

    return (
        <div className="settings container ">
            <div className="seeting_left">
                <div className="seetingUpDel container">
                    <span className="seetingUp">Update your account</span>
                    <span className="seetingDel" onClick={handleDelete}>
                        Delete account
                    </span>
                </div>

                <form className="seeting_form" onSubmit={handleUpdate}>
                    <div className="seeting_pp">
                        <div className="imgWrites">
                            <img
                                src={photo ? URL.createObjectURL(photo) : user.profilepic}
                                alt="upload-img"
                            />
                        </div>

                        <label htmlFor="uploadPP" className="upPP">
                            <BiImageAdd size={29} />
                        </label>
                        <input
                            onChange={(e) => setPhoto(e.target.files[0])}
                            type="file"
                            id="uploadPP"
                            style={{ display: 'none' }}
                        />
                    </div>

                    {inputs.map((input) => (
                        <Input
                            key={input.id}
                            {...input}
                            value={values[input.name]}
                            onChange={handleChange}
                        />
                    ))}

                    {fileErr && (
                        <p style={{ margin: '10px 0px', color: 'red' }} className="error">
                            Please select a profilepic.
                        </p>
                    )}
                    <button
                        type="submit"
                        className="mb-2 submit_btn"
                        disabled={isFetching}
                        style={{ position: 'relative' }}
                    >
                        {isFetching ? (
                            <img
                                src={loader}
                                alt="loading.."
                                style={{
                                    position: 'absolute',
                                    left: '40%',
                                    top: '23%',
                                    height: '25px',
                                    width: '25px',
                                }}
                            />
                        ) : (
                            'Update Profile'
                        )}
                    </button>
                    {authErr && (
                        <p style={{ margin: '10px 0px', color: 'red' }} className="error">
                            Can&apos;t update the user!
                        </p>
                    )}
                </form>
            </div>

            <div className="seeting_sidebar">
                <SideBar />
            </div>
        </div>
    );
};
export default Seetings;
