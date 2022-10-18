import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Detail from './Detail';
import { Spinner } from 'react-bootstrap';
import { SpinnerDiv } from '../../Style/DetailListCSS';
import RepleArea from '../Reple/RepleArea';

function PostArea() {
  const [postInfo, setPostInfo] = useState({});
  const [flag, setFlag] = useState(false);

  let params = useParams();
  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };
    axios
      .post('/api/post/detail', body)
      .then(response => {
        if (response.data.success) {
          setPostInfo(response.data.postDetail);
          setFlag(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {flag ? (
        <div>
          <Detail postInfo={postInfo} />
          <RepleArea postId={postInfo._id} />
        </div>
      ) : (
        <SpinnerDiv>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </SpinnerDiv>
      )}
    </div>
  );
}

export default PostArea;
