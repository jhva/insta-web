import React from 'react';
import { useHistory } from 'react-router-dom';
import { isLoggedInVar, logOutUserIn } from '../apollo';

function Home() {
  const history = useHistory();
  return (
    <div>
      <h1>어서와라 시벌~</h1>
      <button onClick={() => logOutUserIn()}>Log out now!</button>
    </div>
  );
}
export default Home;
