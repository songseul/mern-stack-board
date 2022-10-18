import axios from 'axios';
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PostBox, BtnDiv, PostDiv } from '../../Style/DetailListCSS';
import { useSelector } from 'react-redux';

function Detail(props) {
  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  console.log(props);
  const DeleteHandler = () => {
    if (window.confirm('정말로 게시물을 삭제 하시 겠습니까?')) {
      let body = {
        postNum: params.postNum,
      };
      axios
        .post('/api/post/delete', body)
        .then(res => {
          if (res.data.success) {
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
      <PostBox>
        <div className="title"> {props.postInfo.title}</div>
        <h3>{props.postInfo.author.displayName}</h3>
        <div>
          {props.postInfo.image ? (
            <img
              style={{ width: '100%', height: 'auto' }}
              src={`http://localhost:4000/${props.postInfo.image}`}
              alt={props.postInfo.image}
            />
          ) : null}
        </div>
        <div className="content">{props.postInfo.content}</div>
      </PostBox>
      {user.uid === props.postInfo.author.uid && (
        <BtnDiv>
          <Link to={`/edit/${props.postInfo.postNum}`}>
            <button className="edit">수정</button>
          </Link>
          <Link to="">
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
      )}
    </PostDiv>
  );
}

export default Detail;
