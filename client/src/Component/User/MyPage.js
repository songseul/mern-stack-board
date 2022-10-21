import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avartar from 'react-avatar';
import axios from 'axios';
import firebase from '../../firebase.js';

function MyPage() {
  const [currentImage, setCurrentImage] = useState('');
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (user.isLoading && !user.accessToken) {
      navigate('/login');
    } else {
      setCurrentImage(user.photoURL);
    }
  }, [user]);

  const ImageUpload = e => {
    // console.log(e.target.files);
    let formData = new FormData();
    formData.append('file', e.target.files[0]);
    axios.post('/api/user/profile/img', formData).then(response => {
      console.log(response.data.filePath);
      setCurrentImage(response.data.filePath);
    });
  };
  const saveProfile = async e => {
    e.preventDefault();
    try {
      await firebase.auth().currentUser.updateProfile({
        photoURL: currentImage,
      });
    } catch (err) {
      return alert('프로필 저장에 실패하였습니다.');
    }
    let body = {
      photoURL: currentImage,
      uid: user.uid,
    };
    axios.post('/api/user/profile/update', body).then(res => {
      if (res.data.success) {
        alert('프로필 저장에 성공하였습니다.');
        window.location.reload();
      } else {
        alert('프로필 저장에 실패하였습니다.');
      }
    });
  };

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
        <label>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={e => ImageUpload(e)}
          />
          <Avartar
            round={true}
            size="100"
            src={`http://localhost:4000/${currentImage}`}
            style={{ border: '1px solid #c6c6c6', cursor: 'pointer' }}
          />
          {console.log(currentImage)}
        </label>
        <button
          onClick={e => {
            saveProfile(e);
          }}
        >
          {' '}
          저장
        </button>
      </form>
    </div>
  );
}

export default MyPage;
