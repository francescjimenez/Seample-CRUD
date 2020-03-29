const delay = 0;
const orders = [{
    id: 1,
    shippingAddress: "Barcelona, Valencia 135, 3-2",
    billingAddress: "",
    status: 1,
    lines: [
        {
            name: 'Product 1',
            itemSKU: 'KS944RUR',
            price: 53,
            quantity: 1
        },
        {
            name: 'Product ',
            itemSKU: 'KS943RUR',
            price: 13,
            quantity: 5
        },
        {
            name: 'Product XX',
            itemSKU: 'BONOESUR',
            price: -50,
            quantity: 1
        },
        {
            name: 'Product asd',
            itemSKU: 'KC944RUR',
            price: 15,
            quantity: 1
        },
    ]
}, {
    id: 2,
    shippingAddress: "Product1",
    billingAddress: "",
    status: 2,
    lines: [
        {
            name: 'Product asd',
            itemSKU: 'KS944RUR',
            price: 50,
            quantity: 2
        }
    ]
}];



class OrdersApi {
    static getorders() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Object.assign([], orders));
            }, delay);
        });
    }

    static getOrder(orderId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const existingOrdersIndex = orders.findIndex(order => order.id === orderId);
                console.log(existingOrdersIndex);
                if(existingOrdersIndex<0){
                    reject('Order not found');
                }else{
                    const orderFound = Object.assign({}, orders[existingOrdersIndex]);
                    resolve(orderFound);
                }

            }, delay);
        });
    }

    static saveOrder(order) {

        order = Object.assign({}, order); // to avoid manipulating object passed in.

        return new Promise((resolve, reject) => {
            setTimeout(() => {

                // Simulate server-side validation (it's only a seample)
                const minShippingAddress = 10;
                if (order.shippingAddress.length < minShippingAddress) {
                    reject(`Shipping Address must be at least ${minShippingAddress} characters.`);
                }

                if (order.id) {
                    const existingOrdereIndex = orders.findIndex(a => a.id === order.id);
                    orders.splice(existingOrdereIndex, 1, order);
                } else {
                    // I could simulate here the new orders, but in the case of orders if there is no way to create them outside the web or other method to devolutions I think isn't necessary.
                    reject('Order not found');
                }

                resolve(order);

            }, delay);
        });
    }

}

export default OrdersApi;
