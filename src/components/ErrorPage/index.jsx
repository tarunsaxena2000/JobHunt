import React from 'react'
import './index.css';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <>
      <div className="error-page">
        <div class="error">404</div>
        <br />
        <br />
        <span class="info">File not found</span>
        <img
        
          alt="404-error"
        />
        <div className="home-button">
          <Link to="/Home">Go To Home</Link>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
