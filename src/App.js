import 'antd/dist/antd.min.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AwsAuthenticator from './components/authentication/authentication';
import Homepage from './components/homepage/homepage';
import PageNotFound from './components/pageNotFound/pageNotFound';
import PrivateRoute from './utils/private-route';

export default function App() {
  // return (
  //   <>
  {
    /* {
        <video autoPlay muted loop id="myVideo">
          <source src={videoBackground} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      } */
  }
  // </>
  // );
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        />
        <Route path="/auth" element={<AwsAuthenticator />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
