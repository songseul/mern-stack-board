import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { UploadDiv, UploadButtonDiv, UploadForm } from '../../Style/UploadCSS';
import ImageUpload from './ImageUpload';

//단건 게시글 : 수정 버튼 눌렀을때 나오는 컴포넌트
function Edit() {
  const params = useParams();
  const navigate = useNavigate();
  const [postInfo, setPostInfo] = useState({});
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(`http://localhost:4000/${postInfo.image}`);
  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };
    axios
      .post('/api/post/detail', body)
      .then(res => {
        if (res.data.success) {
          setPostInfo(res.data.postDetail);
        } else {
          alert('내용을 불러오는데 실패 했습니다');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [params.postNum]);
  const onSubmit = e => {
    e.preventDefault();
    if (title === '' || content === '') {
      alert('수정할 항목을 모두 채워 주세요!');
    }
    let body = {
      title: title,
      content: content,
      postNum: params.postNum,
      image: image,
    };
    axios
      .post('/api/post/edit', body)
      .then(res => {
        if (res.data.success) {
          alert('글 수정이 완료 되었습니다');
          navigate(`/post/${params.postNum}`);
        } else {
          alert('글 수정에 실패 하였습니다');
        }
      })
      .catch(err => {
        alert(`서버의 오류가 생겨서 전송이 실패 되었습니다.:${err}`);
      });
  };

  useEffect(() => {
    setTitle(postInfo.title);
    setContent(postInfo.content);
    console.log(postInfo.image);
    setImage(postInfo.image);
  }, [postInfo]);

  return (
    <UploadDiv>
      <UploadForm>
        <label htmlFor="title"> 제목 </label>
        <input
          id="title"
          placeholder=" 수정할 제목을 적어주세요"
          value={title}
          onChange={e => {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor="content"> 내용 </label>

        <ImageUpload onChange={e => setImage(e)} />
        <textarea
          placeholder=" 수정할 내용을 적어주세요"
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
              navigate(-1);
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

export default Edit;
