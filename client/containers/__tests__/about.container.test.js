import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import About from '../about.container';


describe('About.test.js', () => {

    it('renders as expected', () => {
        const wrapper = shallow(<About/>);

        expect(wrapper.length).toEqual(1);

        const tree = toJson(wrapper);
        // expect(tree).toMatchSnapshot();
    });
});
