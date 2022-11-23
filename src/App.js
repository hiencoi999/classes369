import 'antd/dist/antd.min.css';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AwsAuthenticator from './components/authentication/authentication';
import WeatherChart from './components/chart/chart';
import ClassManagement from './components/class/class';
import Forum from './components/forum/forum';
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
          <Route path="/home" element={<WeatherChart />} />
          <Route path="/personal-information" element={<PersonalInformation />} />
          <Route path="/class" element={<ClassManagement />} />
          <Route path="/forum" element={<Forum />} />
        </Route>
        <Route path="/auth" element={<AwsAuthenticator />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
