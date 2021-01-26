import { AnswerState } from '.';
import { AnswerActionPayload, answerActionTypes, AcceptedAnswerActionPayload } from '../actions/answer.actions';
import { Action } from 'redux';

/**
 * @file answer reducer defines logic applied when answer actions are dispatched
 * @author Evan Liebhauser
 */

const initialState: AnswerState = {
    collectedAnswers: JSON.parse((localStorage.getItem('answers')) || '{}'),
    storeAnswer: JSON.parse((localStorage.getItem('selectedAnswer')) || '{}'),
    accepted: false,
}

export const answerReducer = (state: AnswerState = initialState,
    action: AcceptedAnswerActionPayload & AnswerActionPayload & Action) => {

    switch (action.type) {
        case answerActionTypes.POST_ANSWER: {
            let answerArray = state.collectedAnswers;
            answerArray = [...answerArray, action.payload.answer]
                .sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime());
            return {
                ...state,
                collectedAnswers: answerArray
            }
        }
        case answerActionTypes.ACCEPT_ANSWER: {
            return {
                ...state,
                storeAnswer: action.payload.answer,
                accepted: action.payload.accepted
            }
        }
        default: {
            return state;
        }
    }
}