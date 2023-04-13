import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Error from './Error';

function Single() {
    // const VITE_USERNAME = 'rithika';
    // const VITE_PASSWORD = 'rithika@846';
    const getname = localStorage.getItem("Name");
    const getpassword = localStorage.getItem("Userpassword");
    const Navigate = useNavigate();
    // Get my tweet
    const [tweets, setTweets] = useState([])
    const fetchPosts = () => {
        axios.get('http://172.105.58.224:3582/tweet/my-all', { auth: { username: `${getname}`, password: `${getpassword}` } })
            .then(function (response) {
                console.log(response)
                setTweets(response.data)
            })
            .catch(function (error) {
                console.log(error)
                Navigate("error");
            })
    }
    useEffect(() => {
        fetchPosts()
    }, []
    );
    // Get

    // Post
    const [message, mymessage] = useState();
    const handlechange = (Event) => {
        mymessage(Event.target.value)
    }
    const postMessage = () => {
        if (message) {
            console.log(message);
            axios.post(('http://172.105.58.224:3582/tweet/new'),
                {
                    tweet: message,
                },
                {
                    auth: { username: `${getname}`, password: `${getpassword}` },
                },
            )
                .then((response) => {
                    console.log(response);
                    fetchPosts();
                    window.location.reload();
                }).catch((err) => {
                    console.log(err);
                })
        } else {
            alert("Please enter your message")
        }
    }

    //Delete 
    const deletetwit = (id) => {
        console.log(id);
        axios.delete((`http://172.105.58.224:3582/tweet/${id}`),
            {
                auth: { username: `${getname}`, password: `${getpassword}` }
            }
        ).then((response) => {
            console.log(response);
            fetchPosts();
            window.location.reload();
        }).catch((err) => {
            console.log('Delete twiter ID'(id) + 'Message'(err))
            alert("Error in delete")
        })
    };

    // Logout
    const logout = () => {
        localStorage.clear();
        Navigate('/');
    }

    return (
        <div>
            {localStorage.getItem('Name') && localStorage.getItem('Userpassword') ?
                (<div className='twit' style={{ minHeight: '250px', height: "auto" }}>
                    <div>
                        <ul className='header_twit'>
                            <li><Link to="/alltwit">All tweet</Link></li>
                            <li><Link to="/mytwit">My tweet</Link></li>
                            <button onClick={logout} id='logout'><Link to="/" >Logout</Link></button>
                        </ul>
                    </div>
                    <div className='content'>
                        <div><button onClick={fetchPosts} style={{ marginLeft: '445px', marginTop: '2px', marginBottom: '2px' }}>Refresh</button></div>
                        {tweets.map((_tweet) => {
                            return (
                                <div key={_tweet.id} className='gettwit'>
                                    <div><p className='name_user'>{_tweet.author.username}</p>
                                        <p className='message_user'>{_tweet.tweet} </p>
                                    </div>
                                    <div><button onClick={() => deletetwit(_tweet.id)}>Delete</button></div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='input_area'>
                        <input type='text' placeholder='Enter your tweet' value={message} onChange={handlechange}></input>
                        <img src='images.png' alt='send button' onClick={postMessage}></img>
                    </div>

                </div>) :
                (<Error />)}
        </div>
    )
}
export default Single;