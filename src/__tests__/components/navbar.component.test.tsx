import React from 'react';
import { NavbarComponent } from '../../components/navbar.component';
import { mount } from 'enzyme';


describe('feed-container.component', () => {

    test('should render', () => {
        
        const wrapper = mount(<NavbarComponent  />);
        expect(wrapper).toBeDefined();
    })
});
