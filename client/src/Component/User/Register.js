import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginDiv from '../../Style/UserCSS';
import firebase from '../../firebase';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [flag, setFlag] = useState(false);
  //firebase 를 사용 하는 동안은 app이 멈춰있어야 하기 떄문에
  //async await 을 사용 합니다

  const RegisterHandler = async e => {
    setFlag(true);
    e.preventDefault();
    if (!(name && email && password && passwordConfirm)) {
      return alert('모든 사항을 입력하시오');
    }

    if (password !== passwordConfirm) {
      return alert('비밀번호와 비밀번호 확인 값은 같아야 합니다');
    } else if (password.length < 6) {
      return alert('비밀번호는 최소 6자리 이상 이어야 합니다.');
    }

    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    await createdUser.user.updateProfile({ displayName: name });

    console.log(createdUser.user);

    let body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid,
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

  return (
    <LoginDiv>
      <form>
        <label htmlFor=""> 이름</label>
        <input
          type="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
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
        <button type="submit" onClick={RegisterHandler} disabled={flag}>
          회원가입
        </button>
      </form>
    </LoginDiv>
  );
}

export default Register;
