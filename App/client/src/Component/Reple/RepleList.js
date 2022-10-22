import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RepleContent from './RepleContent';
import { RepleListDiv } from '../../Style/RepleCSS.js';

function RepleList(props) {
  const [repleList, setRepleList] = useState([]);

  useEffect(() => {
    let body = {
      postId: props.postId,
    };
    axios.post('/api/reple/getReple', body).then(res => {
      if (res.data.success) {
        setRepleList([...res.data.repleList]);
      }
    });
  }, []);

  return (
    <RepleListDiv>
      {repleList.map((reple, idx) => {
        return <RepleContent key={idx} reple={reple} />;
      })}
    </RepleListDiv>
  );
}

export default RepleList;
