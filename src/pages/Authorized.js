import React from 'react';
import Redirect from 'umi/redirect';
import Exception403 from '@/pages/Exception/403';
import { getToken } from '@/utils/auth';

function AuthComponent() {
  const isLogin = getToken();
  return <div> {isLogin ? <Exception403 /> : <Redirect to="/user/login" />}</div>;
}
export default AuthComponent;
