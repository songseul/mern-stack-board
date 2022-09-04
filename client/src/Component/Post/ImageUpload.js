import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function ImageUpload({ setImage }) {
  /*
  1.사용자가 이미지를 업로드
  2.업로드한 이미지는 받아서 서버에 저장 (imagfolder)
  3.저장한 이미지의 경로를 다시 클라이언트에게 전송 
  4.경로를 받아서 post model에 저장 Upload.js-> let body={image:image(state부분),} 추가
  */

  const fileUploadHandler = e => {
    console.log(e.target.files);
    let formData = new FormData();
    formData.append('file', e.target.files[0]);
    axios.post('/api/post/image/upload', formData).then(response => {
      setImage(response.data.filePath);
    });
  };
  return (
    <Form.Control
      type="file"
      accept="image/*"
      onChange={e => fileUploadHandler(e)}
    />
  );
}
export default ImageUpload;
