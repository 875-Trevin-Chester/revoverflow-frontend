import React from 'react';
import App from '../App';
import { shallow } from 'enzyme';

describe('App.tsx', () => {
    test('should render', () => {
        const wrapper = shallow(<App />);
        expect(wrapper).toBeDefined();
    });
})
