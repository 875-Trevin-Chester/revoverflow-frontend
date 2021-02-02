import React from 'react';
import { mount } from 'enzyme';
import { ForumQuestionComponent, ForumQuestionComponentProps } from '../../components/pages/forum-components/forum-question.component';
import {Question} from "../../models/question";

describe("forum-question.component.tsx", () => {
     it('should render without crashing', () => {

    //     const testQ: Question = {
    //         id: 1,
    //         acceptedId:  1,
    //         title: "Question",
    //         content: "content",
    //         creationDate: new Date(),
    //         editDate: new Date(),
    //         status: true,
    //         userID: 13,
    //         location: null,
    //         questionType: 'type',
    //         isFaq: false
    //     }

    //     const props: ForumQuestionComponentProps = {
    //         storeQuestion: testQ,
    //         storeAnswer: {},
    //         storeConfirm: {},
    //         clickQuestion: () => { },
    //         clickConfirm: () => { },
    //     }

    //     const wrapper = mount(<ForumQuestionComponent {...props} />);
    //     expect(wrapper).toBeDefined();

     })
})