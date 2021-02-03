import React from 'react';
import { AnswerRichTextEditorComponent, AnswerRichTextEditorComponentProps } from '../../components/pages/forum-components/rich-text-editor-component/answer-draftjs';
import { mount } from 'enzyme';


describe('forum.components --> rich-text-editor-component --> AnswerRichTextEditorComponentProps', () => {

    test('should render', () => {
        const props: AnswerRichTextEditorComponentProps = {
            answerFields: false,
            setAnswerFields: () => { }
        }
        const wrapper = mount(<AnswerRichTextEditorComponent {...props} />);
        expect(wrapper).toBeDefined();
    })
});

