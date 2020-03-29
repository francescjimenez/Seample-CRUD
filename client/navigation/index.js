import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../containers/home.container'
import Orders from '../containers/orders.container'
import OrdersForm from '../containers/ordersForm.container'
import About from '../containers/about.container'
import PageNotFound from '../containers/notFound.controller';

const Navigation = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/order/:id" component={OrdersForm} />
        <Route path="/orders" component={Orders} />
        <Route component={PageNotFound} />
    </Switch>
);

export default Navigation;
