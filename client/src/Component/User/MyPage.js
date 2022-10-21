import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avartar from 'react-avatar';

function MyPage() {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  useEffect(() => {
    if (user.isLoading && !user.accessToken) {
      navigate('/login');
    }
  }, [user]);

  return (
    <div>
      <form
        style={{
          width: '50%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '2rem',
        }}
      >
        <Avartar
          round={true}
          size="100"
          src={user.photoURL}
          style={{ border: '1px solid #c6c6c6' }}
        />
      </form>
    </div>
  );
}

export default MyPage;
