import { useState, useEffect } from 'react';

interface UseFetchMessageResult {
  message: string;
  loading: boolean;
  error: string | null;
  fetchMessage: () => void;
}

const useFetchMessage = (): UseFetchMessageResult => {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessage = (): void => {
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

