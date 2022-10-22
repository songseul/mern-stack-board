import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearUser } from './Reducer/userSlice';
import firebase from './firebase';
import MainPage from './Component/MainPage';
import Heading from './Component/Heading';
import Upload from './Component/Post/Upload';
import PostArea from './Component/Post/PostArea';
import Edit from './Component/Post/Edit';
import Login from './Component/User/Login';
import Register from './Component/User/Register';
import MyPage from './Component/User/MyPage';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
      console.log(userInfo);
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        dispatch(clearUser());
      }
    });
  }, []);

  // 자식 컴포넌트 들이 공통으로 공유되는 state를 props로 넘기면 된다
  //(상태 동일하게 저장됨)
  const [contentList, setContentList] = useState([]);

  return (
    <div>
      <Heading />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/upload"
          element={
            <Upload contentList={contentList} setContentList={setContentList} />
          }
        />
        <Route path="/post/:postNum" element={<PostArea />} />
        <Route path="/edit/:postNum" element={<Edit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;
