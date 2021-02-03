/**
@author
Jordon Hill
*/

import { authAxios } from './internal.axios'
import { Question } from '../models/question';
import { Answer } from '../models/answer';

/**
 *  The method sends a post request to the backend and response.data.creationDate gets formated to the date object here
 *  @param, question
 *  @returns question: Question
 */
export const postQuestion = async (question: Question) => {
    const response = await authAxios.post<Question>(`/questions`, question);
    response.data.creationDate = new Date(response.data.creationDate);
    return response.data;
}
/**
 *  This method sends a post request to the backend and formats the data using the Data object
 *  @param, answer: Answer
 *  @returns: answer: Answer
 */
export const postAnswer = async (answer: Answer) => {
    const response = await authAxios.post<Answer>(`/answers`, answer);
    response.data.creationDate = new Date(response.data.creationDate);
    return response.data;
}
/**
 *  @param size: 10 (a constant variable)
 *  @param page: (the current page the user wants to see)
 *  @param an array of questions
 */
export const getAllQuestions = async (size: number, page: number) => {
    const response = await authAxios.get<any>(`/questions?&size=${size}&page=${page}`);
    return response.data;
}
/**
 * @param id: the users id from local storage
 * @param size: 10 (const)
 * @param page: the page number type; is number
 * @returns: a list of questions made by the user
 */
export const getQuestionsByUserId = async (id: number, size: number, page: number ) => {
    const response = await authAxios.get<any>(`/questions/user/${id}?size=${size}&page=${page}`);
    return response.data.content;
}
/**
 * @param size: 10 (const)
 * @param page: page to display type number
 * @returns a list of questions
 */
export const getUnconfirmedQuestions = async (size: number, page: number) => {
    const response = await authAxios.get<Question[]>(`questions/status/false?size=${size}&page=${page}`);
    return response.data;
}
/**
 * @param id: the question id
 * @returns a question
 */
export const getQuestionByQuestionId = async (id: number) => {
    const response = await authAxios.get<Question>(`/questions/id/${id}`);
    return response.data;
}
/**
 * @param questionAcceptedAnswerId type questions
 * @returns a question
 */
export const updateQuestionAcceptedAnswerId = async (questionAcceptedAnswerId: Question) => {
    const response = await authAxios.put<Question>(`/questions`, questionAcceptedAnswerId);
    return response;
}
/**
 * @param questionStatus should be boolean
 * @returns a question
 */
export const updateQuestionStatus = async (questionStatus: any) => {
    const response = await authAxios.put<Question>(`/questions/status`, questionStatus);
    return response;
}

/**
 *  @param size: number (const 10)
 *  @param page: number
 *  @param location: string
 */
export const getAllQuestionsByLocation = async (size: number, page: number, location: string | null) => {
    const response = await authAxios.get<any>(`/questions/location/${location}?&size=${size}&page=${page}`);
    return response.data;
}

export const getAllQuestionsByType = async (size: number, page: number, questionType: string) => {
    console.log(questionType);
    const response = await authAxios.get<any>(`/questions/type/${questionType}?&size=${size}&page=${page}`);
    return response.data;
}

export const getAllUserQuestionsByType = async (size: number, page: number, questionType: string, userId: number) => {
    const response = await authAxios.get<any>(`/questions/type/${userId}/${questionType}?&size=${size}&page=${page}`);
    return response.data;
}

export const getAllUserQuestionsByLocation = async (size: number, page: number, location: string | null, userId: number) => {
    const response = await authAxios.get<any>(`/questions/location/${userId}/${location}?&size=${size}&page=${page}`);
    return response.data;
}

/**
 * Updates isFaq boolean for a given question in the backend (i.e., changes to true)
 * Note that the changing of the value occurs in the service layer of the backend, so passing in false here
 * is expected, though not necessary.
 * @param questionStatus - this is a question object that will be read and interpreted by the backend endpoint
 */
export const updateQuestionFAQStatus = async (questionStatus: any) => {
    const response = await authAxios.post<Question>(`/questions/faq`, questionStatus);
    return response;
}
