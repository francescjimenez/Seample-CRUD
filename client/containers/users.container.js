import React, { useState, useEffect }  from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { withRouter } from 'react-router-dom';
import { ApiUsers } from '../api/';
import Layout from '../components/layout/layout.component';

const Users = ({ history }) => {

    const options = {
        noDataText: 'Not users'
    };

    const [users, loadUsers] = useState([]);

    useEffect(() => {
        ApiUsers.getUsers().then(o => { loadUsers(o.data); });

        return () => {
            // Here it is important to clean the connections to api, to avoid memory leaks. I preferred not to dirty the code
            console.log("cleaned up");
        }

    }, []);

    const capitalizedFormatter = (cell) => (cell) ? cell[0].toUpperCase() + cell.slice(1) : '---';
    
    const actionFormatter = (cell, row) => {
        return (
            <div className="btn-group float-right btn-group-sm" role="group" aria-label="Actions">
                <button className="btn btn-danger" onClick={() => deleteUser(row._id, row.first_name)}>
                    Delete
                </button>
                <button className="btn btn-success" onClick={() => editUser(row._id)}>
                    Edit
                </button>
            </div>
        );
    }

    const newUser = () => {
        history.push('/users/new');
    };

    const editUser = (id) => {
        history.push('/users/'+id);
    };

    const deleteUser = (id, name) => {
        var r = window.confirm("Are you sure to remove the user: " + name + "?");
        if (r === true) {
            ApiUsers.deleteUsers(id).then(o => { 
                const newUsers = users.filter(o => o._id !== id);
                loadUsers(newUsers);
            });
        }
    };

    return (
        <Layout>
            <section className="container">
                <button className="btn btn-success float-right" onClick={newUser}>
                    Create
                </button>
            </section>
            <section className="container">
                <h1>Users</h1>
                <BootstrapTable data={users} options={options} condensed hover>
                    <TableHeaderColumn dataField='_id' isKey>User ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='gender' dataFormat={ capitalizedFormatter }>Gender</TableHeaderColumn>
                    <TableHeaderColumn dataField='first_name' dataFormat={ capitalizedFormatter } dataSort>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                    <TableHeaderColumn dataField='phone'>Phone</TableHeaderColumn>
                    <TableHeaderColumn dataFormat={ actionFormatter }>Actions</TableHeaderColumn>
                </BootstrapTable>
            </section>
        </Layout>
    );
};

export default withRouter(Users);
