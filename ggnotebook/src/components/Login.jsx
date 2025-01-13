import React, {useState} from 'react'; 
import {useNavigate} from 'react-router-dom'

const Login = () => {

    const [credentials, setCredentials] = useState({email:"", password:""});

    const handleChange = (e)=>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }

    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const email = document.getElementById("exampleInputEmail1").value; 
        // const password = document.getElementById("exampleInputPassword1").value;
        // const response = await fetch('http://localhost:5000/api/auth/login', {
        const response = await fetch('https://ggnotbook-backend.vercel.app/api/auth/login', {
            method:'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
            // body: JSON.stringify({ email, password })
        });
        const json = await response.json();
        console.log(json);
        if(json.successMsg) {
            //save auth token and redirect 
            localStorage.setItem('token', json.authtoken);
            history("/");

        } else {
            alert('Invalid credentials' + json.email);
        }

    }
    return (
        <>
        <section className='login-form'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6">
                        <h1 className='my-5'>login</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
                                <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange}  requrired/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
                                <input type="password" name="password" className="form-control" id="exampleInputPassword1" autocomplete="current-password" onChange={handleChange}  requrired/>
                            </div>
                            
                            <button type="submit" className="btn btn-primary" >Submit</button>
                        </form>

                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Login;
