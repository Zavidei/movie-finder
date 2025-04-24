import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

const UserProfile = () => {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const res = await fetch('/api/user', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,  
            },
          });
          const data = await res.json();

          if (res.ok) {
            setUserEmail(data.email);
          } else {
            console.error("Ошибка при получении данных пользователя:", data.error);
          }
        } catch (error) {
          console.error("Ошибка при запросе:", error);
        }
      }
    };

    fetchUserEmail();
  }, []);

  return (
    <Typography>
      {userEmail ? userEmail : "Загрузка..."}
    </Typography>
  );
};

export default UserProfile;
