import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import Orders from '../orders.container';


describe('Orders.test.js', () => {

    it('renders as expected', () => {
        const wrapper = shallow(<Orders/>);

        expect(wrapper.length).toEqual(1);

        const tree = toJson(wrapper);
        // expect(tree).toMatchSnapshot();
    });
});
