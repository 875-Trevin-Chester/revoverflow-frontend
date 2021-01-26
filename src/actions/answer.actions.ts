import { Dispatch } from 'react';
import { Action } from 'redux';
import { Answer } from '../models/answer';

/**
 * @file answer actions to be dispatched by events relating to answers
 * @author Evan Liebhauser
 */

export const answerActionTypes = {
    POST_ANSWER: 'POST_ANSWER',
    ACCEPT_ANSWER: "ACCEPT_ANSWER"
}

export interface AnswerActionPayload {
    payload: {
        answer: Answer
    }
}

export interface AcceptedAnswerActionPayload {
    payload: {
        answer: Answer,
        accepted: boolean
    }
}

export const postAnswer = (answer: Answer) => (dispatch: Dispatch<AnswerActionPayload & Action>) => {
    dispatch({
        type: answerActionTypes.POST_ANSWER,
        payload: {
            answer
        }
    });
}

export const acceptAnswer = (answer: Answer, accepted: boolean) => (dispatch: Dispatch<AcceptedAnswerActionPayload & Action>) => {
    dispatch({
        type: answerActionTypes.ACCEPT_ANSWER,
        payload: {
            answer,
            accepted
        }
    });
}