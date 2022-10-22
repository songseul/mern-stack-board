import React, { useState, useEffect } from 'react';
import { LoginDiv } from '../../Style/UserCSS';
import { useNavigate } from 'react-router-dom';
import firebase from '../../firebase';
import { useSelector } from 'react-redux';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const user = useSelector(state => state.user);

  const SignHandler = async e => {
    e.preventDefault();
    if (!(email && password)) {
      return alert('모든 항목을 채워 주세요');
    }
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      localStorage.setItem('accessToken', user.accessToken);
      navigate('/');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setErrMessage('존재하지 않는 이메일 입니다');
      } else if (err.code === 'auth/wrong.password') {
        setErrMessage('비밀번호가 일치 하지 않습니다');
      } else {
        setErrMessage('로그인이 실패 하였습니다');
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrMessage('');
    }, 5000);
  }, [errMessage]);
  return (
    <LoginDiv>
      <form>
        <label> 이메일 </label>
        <input
          type="email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
        <label> 패스워드 </label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {errMessage !== '' && <p>{errMessage}</p>}
        <button
          onClick={e => {
            SignHandler(e);
          }}
        >
          로그인
        </button>
        <button
          onClick={e => {
            e.preventDefault();
            navigate('/register');
          }}
        >
          회원가입
        </button>
      </form>
    </LoginDiv>
  );
}

export default Login;
