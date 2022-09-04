import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import List from './Component/Post/List';
import Heading from './Component/Heading';
import Upload from './Component/Post/Upload';
import Detail from './Component/Post/Detail';
import Edit from './Component/Post/Edit';
function App() {
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
      </Routes>
    </div>
  );
}

export default App;
