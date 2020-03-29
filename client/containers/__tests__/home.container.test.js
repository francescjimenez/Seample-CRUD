import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import Home from '../home.container';


describe('Home.test.js', () => {

    it('renders as expected', () => {
        const wrapper = shallow(<Home/>);

        expect(wrapper.length).toEqual(1);

        const tree = toJson(wrapper);
        // expect(tree).toMatchSnapshot();
    });
});
