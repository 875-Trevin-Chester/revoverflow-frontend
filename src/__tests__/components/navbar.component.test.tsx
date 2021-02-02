import React from 'react';
import { NavbarComponent } from '../../components/navbar.component';
import { mount } from 'enzyme';


describe('navbar.component.tsx', () => {

    test('should render', () => {

        const wrapper = mount(<NavbarComponent />);
        expect(wrapper).toBeDefined();
    })
});
