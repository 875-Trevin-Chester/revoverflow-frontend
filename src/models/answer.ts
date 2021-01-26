/**
 * @file Defining user model
 * @author Yurrian Pierre-Boyer
 */

export interface Answer {
    id: number;
    content: string;
    creationDate: Date;
    questionId: number;
    userId: number;
}
