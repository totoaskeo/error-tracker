import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import LoginOrSignup from './components/LoginOrSignup';
import ErrorList from './components/ErrorList';
import ErrorCard from './components/ErrorCard';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    <Route path='/login-or-signup' component={LoginOrSignup}/>
    <Route path='/list' component={ErrorList}></Route>
    <Route path='/error-card/:id' component={ErrorCard}></Route>
  </Layout>
);
