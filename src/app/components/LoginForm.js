'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';



function LoginForm() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter(); 

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSignUp = () => {
        router.push('/sign-up');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formData;
        const encryptedPassword = password;

        fetch('http://localhost:8082/login-user', {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                email,
                password: encryptedPassword,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, 'userRegister');
                if (data.status === 'ok') {
                    alert('Login successful');
                    window.localStorage.setItem('token', data.data);
                    const fetchAdminStatus = async (email) => {
                        try {
                          const response = await fetch(
                            `http://localhost:8080/api//get-user-admin-status?email=${email}`,
                            {
                              method: "GET",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`, // If you are using token-based authentication
                              },
                            }
                          );
                  
                          if (!response.ok) {
                            throw new Error("Failed to fetch admin status");
                          }
                  
                          const adminStatus = await response.json();
                          console.log("data.admin: ", data.admin);
                            if (data.admin == 1) {
                            router.push("/admin");
                            } else {
                            router.push("/");
                            }
                        } catch (error) {
                          console.error("Error:", error);
                        }
                      };
                } else {
                    console.log('Encrypted Password:', encryptedPassword);
                console.log('Form Submitted:', formData);
                    alert(data.error);
                }
            })
            .catch((error) => {
                console.log('Encrypted Password:', encryptedPassword);
                console.log('Form Submitted:', formData);
                console.error('Error:', error);
            });
    };

    return (
        <div className='loginPage-container'>
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder='Email'
                />
                <input
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder='Password'
                />
                <button className='donbutton' type='submit'>
                    Log In
                </button>
                <div className='logIn'>
                    <p>
                        Don't have an account already? 
                        <span onClick={handleSignUp}>
                        Sign Up
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
