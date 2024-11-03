import React, { useState } from 'react';
import "./login.css"
import "./Login_files/css.css"
import "./Login_files/jquery-ui.css"
import "./Login_files/style.css"
import "./Login_files/dswi.css"
import AddUserForm from './addUserForm';
import SignIn from './signInForm';

const Overlay = ({ message, onClose }) => (
  <div className="overlay">
    <div className="overlay-content">
      <h2>{message}</h2>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signedIn, setSignedIn] = useState(false);
  const [message, setMessage] = useState('');

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted:", { username, password });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("response: ", response.ok);
        alert("thankyou for logging in!");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setMessage("An error occurred during sign-in.");
    }
  };

  const handleOverlayClose = () => {
    setSignedIn(false); // Close the overlay
    setMessage(''); // Clear the message
  };

  return (
    <div className="login mdc-typography" id="desktop">
      {signedIn && <Overlay message={message} onClose={handleOverlayClose} />}
      <div id="orange-bar"></div>
      <div id="page" className="hfeed site row-offcanvas">
        <div id="main" className="site-main">
          <div className="main-content">
            <a className="sr-only" href="#content" title="Skip to content">Skip to content</a>
            <div id="sidebar">
              <header id="masthead" className="site-header" role="banner">
                <h3 className="killer-logo">
                  <a href="http://www.utk.edu/">The University of Tennessee, Knoxville</a>
                </h3>
                <button type="button" className="toggle close findpage">
                  <span className="sr-only">Toggle navigation</span>
                  <i className="icon-fa-find"></i>
                  <br />MENU<br />
                </button>
              </header>
            </div>

            <div id="primary" className="content-area" style={{ minHeight: '483px' }}>
              <header id="sitetitle" className="site-header" role="banner">
                <h2 className="department">
                  <a title="Central Authentication Service" rel="home">Central Authentication Service</a>
                </h2>
              </header>

              <div id="content" className="site-content site-content wide" role="main">
                <article className="hentry">
                  <div className="d-flex justify-content-center">
                    <div className="d-flex justify-content-center flex-md-row flex-column mdc-card mdc-card-content card flex-grow-1">
                      <section id="loginForm" className="login-section login-form card-body">
                        <div className="entry-content reg">
                          <header className="entry-header">
                            <nav className="breadcrumbs" role="navigation" aria-label="You are here:">
                              Please Log in:
                            </nav>
                          </header>
                          <form method="post" id="fm1" className="form-horizontal">
                            <div id="login-form-controls">
                              <div className="form-group" id="usernameSection">
                                <label htmlFor="username" className="one-fourth column control-label">NetID:</label>
                                <input
                                  type="text"
                                  name="username"
                                  id="username"
                                  className="form-control"
                                  value={username}
                                  onChange={handleUsernameChange}
                                />
                              </div>
                              <div className="form-group" id="passwordSection">
                                <label htmlFor="password" className="one-fourth column control-label">Password:</label>
                                <input
                                  type="password"
                                  name="password"
                                  id="password"
                                  className="form-control"
                                  value={password}
                                  onChange={handlePasswordChange}
                                />
                              </div>
                              <button type="submit" className="btn btn-primary" onClick={handleSignIn}>Login</button>
                            </div>
                          </form>

                          <p className="warn">When finished, please <strong>Exit</strong> and close your browser to protect your privacy.</p>
                          <p>
                            By logging in, you agree to the <a href="https://oit.utk.edu/itpolicy">Acceptable Use Policy</a> and consent to your IT resources usage being monitored and logged.
                          </p>
                        </div>
                      </section>

                      <section className="login-section login-about card-body">
                        <div className="entry-content about">
                          <header className="entry-header">
                            <h1>About CAS</h1>
                          </header>
                          <p>The Central Authentication Service (CAS) provides single sign-on access to many UT services.</p>
                          <p> Note: If your connection service is poor, CAS will download a helper file to your computer. The helper file's SHA256 hash is 69AF899E1453DA04E9663B9A07582517830436F9BBD3C77FD74CD5F48FDD25E8. </p>
                        </div>
                      </section>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay styles */}
      <style jsx>{`
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .overlay-content {
          background: white;
          padding: 20px;
          border-radius: 5px;
          text-align: center;
        }

        .overlay-content h2 {
          margin: 0;
        }

        .overlay-content button {
          margin-top: 15px;
        }
      `}</style>
    </div>
  );
};

export default LoginComponent;
