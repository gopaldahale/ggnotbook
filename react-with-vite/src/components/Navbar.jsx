import React from 'react';


const Navbar = (props) => {
    return (
        <>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <div className="container-fluid">
                    <div className="logo">
                        <h2>Sate Bank of Gopal</h2>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className='navbar-nav'>
                            <li className='nav-item'><a href="/" className='nav-link'>home</a></li>
                            <li className='nav-item'><a href="/about" className='nav-link'>About</a></li>
                            <li className='nav-item'><a href="/contact" className='nav-link'>contact</a></li>
                        </ul>
                    </div>
                    <div className="amount-window">
                        <h2>Amount: ${props.countPropsVar}</h2>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
