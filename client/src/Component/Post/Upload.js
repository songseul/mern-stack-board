import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UploadDiv, UploadButtonDiv, UploadForm } from '../../Style/UploadCSS';
import axios from 'axios';

import ImageUpload from './ImageUpload';

function Upload() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState();

  const navigate = useNavigate();
  // console.log('accessToken', user.accessToken);

  const user = useSelector(state => state.user);
  const userToken = () => {
    if (!localStorage.accessToken) {
      alert('로그인한 회원만 글을 작성 할 수 있습니다');
      navigate('/login');
    }
  };

  useEffect(() => {
    userToken();
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    if (title === '' || content === '') {
      alert('모든 항목을 채워 주세요!');
    }
    let body = {
      title: title,
      content: content,
      image: image,
      uid: user.uid,
    };
    axios
      .post('/api/post/submit', body)
      .then(res => {
        if (res.data.success) {
          alert('글작성이 완료 되었습니다');
          navigate('/');
        } else {
          alert('글작성에 실패 하였습니다');
        }
      })
      .catch(err => {
        alert(`서버의 오류가 생겨서 전송이 실패 되었습니다.:${err}`);
      });
  };

  return (
    <UploadDiv>
      <UploadForm>
        <label htmlFor="title"> 제목 </label>
        <input
          id="title"
          placeholder=" 글의 제목을 적어주세요"
          value={title}
          onChange={e => {
            setTitle(e.target.value);
          }}
        />
        <ImageUpload setImage={setImage} />
        <label htmlFor="content"> 내용 </label>
        <textarea
          id="content"
          value={content}
          onChange={e => {
            setContent(e.target.value);
          }}
        />
        <UploadButtonDiv>
          <button
            className="cancel"
            onClick={e => {
              e.preventDefault();
              navigate('/');
            }}
          >
            취소
          </button>
          <button
            onClick={e => {
              onSubmit(e);
            }}
          >
            제출
          </button>
        </UploadButtonDiv>
      </UploadForm>
    </UploadDiv>
  );
}

export default Upload;
