import 'antd/dist/antd.min.css';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AwsAuthenticator from './components/authentication/authentication';
import WeatherChart from './components/chart/chart';
import ClassController from './components/class/class';
import InvitedClass from './components/class/invitedClass';
import OwnedClass from './components/class/ownedClass';
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
          <Route path="/class" element={<ClassController />} />
          <Route path="/class/owned" element={<OwnedClass />} />
          <Route path="/class/invited" element={<InvitedClass />} />
          <Route path="/class/owned/:classId" element={<Forum />} />
          <Route path="/class/invited/:classId" element={<Forum />} />
        </Route>
        <Route path="/auth" element={<AwsAuthenticator />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
