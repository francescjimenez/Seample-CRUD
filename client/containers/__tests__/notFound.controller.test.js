import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import PageNotFound from '../notFound.controller';


let props = undefined;

beforeAll(() => {
    props = { location:{pathName: '/locationTest'}};
    return props;
});


describe('PageNotFound.test.js', () => {
    let wrapper = undefined;

    beforeEach(() => {
        wrapper = shallow(<PageNotFound {...props}/>);
        return wrapper;
    });

    it('renders without crashing', () => {
        expect(wrapper.length).toEqual(1);
    });


    it('renders as expected', () => {
        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });


});
