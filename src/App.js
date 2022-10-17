import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Header from './components/Header';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Chat from './components/Chat';

// Used for login functionality
import {useAuthState} from "react-firebase-hooks/auth"
import { auth } from './firebase';
import Login from './Login';

import Spinner from 'react-spinkit';

function App() {

  // useAuthState hook from firebase
  const [user, loading] = useAuthState(auth);

  if(loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg" alt="" />
          {/* search react-spinkit in google and install 'npm i react-spinkit' link:https://www.npmjs.com/package/react-spinkit, */}
          <Spinner 
            name='ball-spin-fade-loader' 
            color="purple"
            fadeIn="none"
          />
        </AppLoadingContents>
      </AppLoading>
    )
  }

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login /> 
        ) : (
          <>
            <Header />
            <AppBody>
              <Sidebar />
              <Routes>
                <Route path="/" exact element={ <Chat /> }   />
              </Routes>
            </AppBody>
          </>
        ) }
      </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  >img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;

// If u want to sign in other account
//  then type 'firebase login:add rahul9449766@gmail.com'
// then type 'firebase logout' Logout all the account,  then 'firebase login'
// Allow Firebase to collect CLI and Emulator Suite usage and error reporting information? 'Yes'
// Then type 'firebase login'


// FIREBASE DEPLOY command
// Note: Click  '+down' symbol on termial to right side. In that select 'command prompt'. Then run these codes.

// 1. firebase login
// 2. firebase init
//      In this click --> Hosting: Configure and deploy Firebase Hosting sites  --> Press SPACE BAR then Enter.
// 3. After this click --> Use an Existing Project
//     select your project name: linkedin-clone-yt
// 4. what do you want as use as your public direactory: --> type 'build' press enter and type 'Y' (y/n) 
// 5. setup automatic builds and deploy with Github? (y/N) --> Press 'N' for now
//     After this u recv  'Firebase Initialization complete'
// 6.npm run build

// 7. At last.. firebase deploy