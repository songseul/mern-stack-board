import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, clearUser } from './Reducer/userSlice';
import firebase from './firebase';
import List from './Component/Post/List';
import Heading from './Component/Heading';
import Upload from './Component/Post/Upload';
import Detail from './Component/Post/Detail';
import Edit from './Component/Post/Edit';
import Login from './Component/User/Login';
import Register from './Component/User/Register';
function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
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
        <Route path="/" element={<List />} />
        <Route
          path="/upload"
          element={
            <Upload contentList={contentList} setContentList={setContentList} />
          }
        />
        <Route path="/post/:postNum" element={<Detail />} />
        <Route path="/edit/:postNum" element={<Edit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
