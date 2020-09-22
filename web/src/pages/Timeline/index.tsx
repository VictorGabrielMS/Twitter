import React, { useEffect, useState, useCallback } from 'react';
import socket from 'socket.io-client';

import api from '../../services/api';

import TwitterLogo from '../../assets/twitter.svg';
import './styles.css';

import Tweet from '../../components/Tweet';

import { ITweet } from '../../interfaces/index'

const Timeline: React.FC = () => {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [newTweet, setNewTweet] = useState('');

  useEffect(() => {
    const io = socket('http://localhost:3333');

    io.on('tweet', (data: ITweet) => {
      setTweets([data, ...tweets]);
    });
  
    io.on('like', (data: ITweet) => {
      setTweets(tweets.map(tweet => tweet._id === data._id ? data : tweet));
    });
  }, [tweets]);
  
  useEffect(() => {
    async function getApiData(): Promise<void> {
      const response = await api.get('tweets');
      
      setTweets(response.data)
    }

    getApiData();
  }, [])

  const handleInputChange =  useCallback((event): void => {
    setNewTweet(event.target.value);
  }, []);

  const handleNewTweet =  useCallback(async (event): Promise<void> => {
    if (event.keyCode !== 13) return;

    const author = localStorage.getItem('@Twitter:username');

    await api.post('/tweets', { content: newTweet, author });

    setNewTweet('');
  }, [newTweet]);
    


  return (
    <div className="timeline-wrapper">
      <img height={24} src={TwitterLogo} alt="GoTwitter" />

      <form>
        <textarea
          value={newTweet}
          onChange={handleInputChange}
          onKeyDown={handleNewTweet}
          placeholder="O que está acontecendo?"
        />
      </form>

      <ul className="tweet-list">
        {tweets.map(tweet => <Tweet key={tweet._id} tweet={tweet} />)}
      </ul>
    </div>
  );
}

export default Timeline;