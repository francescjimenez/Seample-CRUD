import React, { useState, useEffect }  from 'react';
import { ApiUsers } from '../api/';
import { FieldInput, SelectInput } from '../components/form';
import Layout from '../components/layout/layout.component';
import CONSTANTS from '../config/constants';
import { withRouter } from 'react-router-dom';


const UsersForm = ({ history, match: { params }}) => {

    const [user, setUser] = useState({});
    const [submitting, submit] = useState(false);
    const [loading, load] = useState(false);
    const [error, setError] = useState(null);
   
    useEffect(() => {
        if(params.id!=='new'){
            load(true);
            ApiUsers.getUsers(params.id)
            .then(o => {
                load(false);
                setUser(o.data)
            })
            .catch(e => {
                console.error(e);
            });
        }
            
        return () => {
            // Here it is important to clean the connections to api, to avoid memory leaks. I preferred not to dirty the code
            console.log("cleaned up");
        }
    }, [params.id]);

    const handleCancel = (e) => {
        history.push('/users');
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submit(true);
        ApiUsers.submitUsers(user).then(o => {
            history.push('/users');
        }).catch(e => {
            setError(e);
            submit(false);
        });
    };

    const formTitle = (params.id === 'new') ? 'New user': `User: ${user.first_name}`;

    return (
        <Layout loading={loading}>
            <section className="container">
                <h1>{formTitle}</h1>
                {error &&
                    <div className="alert alert-warning" role="alert">
                        Error: {error}
                    </div>
                }
                <form onSubmit={handleSubmit}>
                    <SelectInput
                        input={{value:user.gender, disabled: submitting}}
                        onChange={handleInputChange}
                        name={'gender'}
                        label={'Gender'}
                        options={CONSTANTS.genders}
                    />
                    <FieldInput
                        input={{value:user.first_name, disabled: submitting, required: true, maxLength: 120}}
                        onChange={handleInputChange}
                        type={'text'}
                        name={'first_name'}
                        label={'First name*'}
                        placeholder={''}
                    />
                    <FieldInput
                        input={{value:user.last_name, disabled: submitting, required: true, maxLength: 120}}
                        onChange={handleInputChange}
                        type={'text'}
                        name={'last_name'}
                        label={'Last name*'}
                        placeholder={''}
                    />
                    <FieldInput
                        input={{value:user.email, disabled: submitting, required: true, maxLength: 120}}
                        onChange={handleInputChange}
                        type={'email'}
                        name={'email'}
                        label={'Email*'}
                        placeholder={''}
                    />
                    <FieldInput
                        input={{value:user.phone, disabled: submitting, required: false, maxLength: 25}}
                        onChange={handleInputChange}
                        type={'tel'}
                        name={'phone'}
                        label={'Phone'}
                        placeholder={''}
                    />
                    <div className="float-right">
                        <button
                            type="button"
                            disabled={submitting}
                            className="btn btn-default btn-space"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="btn btn-success"
                        >
                            <i className="fa fa-paper-plane-o" aria-hidden="true" /> Submit
                        </button>
                    </div>

                </form>
            </section>
        </Layout>
    );
};

export default withRouter(UsersForm);
