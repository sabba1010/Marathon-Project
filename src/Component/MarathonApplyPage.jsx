import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MarathonRegistrationForm from './MarathonRegistrationForm';

const MarathonApplyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [marathon, setMarathon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://marathon-server-azure.vercel.app/marathons/${id}`)
      .then(res => res.json())
      .then(data => {
        setMarathon(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading marathon details...</p>;
  if (!marathon) return <p>Marathon not found.</p>;

  return <MarathonRegistrationForm marathon={marathon} onRegistered={() => navigate('/dashboard/my-apply')} />;
};

export default MarathonApplyPage;
