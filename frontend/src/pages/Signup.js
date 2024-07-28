import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
        designation: 'HR',
        gender: 'male',
        course: 'MCA',
        image: null
    });

    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo({ ...signupInfo, [name]: value });
    };

    const handleImageChange = (e) => {
        setSignupInfo({ ...signupInfo, image: e.target.files[0] });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, mobile, designation, gender, course, image } = signupInfo;
        if (!name || !email || !password || !mobile || !designation || !gender || !course) {
            return handleError('All fields are required');
        }
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('mobile', mobile);
            formData.append('designation', designation);
            formData.append('gender', gender);
            formData.append('course', course);
            if (image) {
                formData.append('image', image);
            }

            const response = await fetch('http://localhost:8080/auth/signup', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else if (error) {
                handleError(error.details[0].message);
            } else if (!success) {
                handleError(message);
            }
        } catch (err) {
            handleError('Internal server error');
        }
    };

    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter your name...'
                        value={signupInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={signupInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={signupInfo.password}
                    />
                </div>
                <div>
                    <label htmlFor='mobile'>Mobile</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='mobile'
                        placeholder='Enter your mobile number...'
                        value={signupInfo.mobile}
                    />
                </div>
                <div>
                    <label htmlFor='designation'>Designation</label>
                    <select name='designation' onChange={handleChange} value={signupInfo.designation}>
                        <option value='HR'>HR</option>
                        <option value='Manager'>Manager</option>
                        <option value='Sales'>Sales</option>
                    </select>
                </div>
                <div>
                    <label>Gender</label>
                    <div>
                        <label>
                            <input
                                type='radio'
                                name='gender'
                                value='male'
                                checked={signupInfo.gender === 'male'}
                                onChange={handleChange}
                            />
                            Male
                        </label>
                        <label>
                            <input
                                type='radio'
                                name='gender'
                                value='female'
                                checked={signupInfo.gender === 'female'}
                                onChange={handleChange}
                            />
                            Female
                        </label>
                    </div>
                </div>
                <div>
                    <label htmlFor='course'>Course</label>
                    <select name='course' onChange={handleChange} value={signupInfo.course}>
                        <option value='MCA'>MCA</option>
                        <option value='BCA'>BCA</option>
                        <option value='BSC'>BSC</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='image'>Upload Image</label>
                    <input
                        type='file'
                        name='image'
                        onChange={handleImageChange}
                    />
                </div>
                <button type='submit'>Signup</button>
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;
