import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import LoginOrSignup from './components/LoginOrSignup';
import ErrorList from './components/ErrorList';
import ErrorCard from './components/ErrorCard';
import UserList from './components/UserList';
import UserProfile from './components/UserProfile';
import AuthorizedRoute from './components/AuthorizedRoute';

export default () => (
  <Layout>
    <AuthorizedRoute exact path='/users' component={UserList}></AuthorizedRoute>
    <Route exact path='/' component={Home} />
    <Route path='/login-or-signup' component={LoginOrSignup}/>
    <Route path='/list' component={ErrorList}></Route>
    <Route path='/error-card/:id?' component={ErrorCard}></Route>
    <Route path='/user/:id' component={UserProfile}></Route>
  </Layout>
);
