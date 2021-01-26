import { Dispatch } from 'react';
import { Action } from 'redux';
import { Question } from '../models/question';

/**
 * @file question actions to be dispatched by events relating to questions
 * @author Evan Liebhauser
 */

export const questionActionTypes = {
    POST_QUESTION: 'POST_QUESTION',
    CLICK_QUESTION: 'CLICK_QUESTION',
    CLICK_TAB: 'CLICK_TAB',
    CLICK_CONFIRM: 'CLICK_CONFIRM',
}

export interface QuestionActionPayload {
    payload: {
        question: Question
    }
}

export interface QuestionsActionPayload {
    payload: {
        questions: Question[],
        tab: number,
        pageCount: number,
        page: number,
    }
}

export interface QuestionConfirmActionPayload {
    payload: {
        question: Question,
        confirm: boolean,
    }
}

export const postQuestion = (question: Question) => (dispatch: Dispatch<QuestionActionPayload & Action>) => {
    dispatch({
        type: questionActionTypes.POST_QUESTION,
        payload: {
            question
        }
    });
}

export const clickQuestion = (question: Question) => (dispatch: Dispatch<QuestionActionPayload & Action>) => {
    dispatch({
        type: questionActionTypes.CLICK_QUESTION,
        payload: {
            question
        }
    });
}

export const clickTab = (questions: Question[], tab: number, pageCount: number, page: number) => (dispatch: Dispatch<QuestionsActionPayload & Action>) => {
    dispatch({
        type: questionActionTypes.CLICK_TAB,
        payload: {
            questions,
            tab,
            pageCount,
            page,
        },
    });
}

export const clickConfirm = (question: Question, confirm: boolean) => (dispatch: Dispatch<QuestionConfirmActionPayload & Action>) => {
    dispatch({
        type: questionActionTypes.CLICK_CONFIRM,
        payload: {
            question,
            confirm
        },
    });
}