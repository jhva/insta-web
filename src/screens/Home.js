import React from 'react';
import { isLoggedInVar, logOutUserIn } from '../apollo';

function Home() {
  return (
    <div>
      <h1>어서와라 시벌~</h1>
      <button onClick={() => logOutUserIn()}>Log out now!</button>
    </div>
  );
}
export default Home;
