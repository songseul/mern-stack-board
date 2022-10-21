import React, { useState, useEffect, useRef } from 'react';
import { RepleContentDiv, RepleUploadDiv } from '../../Style/RepleCSS';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Avartar from 'react-avatar';

function RepleContent(props) {
  const [modalFlag, setModalFlag] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [reple, setReple] = useState(props.reple.reple);

  const ref = useRef();
  useOnClickOutside(ref, () => setModalFlag(false));
  const user = useSelector(state => state.user);

  const submitHandler = e => {
    e.preventDefault();
    let body = {
      uid: user.uid,
      reple: reple,
      postId: props.reple.postId,
      repleId: props.reple._id,
    };
    axios.post('/api/reple/edit', body).then(res => {
      if (res.data.success) {
        alert('댓글 수정이 성공 하였습니다.');
      } else {
        alert('댓글 수정이 실패 하였습니다');
      }
      return window.location.reload();
    });
  };

  const DeleteHandler = e => {
    e.preventDefault();
    if (window.confirm('정말로 게시물을 삭제 하시 겠습니까?')) {
      let body = {
        repleId: props.reple._id,
        postId: props.reple.postId,
      };
      axios
        .post('/api/reple/delete', body)
        .then(res => {
          if (res.data.success) {
            alert('댓글이 삭제 되었습니다');
            window.location.reload();
          }
        })
        .catch(err => {
          alert('댓글 삭제에 실패 하였습니다');
        });
    }
  };

  return (
    <RepleContentDiv>
      <div className="author">
        <div className="userInfo">
          <Avartar
            round={true}
            size="30"
            src={`http://localhost:4000/${props.reple.author.photoURL}`}
            style={{ border: '1px solid #c6c6c6' }}
          />
          <p> {props.reple.author.displayName} </p>
        </div>
        {
          (props.reple.author.uid = user.uid && (
            <div className="modalControl">
              <span onClick={() => setModalFlag(true)}>... </span>
              {modalFlag && (
                <div className="modalDiv" ref={ref}>
                  <p
                    onClick={() => {
                      setEditFlag(true);
                      setModalFlag(false);
                    }}
                  >
                    수정
                  </p>
                  <p
                    className="delete"
                    onClick={e => {
                      DeleteHandler(e);
                    }}
                  >
                    삭제
                  </p>
                </div>
              )}
            </div>
          ))
        }
      </div>
      {editFlag ? (
        <RepleUploadDiv>
          <form>
            <input
              type="text"
              value={reple}
              onChange={e => setReple(e.target.value)}
            />
            <button onClick={e => submitHandler(e)}>댓글 등록</button>
          </form>
          <div className="cancel">
            <button
              onClick={e => {
                e.preventDefault();
                setEditFlag(false);
              }}
            >
              취소
            </button>
          </div>
        </RepleUploadDiv>
      ) : (
        <p>{props.reple.reple}</p>
      )}
    </RepleContentDiv>
  );
}

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = event => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
export default RepleContent;
