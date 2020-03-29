import React, { useState, useEffect }  from 'react';
import OrdersApi from '../api/orders.api'
import FieldInput from '../components/common/FieldInput';
import SelectInput from '../components/common/SelectInput';
import LineInputs from '../components/ordersForm/lineInputs.component';
import Layout from '../components/layout/layout.component';
import CONSTANTS from '../config/constants';
import { withRouter } from 'react-router-dom';


const OrdersForm = ({ history, match: { params }}) => {

    const [order, setOrder] = useState({});
    const [submitting, submit] = useState(false);
    const [error, setError] = useState(null);
   

    useEffect(() => {
        const id = parseInt(params.id);
        OrdersApi.getOrder(id)
            .then(o => {
                setOrder(o)
            })
            .catch(e => {
                console.error(e);
            });
            
        return () => {
            // Here it's important to clean the connections to api, to avoid memory leaks. But I am using a timeout as a mackup, I preferred not to dirty the code
            console.log("cleaned up");
        }
    }, [params.id]);

    const handleCancel = (e) => {
        history.push('/orders');
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setOrder({ ...order, [name]: value })
    };

    const handleInputChangeLine = line => {
        // In this case.. maybe it's better to use other solution. Normally I'm use redux with saga to split this actions
        let newOrder = Object.assign({}, order);
        const lineIndex = newOrder.lines.findIndex(a => a.itemSKU === line.itemSKU);
        newOrder.lines[lineIndex] = line;
        setOrder(newOrder);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submit(true);
        OrdersApi.saveOrder(order).then(o => {
            history.push('/orders');
        }).catch(e => {
            setError(e);
            submit(false);
        });
    };

    if(Object.keys(order).length === 0){
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-grow text-danger" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <Layout>
            <section className="container">
                <h1>Order ID: {order.id}</h1>
                {error &&
                    <div className="alert alert-warning" role="alert">
                        Error: {error}
                    </div>
                }
                <form onSubmit={handleSubmit}>
                    <FieldInput
                        input={{value:order.shippingAddress, disabled: submitting, required: true, maxLength: 200}}
                        onChange={handleInputChange}
                        type={'text'}
                        name={'shippingAddress'}
                        label={'Shipping address*'}
                        placeholder={''}
                    />
                    <FieldInput
                        input={{value:order.billingAddress, disabled: submitting, maxLength: 200}}
                        onChange={handleInputChange}
                        type={'text'}
                        name={'billingAddress'}
                        label={'Billing address'}
                        placeholder={''}
                    />
                    <SelectInput
                        input={{value:order.status, disabled: submitting}}
                        onChange={handleInputChange}
                        name={'status'}
                        label={'Status'}
                        options={CONSTANTS.status}
                    />

                    <h3>Lines</h3>
                    {order.lines.map(((l, i) => (
                        <LineInputs
                            line={l}
                            submitting={submitting}
                            key={i}
                            handleChange={handleInputChangeLine}
                        />
                    )))}

                    <div>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="btn btn-primary"
                        >
                            <i className="fa fa-paper-plane-o" aria-hidden="true" /> Submit
                        </button>
                        <button
                            type="button"
                            disabled={submitting}
                            className="btn btn-default btn-space"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>

                </form>
            </section>
        </Layout>
    );
};

export default withRouter(OrdersForm);
