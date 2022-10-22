import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RepleUploadDiv } from '../../Style/RepleCSS.js';

function RepleUpload(props) {
  const [reple, setReple] = useState('');
  const user = useSelector(state => state.user);

  const submitHandler = e => {
    e.preventDefault();
    if (!reple) {
      return alert('댓글내용을 채워 주세요');
    }
    let body = {
      reple: reple,
      uid: user.uid,
      postId: props.postId,
    };
    axios.post('/api/reple/submit', body).then(res => {
      setReple('');
      if (res.data.success) {
        alert('댓글작성이 성공 하였습니다.');
        window.location.reload();
      } else {
        alert('댓글작성에 실패 하였습니다.');
      }
    });
  };
  return (
    <RepleUploadDiv>
      <form>
        <input
          type="text"
          value={reple}
          onChange={e => setReple(e.target.value)}
        />
        <button onClick={e => submitHandler(e)}>댓글 등록</button>
      </form>
    </RepleUploadDiv>
  );
}

export default RepleUpload;
