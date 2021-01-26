import { AnswerActionPayload, AcceptedAnswerActionPayload, answerActionTypes, } from '../../actions/answer.actions';
import { Action } from 'redux';
import { answerReducer } from '../../reducers/answer.reducer';

describe('answer.reducer', () => {
    describe('ACCEPT_ANSWER', () => {
        test('should add the new answer to the answer array', () => {
            const action: AcceptedAnswerActionPayload & AnswerActionPayload & Action = {
                type: answerActionTypes.ACCEPT_ANSWER,
                payload: {
                    answer: {
                    id: 99,
                    content: "content99",
                    creationDate: new Date("2020-01-01"),
                    questionId: 99,
                    userId: 99
                },
                accepted: false
            }
        }

            const state = {
                collectedAnswers: [],
                storeAnswer: {
                    id: 1,
                    content: "content",
                    creationDate: new Date(),
                    questionId: 1,
                    userId: 1
                },
                accepted: false
            }

            const nextState = answerReducer(state, action);
            expect(nextState.storeAnswer).toMatchObject({
                id: 99,
                content: "content99",
                creationDate: new Date("2020-01-01"),
                questionId: 99,
                userId: 99
            });
        });
    });


    describe('POST_ANSWER', () => {
        test('should add the new answer to the answer array', () => {
            const action: AcceptedAnswerActionPayload & AnswerActionPayload & Action = {
                type: answerActionTypes.POST_ANSWER,
                payload: {
                    answer: {
                    id: 99,
                    content: "content99",
                    creationDate: new Date("2020-01-01"),
                    questionId: 99,
                    userId: 99
                },
                accepted: false
            }
        }

            const state = {
                collectedAnswers: [],
                storeAnswer: {
                    id: 1,
                    content: "content",
                    creationDate: new Date(),
                    questionId: 1,
                    userId: 1
                },
                accepted: false
            }

            const nextState = answerReducer(state, action);
            expect(nextState.collectedAnswers).toEqual([{
                id: 99,
                content: "content99",
                creationDate: new Date("2020-01-01"),
                questionId: 99,
                userId: 99
            }]);
        });
    });

    //     test('should increase state clicks by 5 when 5 in payload', () => {
    //         const action: ClickerActionPayload & Action = {
    //             type: clickerActionTypes.ADD_CLICKS,
    //             payload: {
    //                 clicks: 5
    //             }
    //         }

    //         const state = {
    //             clicks: 10
    //         }

    //         const nextState = clickerReducer(state, action);
    //         expect(nextState.clicks).toEqual(15);
    //     });
    // })

    // describe('SPEND_CLICKS', () => {
    //     test('should reduce state clicks by value in payload', () => {
    //         const action: ClickerActionPayload & Action = {
    //             type: clickerActionTypes.SPEND_CLICKS,
    //             payload: {
    //                 clicks: 1
    //             }
    //         }

    //         const state = {
    //             clicks: 1
    //         }

    //         const nextState = clickerReducer(state, action);
    //         expect(nextState.clicks).toEqual(0);

    //     });

    //     test('Should reduce state clicks by 25 when 25 in payload', () => {
    //         const action: ClickerActionPayload & Action = {
    //             type: clickerActionTypes.SPEND_CLICKS,
    //             payload: {
    //                 clicks: 25
    //             }
    //         }

    //         const state = {
    //             clicks: 100
    //         }

    //         const nextState = clickerReducer(state, action);
    //         expect(nextState.clicks).toEqual(75);
    //     })
    // });

    // test('should return same state when no matching action', () => {
    //     const action: ClickerActionPayload & Action = {
    //         type: 'dfladjflkdshfds',
    //         payload: {
    //             clicks: 25
    //         }
    //     }

    //     const state = {
    //         clicks: 100
    //     }

    //     const nextState = clickerReducer(state, action);
    //     expect(nextState).toEqual(state);
    // });


});