/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginDataContext } from '../../contexts/LoginData';
const ProtectedRoute = (props) => {
  const { emailId } = React.useContext(LoginDataContext);

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    const userToken = localStorage.getItem('jwtToken');
    if (!emailId || !userToken) {
      setIsLoggedIn(false);
      return navigate('/login');
    }
    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkUserToken();
  }, []);
  return (
    <React.Fragment>
      {isLoggedIn && emailId ? props.children : null}
    </React.Fragment>
  );
};
export default ProtectedRoute;
