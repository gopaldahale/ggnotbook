import React, { useState } from 'react';

const Signup = () => {

  const [credentials, setCredentials] = useState({ fullname: "", email: "", password: "", confirmpassword: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  // Register User
  const handleSubmit = async (e) => {
    e.preventDefault();

    if ((credentials.password) !== (credentials.confirmpassword)) {
      alert('password dont match');
    }
    // const {fullname, email, password } = credentials;
    // const response = await fetch('http://localhost:5000/api/auth/createuser', {
    const response = await fetch('https://ggnotebook-backend.vercel.app/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: credentials.fullname, email: credentials.email, password: credentials.password }),
      credentials: 'include',
    });
    const json = await response.json();
    console.log(json);
    if (json.signSuccess) {
      alert('sign up successfully');
    } else {
      alert('Invalid credentials');
    }

  }


  return (
    <>
      <section className='login-form'>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <h1 className='my-5'>Signup</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputFullname" className="form-label" >Full Name</label>
                  <input onChange={handleChange} type="fullname" name="fullname" className="form-control" id="exampleInputFullname" aria-describedby="fullname" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
                  <input onChange={handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
                  <input onChange={handleChange} type="password" name="password" className="form-control" id="exampleInputPassword1" autocomplete="current-password" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1Confirm" className="form-label" >Confirm Password</label>
                  <input onChange={handleChange} type="password" name='confirmpassword' className="form-control" id="exampleInputPassword1Confirm" autocomplete="current-password" required />
                </div>

                <button type="submit" className="btn btn-primary" >Sign up</button>
              </form>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Signup;
