import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import logo from './logo.svg';
import { LoginPage } from './components/LoginPage';
import { PostListPage } from './components/PostListPage';

export const Routes = () => {
  
    return (
      <div>
        <Switch>
          <Route exact path="/">
            <LoginPage/>
          </Route>
        </Switch>
      </div>
    );
  };