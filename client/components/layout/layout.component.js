import React from 'react';
import Header from './header.component';
import Loading from '../loading/loading.component';

const Layout = ({children, loading}) => (
    <>
        <Header />
        {(loading) ? <Loading /> : children }
    </>
);
export default Layout;
