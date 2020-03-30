const delay = 0;

const users = [];

class UsersApi {
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

export default UsersApi;
