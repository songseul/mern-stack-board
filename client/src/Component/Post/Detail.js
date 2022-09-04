import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { PostBox, BtnDiv, PostDiv } from '../../Style/DetailListCSS';

function Detail() {
  const params = useParams();
  const navigate = useNavigate();
  const [postInfo, setPostInfo] = useState({});
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };
    axios
      .post('/api/post/detail', body)
      .then(res => {
        if (res.data.success) {
          setPostInfo(res.data.postDetail);
          setFlag(true);
        } else {
          alert('내용을 불러오는데 실패 했습니다');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [params.postNum]);

  useEffect(() => {
    console.log(postInfo);
  }, [postInfo]);

  const DeleteHandler = () => {
    if (window.confirm('정말로 게시물을 삭제 하시 겠습니까?')) {
      let body = {
        postNum: params.postNum,
      };
      axios
        .post('/api/post/delete', body)
        .then(res => {
          if (res.data.success) {
            setPostInfo(res.data.postDetail);
            alert('삭제 되었습니다');
            navigate('/');
          }
        })
        .catch(err => {
          alert('서버 에러로 게시글 삭제에 실패 하였습니다');
        });
    } else {
      alert('취소 되었습니다');
    }
  };
  return (
    <PostDiv>
      {flag ? (
        <>
          <PostBox>
            <div className="title">{postInfo.title} </div>
            <div>
              {postInfo.image ? (
                <img
                  style={{ width: '100%', height: 'auto' }}
                  src={`http://localhost:4000/${postInfo.image}`}
                  alt={postInfo.image}
                />
              ) : null}
            </div>
            <div className="content">{postInfo.content}</div>
          </PostBox>
          <BtnDiv>
            <Link to={`/edit/${postInfo.postNum}`}>
              <button className="edit">수정</button>
            </Link>
            <Link to="">
              {' '}
              <button
                className="delete"
                onClick={() => {
                  DeleteHandler();
                }}
              >
                삭제
              </button>
            </Link>
          </BtnDiv>
        </>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </PostDiv>
  );
}

export default Detail;
