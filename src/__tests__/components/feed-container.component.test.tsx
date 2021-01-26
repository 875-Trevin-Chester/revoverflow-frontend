import React from 'react';
import { FeedContainerComponent, FeedContainerComponentProps } from '../../components/pages/feed-components/feed-container.component';
import { mount } from 'enzyme';


describe('feed-container.component', () => {

    test('should render', () => {
        const props: FeedContainerComponentProps = {
            storeQuestions: [],
            storeTab: 0,
            storePage: 0,
            storePageCount: 0,
            clickTab: () => { }
        }
        const wrapper = mount(<FeedContainerComponent {...props} />);
        expect(wrapper).toBeDefined();
    })
});
