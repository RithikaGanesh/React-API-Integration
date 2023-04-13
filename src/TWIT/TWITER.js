import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
import './Login.css';
import { Link } from 'react-router-dom';
import Error from './Error';
import { useNavigate } from 'react-router-dom';


function Twitter() {
    // const VITE_USERNAME = 'rithika';
    // const VITE_PASSWORD = 'rithika@846';
    const Navigate = useNavigate();
    const getname = localStorage.getItem("Name");
    const getpassword = localStorage.getItem("Userpassword");
    // Get
    const [tweets, setTweets] = useState([])
    const fetchPosts = () => {
        axios.get('http://172.105.58.224:3582/tweet/all', { auth: { username: `${getname}`, password: `${getpassword}` } })
            .then(function (response) {
                console.log(response)
                setTweets(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    useEffect(() => {
        fetchPosts()
    },[]
    );
    // Get

    // Post
    const [message, mymessage] = useState();
    const handlechange = (Event) => {
        mymessage(Event.target.value)
    }

    const postMessage = () => {
        if(message) {
            console.log(message);
        axios.post(('http://172.105.58.224:3582/tweet/new'),
            {
                tweet: message,
            },
            {
                auth: { username: `${getname}`, password: `${getpassword}`},
            },
        )
            .then((response) => {
                console.log(response);
                fetchPosts();
                window.location.reload();
            }).catch((err)=>{
                console.log(err);
            })
        } else{
            alert("Please enter your message")
        }
    }
// Logout
    const logout = () => {
        localStorage.clear();
        Navigate('/');
    }
    return (
       <div>
        {localStorage.getItem('Name') && localStorage.getItem('Userpassword') ? 
        ( <div className='twit'>
        <div>
            <ul className='header_twit'>
                <li><Link to="/alltwit">All tweet</Link></li>
                <li><Link to="/mytwit">My tweet</Link></li>
                <button onClick={logout}  id='logout'><Link to="/" >Logout</Link></button>
            </ul>
        </div>
        <div className='content'>
        <button onClick={fetchPosts} className='button' style={{ marginLeft: '445px', position:'sticky',top:'0'}}>Refresh</button>
            {tweets.map((_tweet) => {
                return (
                    <div key={_tweet.id} className='gettwitall'>
                        <p className='name_user'>{_tweet.author.username}</p>
                        <p className='message_user'>{_tweet.tweet}</p>
                    </div>
                )
            })}
        </div>
        <div className='input_area'>
            <input type='text' placeholder='Enter your tweet' value={message} onChange={handlechange}></input>
            <img src='images.png' alt='send button' onClick={postMessage}></img>
        </div>
    </div>) : 
    (<Error/>)}
       </div>
    )
}
export default Twitter;
