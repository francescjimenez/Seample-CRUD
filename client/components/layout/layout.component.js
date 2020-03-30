import React from 'react';
import Header from './header.component';
const Layout = ({children, loading}) => (
    <>
        <Header />
        {loading && 
            <div className="d-flex justify-content-center">
                <div className="spinner-grow text-danger" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        }
        {!loading && children}
    </>
);
export default Layout;
