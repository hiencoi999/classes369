import 'antd/dist/antd.min.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AwsAuthenticator from './components/authentication/authentication';
import Homepage from './components/homepage/homepage';
import Notification from './components/notification/notification';
import PageNotFound from './components/pageNotFound/pageNotFound';
import PersonalInformation from './components/personalInformation/personalInformation';
import PrivateRoute from './utils/private-route';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }>
          <Route path="/notification" element={<Notification />} />
          <Route path="/personal-information" element={<PersonalInformation />} />
        </Route>
        <Route path="/auth" element={<AwsAuthenticator />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
