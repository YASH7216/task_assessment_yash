import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [employees, setEmployees] = useState([]);
    const [showEmployeeList, setShowEmployeeList] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const fetchEmployees = async () => {
        try {
            const url = "http://localhost:8080/employees";
            const token = localStorage.getItem('token');

            if (!token) {
                handleError('No authorization token found');
                return;
            }

            const headers = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            const response = await fetch(url, headers);

            if (!response.ok) {
                if (response.status === 403) {
                    handleError('Forbidden: You do not have access to this resource.');
                } else if (response.status === 401) {
                    handleError('Unauthorized: JWT token is required.');
                } else {
                    handleError(`Error: ${response.status} ${response.statusText}`);
                }
                return;
            }

            const result = await response.json();
            setEmployees(result);
        } catch (err) {
            handleError(err.message);
        }
    };

    const handleEmployeeListClick = () => {
        setShowEmployeeList(true);
        fetchEmployees();
    };

    const getImageUrl = (imagePath) => {
        const baseUrl = 'http://localhost:8080/uploads'; // Ensure this is the correct base URL
        if (!imagePath) return 'path/to/fallback/image.jpg'; // Use a proper fallback image URL
        const fullUrl = `${baseUrl}/${encodeURIComponent(imagePath)}`;
        console.log('Generated image URL:', fullUrl); // Debugging line
        return fullUrl;
    };

    return (
        <div>
            <div className="navbar">
                <div className="navbar-left">
                    <a href="#" onClick={() => setShowEmployeeList(false)}>Home</a>
                    <a href="#" onClick={handleEmployeeListClick}>Employee List</a>
                </div>
                <div className="navbar-right">
                    <span>{loggedInUser}</span>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className="home-container">
                {!showEmployeeList ? (
                    <h1>Welcome {loggedInUser}</h1>
                ) : (
                    <div>
                        <h1>Employee List</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Designation</th>
                                    <th>Course</th>
                                    <th>Gender</th>
                                    <th>Created Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee, index) => (
                                    <tr key={index}>
                                        <td>
                                            <img
                                                src={getImageUrl(employee.image)}
                                                alt={employee.name}
                                                width="50"
                                                onLoad={() => console.log(`Image loaded: ${getImageUrl(employee.image)}`)}
                                                onError={(e) => { 
                                                    console.error(`Error loading image: ${getImageUrl(employee.image)}`);
                                                    e.target.src = 'path/to/fallback/image.jpg'; 
                                                }}
                                            />
                                        </td>
                                        <td>{employee.name}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.mobile}</td>
                                        <td>{employee.designation}</td>
                                        <td>{employee.course}</td>
                                        <td>{employee.gender}</td>
                                        <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

export default Home;
