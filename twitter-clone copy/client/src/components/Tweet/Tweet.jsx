import React, { useState, useEffect } from 'react';
import axios from 'axios';
import formatDistance from 'date-fns/formatDistance';

import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Tweet = ({tweet, setData}) => {
  const { currentUser } = useSelector((state) => state.user);

  const [userData, setUserData] = useState();

  const dateStr = formatDistance(new Date(tweet.createdAt), new Date()); // showing time since tweet was created
    const location = useLocation().pathname;
    const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const findUser = await axios.get(`http://localhost:8000/api/users/find/${tweet.userId}`);

            setUserData(findUser.data);
        } catch (err) {
            console.log("error", err);
        }
    };

    fetchData();
  }, [tweet.userId, tweet.likes]);

    const handleLike = async (e) => {
        e.preventDefault();

        try {
            const like = await axios.put(`http://localhost:8000/api/tweets/${tweet._id}/like`, {
                id: currentUser._id,
            });

            if (location.includes("profile")) {
                const newData = await axios.get(`http://localhost:8000/api/tweets/user/all/${id}`); // tweets on profile page
                setData(newData.data);
            } else if (location.includes("explore")) {
                const newData = await axios.get(`http://localhost:8000/api/tweets/explore`); // tweets on explore page
                setData(newData.data);
            } else {
                const newData = await axios.get(`http://localhost:8000/api/tweets/timeline/${currentUser._id}`); // tweets on other page
                setData(newData.data); // changing data will refresh automatically to update likes
            }
        } catch (err) {
            console.log("error", err);
        }
    };
 
    return (
        <div>
            {userData && (
                <>
                    <div className='flex space-x-2'>
                    {/* <img src="" alt="" /> */} 
                    <Link to={`/profile/${userData._id}`}>
                        <h3 className='font-bold' >{userData.username}</h3>    
                    </Link> 

                    <span className="font-normal">@{userData.username}</span>
                    <p> - {dateStr}</p>

                    </div>

                    <p>{tweet.description}</p> 
                    <button onClick={handleLike}> 
                        {tweet.likes.includes(currentUser._id) ? ( //show if the user has liked the tweet
                            <FavoriteIcon className='mr-2 my-2 cursor-pointer'></FavoriteIcon>
                        ) : ( 
                            <FavoriteBorderIcon className='mr-2 my-2 cursor-pointer'></FavoriteBorderIcon>
                        )}
                        {tweet.likes.length}
                    </button>
                </>
            )}   
        </div>
        
    );
};

export default Tweet