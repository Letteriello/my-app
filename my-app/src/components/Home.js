// src/hooks/useFetchMessage.js

import { useState, useEffect } from 'react';

const useFetchMessage = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessage = () => {
    setLoading(true);
    setError(null);

    fetch('/api/hello')
      .then(response => response.json())
      .then(data => {
        setMessage(data.message);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching message:', error);
        setError('Error fetching message. Please try again.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return { message, loading, error, fetchMessage };
};

export default useFetchMessage;
