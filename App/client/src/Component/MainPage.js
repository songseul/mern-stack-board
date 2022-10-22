import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from './Post/List';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { GNBDiv, FooterDiv } from '../Style/MainPageCSS.js';
import { BiSearch } from 'react-icons/bi';

function MainPage() {
  const [postList, setPostList] = useState([]);
  const [sort, setSort] = useState('최신순');
  const [searchTerm, setSearchTerm] = useState('');
  const [skip, setSkip] = useState(0);
  const [loadMore, setLoadMore] = useState(true);

  // 디폴트 일때
  const getPostLoadMore = () => {
    let body = {
      sort,
      searchTerm,
      skip,
    };
    axios
      .post('/api/post/list', body)
      .then(res => {
        const list = res.data.postList;
        if (res.data.success) {
          setPostList([...postList, ...list]);
          setSkip(skip + list.length);
          //[0] ~[4] : 5 skip
          //[5] ~[9]
          //[10] ~[14] : 10skip
          if (list.length < 5) {
            setLoadMore(false);
          }
        }
      })
      .catch(err => {
        alert(`서버의 에러를 확인해 주세요 ${err}`);
      });
  };

  // 인기순 최신순 검색
  const getPostList = () => {
    setSkip(0);
    let body = {
      sort,
      searchTerm,
      skip: 0,
    };
    axios
      .post('/api/post/list', body)
      .then(res => {
        const list = res.data.postList;
        if (res.data.success) {
          setPostList([...list]);
          setSkip(list.length);
          //[0] ~[4] : 5 skip
          //[5] ~[9]
          //[10] ~[14] : 10skip
          if (list.length < 5) {
            setLoadMore(false);
          }
        }
      })
      .catch(err => {
        alert(`서버의 에러를 확인해 주세요 ${err}`);
      });
  };

  useEffect(() => {
    getPostList();
  }, [sort]);

  const SearchHandler = () => {
    // 검색창 비워도 취소 안되는 법
    // if (searchTerm === '') {
    //   return;
    // }

    // 인풋이 빈값이면 검색 취소
    getPostList();
  };

  return (
    <div>
      <GNBDiv>
        <div className="search">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={e => {
              if (e.keyCode === 13) SearchHandler();
            }}
          />
          <button
            onClick={() => {
              SearchHandler();
            }}
          >
            <BiSearch className="bi bi-search" />
          </button>
        </div>

        <DropdownButton
          variant="outline-secondary"
          title={sort}
          id="input-group-dropdown-1"
        >
          <Dropdown.Item onClick={() => setSort('최신순')}>
            최신순
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSort('인기순')}>
            인기순
          </Dropdown.Item>
        </DropdownButton>
      </GNBDiv>
      <List postList={postList} />

      {/* 무한 스크롤 버튼 구현 */}
      {loadMore && (
        <FooterDiv>
          <button
            style={{ marginBottom: '10vh' }}
            onClick={() => getPostLoadMore()}
          >
            더 불러오기
          </button>
        </FooterDiv>
      )}
    </div>
  );
}

export default MainPage;
