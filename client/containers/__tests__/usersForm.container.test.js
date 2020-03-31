import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import UsersForm from '../usersForm.container';


describe('usersForm.test.js', () => {

    it('renders as expected', () => {
        const wrapper = shallow(<UsersForm match={{params: {id: 1}}}/>);

        expect(wrapper.length).toEqual(1);

        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();

    });
});
