import React from 'react';
import { Link } from 'react-router-dom';
import { ListDiv, ListItem } from '../../Style/ListCSS';
import Avartar from 'react-avatar';
import moment from 'moment';
import 'moment/locale/ko';

function List({ postList }) {
  const setTime = (a, b) => {
    if (a !== b) {
      return moment(b).format('YYYY년 MMMM Do, hh:mm') + '(수정됨)';
    } else {
      return moment(a).format('YYYY년 MMMM Do, hh:mm');
    }
  };

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
                    src={`http://localhost:4000/${el.author.photoURL}`}
                    style={{ border: '1px solid #c6c6c6' }}
                  />
                  <p> {el.author.displayName}</p>
                </div>
                <p className="time"> {setTime(el.createdAt, el.updatedAt)}</p>
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
