import React from 'react';
import Layout from '../components/layout/layout.component';
import PropTypes from 'prop-types';


const PageNotFound = ({location}) => {
    return (
        <Layout>
            <section className="container">
                <div className="jumbotron">
                    <h1 className="display-1">Page not found</h1>
                    <p className="lead">404 Error</p>
                    <p>No match for the link <code>{location.pathname}</code></p>
                </div>
            </section>
        </Layout>
    );
};

// It's deprecated, I know. In my opinion it's better to use a static library like flow or typescript, but we can improve on a babel process
PageNotFound.propTypes = {
    location: PropTypes.object.isRequired
};

export default PageNotFound;
