import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginDiv } from '../../Style/UserCSS';
import firebase from '../../firebase.js';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [flag, setFlag] = useState(false);
  //데이터에 같은 이름이 있는지 axio로 보내는 상태값
  const [nameCheck, setNameCheck] = useState(false);
  //중복된 이름인지 아닌지 유효성 메세지
  const [nameInfo, setNameInfo] = useState('');
  //firebase 를 사용 하는 동안은 app이 멈춰있어야 하기 떄문에
  //async await 을 사용 합니다

  const RegisterHandler = async e => {
    if (!flag) {
      setFlag(false);
    } else {
      setFlag(true);
    }

    e.preventDefault();
    if (!(name && email && password && passwordConfirm)) {
      return alert('모든 사항을 입력하시오');
    }
    if (!email.includes('@')) {
      return alert('이메일 양식을 맞춰 적어 주세요');
    }
    if (password !== passwordConfirm) {
      return alert('비밀번호와 비밀번호 확인 값은 같아야 합니다');
    } else if (password.length < 6) {
      return alert('비밀번호는 최소 6자리 이상 이어야 합니다.');
    }
    if (!nameCheck) {
      return alert('닉네임 중복검사를 진행해 주세요');
    }

    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    await createdUser.user.updateProfile({
      displayName: name,
      photoURL: `https://i.pinimg.com/550x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg`,
    });

    let body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid,
      photoURL: `https://i.pinimg.com/550x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg`,
    };
    axios.post('/api/user/register', body).then(res => {
      setFlag(false);
      if (res.data.success) {
        //회원가입 성공시
        alert('회원가입에 성공 했습니다');
        navigate('/login');
      } else {
        //회원가입 실패시
        alert('회원가입이 실패 했습니다');
      }
    });
  };

  const nameCheckHandler = e => {
    e.preventDefault();
    if (!name) {
      alert('닉네임을 입력해 주세요.');
      nameCheck(true);
    }
    let body = {
      displayName: name,
    };
    axios.post('/api/user/namecheck', body).then(res => {
      if (res.data.success) {
        if (res.data.check) {
          setNameCheck(true);
          setNameInfo('사용가능한 닉네임 입니다.');
        } else {
          setNameInfo('사용불가능한 닉네임입니다.');
        }
      }
    });
  };

  return (
    <LoginDiv>
      <form>
        <label htmlFor=""> 닉네임</label>
        <input
          type="name"
          value={name}
          onChange={e => setName(e.target.value)}
          disabled={nameCheck}
        />
        {nameInfo}
        <button onClick={e => nameCheckHandler(e)}> 닉네임 중복검사 </button>
        <label htmlFor=""> 이메일</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor=""> 비밀번호</label>
        <input
          minLength={6}
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <label htmlFor=""> 비밀번호 확인</label>
        <input
          minLength={6}
          type="password"
          value={passwordConfirm}
          onChange={e => setPasswordConfirm(e.target.value)}
        />
        <button type="submit" onClick={e => RegisterHandler(e)} disabled={flag}>
          회원가입
        </button>
      </form>
    </LoginDiv>
  );
}

export default Register;
