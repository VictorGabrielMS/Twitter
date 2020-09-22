import React, { useCallback } from 'react';
import api from '../../services/api';

import like from '../../assets/like.svg';
import './styles.css';

import { ITweet } from '../../interfaces/index'

interface ITweetComponetProps {
  tweet: ITweet;
}

const Tweet: React.FC<ITweetComponetProps> = ({ tweet }) => {
  const handleLike =  useCallback(async (): Promise<void> => {
    const { _id } = tweet;

    await api.post(`/likes/${_id}`);
  }, [tweet]);

  return (
    <li className="tweet">
      <strong>{tweet.author}</strong>
      <p>{tweet.content}</p>
      
      <button type="button" onClick={handleLike}>
        <img src={like} alt="like" />
        {tweet.likes}
      </button>
    </li>
  )
}

export default Tweet;