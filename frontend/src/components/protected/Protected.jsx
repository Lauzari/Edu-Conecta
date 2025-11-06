import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { isTokenValid } from '../service/auth/userContext/auth.helpers';
import { useAuth } from '../../hooks/useAuth';
import LoginModal from '../loginModal/LoginModal';

const Protected = () => {
  const { token } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  if (!isTokenValid(token)) {
    return (
      <>
        <LoginModal show={true} handleClose={() => setShowLogin(false)} />
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          Debes iniciar sesión para continuar.
        </div>
      </>
    );
  }

  return <Outlet />;
};

export default Protected;
