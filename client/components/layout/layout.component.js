import React from 'react';
import Header from './header.component';
const Layout = ({children}) => (
    <>
        <Header />
        {children}
    </>
);
export default Layout;
