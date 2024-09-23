import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './SignUpPage.css';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const {email, password} = formData;
        console.log('Form Submitted:', formData);
        fetch("http://localhost:8082/register",{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body:JSON.stringify({
                email,
                password
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userRegister");
            });
    };
    //const navigate = useNavigate();
    const handleLogin = () => {
        router.push('/SignUpPage');
    }

    return (
        <div className="signup">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="signup-info">
                    <input
                        type="email"id="email"name="email" placeholder='Email' value={formData.email} onChange={handleChange}
                    />
                </div>
                <div className="signup-info">
                    <input
                        type="password"id="password"name="password"placeholder='Password' value={formData.password}onChange={handleChange}
                    />
                </div>
                <button type="submit"
                    onClick={handleSubmit}
                >Sign Up</button>
                <div className='signIn'>
                    <p>Already have an account? <button onClick={handleLogin}>Sign In</button></p>
                    </div>
            </form>
        </div>
    );
};

export default SignUpPage;
