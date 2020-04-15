import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './privateRoute';

import FirstSignup from '../pages/FirstSignup';
import SecondSignup from '../pages/SecondSignup';
import Home from '../pages/Home';
import NeedHelpForm from '../pages/NeedHelpForm';
import NeedHelpOptions from '../pages/NeedHelpOptions';
import CanHelpOptions from '../pages/CanHelpOptions';
import Friends from '../pages/Friends/FriendsList';
import HelpOrGetHelp from '../pages/Friends/FirstAcess';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import NeedHelpLoadingMatch from '../pages/NeedHelpLoadingMatch';
import CanHelpLoadingMatch from '../pages/CanHelpLoadingMatch';

export default function Routes() {
  return (
    <Switch>
      <Suspense fallback={<div>Loading...</div>}>
        <Route exact path='/'>
          <Home></Home>
        </Route>
        <PrivateRoute path='/can-help-options'>
          <CanHelpOptions></CanHelpOptions>
        </PrivateRoute>
        <Route exact path='/first-signup'>
          <FirstSignup></FirstSignup>
        </Route>
        <PrivateRoute exact path='/friends'>
          <Friends></Friends>
        </PrivateRoute>
        <PrivateRoute exact path='/help-or-get-help'>
          <HelpOrGetHelp></HelpOrGetHelp>
        </PrivateRoute>
        <Route exact path='/login'>
          <Login></Login>
        </Route>
        <PrivateRoute exact path='/need-help-form'>
          <NeedHelpForm></NeedHelpForm>
        </PrivateRoute>
        <PrivateRoute exact path='/need-help-options'>
          <NeedHelpOptions></NeedHelpOptions>
        </PrivateRoute>
        <PrivateRoute exact path='/profile'>
          <Profile></Profile>
        </PrivateRoute>
        <Route exact path='/second-signup'>
          <SecondSignup></SecondSignup>
        </Route>
        <Route exact path='/need-help-matching'>
          <NeedHelpLoadingMatch></NeedHelpLoadingMatch>
        </Route>
        <Route exact path='/can-help-matching'>
          <CanHelpLoadingMatch></CanHelpLoadingMatch>
        </Route>
      </Suspense>
    </Switch>
  );
}
