import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import firebase from '../firebase.js';
function Heading() {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const LogoutHandler = () => {
    firebase.auth().signOut();
    localStorage.clear();
    navigate('/');
  };
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">React-Community</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/upload">Upload</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {localStorage.accessToken ? (
            <>
              <Navbar.Text
                style={{
                  cursor: 'pointer',
                  marginRight: '10px',
                }}
              >
                <Link
                  to="/mypage"
                  style={{
                    color: '#aaa',
                    textDecoration: 'none',
                    marginRight: '10px',
                  }}
                >
                  MyPage{' '}
                </Link>{' '}
                <br />
              </Navbar.Text>
              <Navbar.Text
                style={{ cursor: 'pointer' }}
                onClick={() => LogoutHandler()}
              >
                Logout
              </Navbar.Text>
            </>
          ) : (
            <Link
              to="/login"
              style={{
                color: '#ddd',
                textDecoration: 'none',
              }}
            >
              Login
            </Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Heading;
