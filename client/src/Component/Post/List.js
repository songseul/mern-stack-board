import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ListDiv, ListItem } from '../../Style/ListCSS';
import Avartar from 'react-avatar';

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
              <div className="author">
                <div>
                  <Avartar
                    round={true}
                    size="40"
                    src={el.author.photoURL}
                    style={{ border: '1px solid #c6c6c6' }}
                  />
                  <p> {el.author.displayName}</p>
                </div>
                <p className="time"> {} </p>
              </div>
              <p>{el.content}</p>
            </ListItem>
          </Link>
        );
      })}
    </ListDiv>
  );
}

export default List;
