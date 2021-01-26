/**
 * @file Defining user model
 * @author Michel Charles <mcharl05@nyit.edu>
 */

export interface user {
    userID : number;
    RSSAccountId: number;
    points: number;
    admin: boolean;
    email: string;
    firstName: string;
    lastName: string;
}