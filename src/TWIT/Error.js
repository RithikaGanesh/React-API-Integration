import React from "react";
import { Link } from "react-router-dom";

function  Error () {
    return (
        <div id='Container'>
              <h1>Please login to access this page</h1>
              <div><button type="submit" className='Submit'><Link to="/">Login</Link></button></div>
        </div>
    )
}
export default Error;