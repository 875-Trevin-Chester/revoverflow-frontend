import React from 'react';
import { LoginComponent } from '../../components/pages/login.component/login.component';
import { mount } from 'enzyme';


describe('feed-container.component', () => {

    test('should render', () => {
        
        const wrapper = mount(<LoginComponent />);
        expect(wrapper).toBeDefined();
    })
});
