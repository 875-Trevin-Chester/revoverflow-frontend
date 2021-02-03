/**
 * @file Contains and manages the profile user's questions
 */

import React, { useEffect, useState } from 'react';
import { Box, Container, makeStyles} from '@material-ui/core';
import { ProfileBoxComponent } from './profile-box.component';
import { BreadcrumbBarComponent } from '../breadcrumb-bar.component';
import { Question } from '../../../models/question';
import * as questionRemote from '../../../remotes/question.remote';
import { ProfileHeaderComponent } from './profile-header.component';

// Styles for the question components
const useStyles = makeStyles({
    boxExternal: {
        minWidth: 500
    },
    boxInternal: {
        color: "#f26925",
    },
    containerInternal: {
        paddingTop: 10,
    },
    breadcrumbBar: {
        marginTop: 60,
        marginLeft: 20,
    }
});

export const ProfileContainerComponent = () => {
    /**
     * postsPerPage is used in the endpoint getQuestionsByUserId to get a certain 
     * number of questions, so it is set to 10,000 until pagination can be implemented.
     */
    const postsPerPage = 10000;

    const classes = useStyles();
    const splitURL = window.location.href.split("/");
    //const userId = parseInt(splitURL[splitURL.length - 1]);
    const [userQuestions, setUserQuestions] = useState<Question[]>();
    const [userId, setUserId] = useState(parseInt(splitURL[splitURL.length - 1]));
    
    // Load specific user questions when the ProfileContainerComponent is loaded
    useEffect(()=>{
        getUserQuestions();
    }, [])
 
    // Grabs all of the user questions given the user id and sets it to the userQuestions state
    const getUserQuestions = async () => {
        try {
            const response = await questionRemote.getQuestionsByUserId(userId, postsPerPage, 0);
            setUserQuestions(response);
        } catch {
            alert("Could not set the user questions.");
        }
    };

    /**
     * Maps the questions or answers into feed boxes to be displayed within the feed container.
     */
    const renderProfileBoxComponents = () => {
        if (userQuestions) {
            return userQuestions.map(question => {
                return (
                    <ProfileBoxComponent key={question.id} question={question} questionContent={question.content} />
                );
            })
        }
        else {
            return <></>;
        }

    }

    return (
        <div>
            {/* Breadcrumb component that shows the current url path */}
            <BreadcrumbBarComponent />

            {/* Displays the user information above their questions */}
            <ProfileHeaderComponent></ProfileHeaderComponent>

            {/* Renders all of the questions in the profile box components */}
            <Container className={classes.containerInternal}>
                <div style={{ width: '100%' }}>
                    <Box display="flex" flexDirection="column" justifyContent="center" >
                        {renderProfileBoxComponents()}
                    </Box>
                </div>
            </Container>   
        </div>
    );
}


export default ProfileContainerComponent;