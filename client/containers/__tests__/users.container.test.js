import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import Users from '../users.container';


describe('Users.test.js', () => {

    it('renders as expected', () => {
        const wrapper = shallow(<Users/>);

        expect(wrapper.length).toEqual(1);

        const tree = toJson(wrapper);
        // expect(tree).toMatchSnapshot();
    });
});
