import React, { useState, useEffect }  from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { withRouter } from 'react-router-dom';
import OrdersApi from '../api/orders.api';
import CONSTANTS from '../config/constants';
import Layout from '../components/layout/layout.component';

const Orders = ({ history }) => {

    const options = {
        onRowClick: function(row){
            history.push('/order/'+row.id);
        },
        noDataText: 'Not orders'
    };

    const [orders, loadOrders] = useState([]);

    useEffect(() => {
        OrdersApi.getorders().then(o => { loadOrders(o) });

        return () => {
            // Here it is important to clean the connections to api, to avoid memory leaks. But I am using a timeout as a mackup, I preferred not to dirty the code
            console.log("cleaned up");
        }

    }, []);

    if(orders.length===0){
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-grow text-danger" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    const priceFormatter = (cell) => {
        let total = 0;
        cell.forEach((o) => {
            total = total + (o.quantity * o.price);
        });
        return `${total} € `;
    };

    const statusFormatter = (cell) => {
        return (CONSTANTS.status[cell]) ? (CONSTANTS.status[cell]) : '- None -';
    };

    const actionFormatter = (cell) => {
        return (
            <button className="btn btn-success">
                Edit
            </button>
        );
    }

    return (
        <Layout>
            <section className="container">
                <h1>Orders</h1>
                <BootstrapTable data={orders} options={options} condensed hover>
                    <TableHeaderColumn dataField='id' isKey dataSort>Order ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='shippingAddress'>Shipping address</TableHeaderColumn>
                    <TableHeaderColumn dataField='lines' dataFormat={ priceFormatter }>Amount</TableHeaderColumn>
                    <TableHeaderColumn dataField='status' dataFormat={ statusFormatter }>Status</TableHeaderColumn>
                    <TableHeaderColumn dataField='status' dataFormat={ actionFormatter }>Action</TableHeaderColumn>
                </BootstrapTable>
            </section>
        </Layout>
    );
};


export default withRouter(Orders);
