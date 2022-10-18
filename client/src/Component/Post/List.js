import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ListDiv, ListItem } from '../../Style/ListCSS';
//axios 라이브러리 다운
function List() {
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    axios
      .post('/api/post/list')
      .then(res => {
        const list = res.data.postList;
        if (res.data.success) {
          setPostList([...list]);
        }
      })
      .catch(err => {
        alert(`서버의 에러를 확인해 주세요 ${err}`);
      });
  }, []);
  return (
    <ListDiv>
      {postList.map((el, idx) => {
        return (
          <Link to={`/post/${el.postNum}`}>
            <ListItem key={idx}>
              <p className="title"> {el.title}</p>
              <p> {el.author.displayName}</p>
              <p>{el.content}</p>
            </ListItem>
          </Link>
        );
      })}
    </ListDiv>
  );
}

export default List;
