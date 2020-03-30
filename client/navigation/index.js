import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../containers/home.container'
import Users from '../containers/users.container'
import UsersForm from '../containers/usersForm.container'
import About from '../containers/about.container'
import PageNotFound from '../containers/notFound.controller';

const Navigation = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/users/:id" component={UsersForm} />
        <Route path="/users" component={Users} />
        <Route component={PageNotFound} />
    </Switch>
);

export default Navigation;
