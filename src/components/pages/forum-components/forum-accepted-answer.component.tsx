import React from 'react';
import { makeStyles, Box, FormControlLabel, Container, createMuiTheme, ThemeProvider } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { green } from '@material-ui/core/colors';
import { Answer } from '../../../models/answer';
import { IState } from '../../../reducers';
import { connect } from 'react-redux';
import { EditorState, convertFromRaw, Editor } from 'draft-js';

/**
 * @file Displays the question accepted answer
 * @author Keith Salzman 
 */

const useStyles = makeStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: "#ffffff",
        border: '2px solid #000',
        padding: 20
    },
    checkSize: {
        width: 50,
        height: 50,
    },
    boxInternal: {
        marginBottom: 5,
        marginTop: 30,
        paddingBottom: 10,
        borderBottomStyle: "dotted",
        borderColor: "#f26925",
    },
    modalInternal: {
        display: "flex",
        justifyContent: "space-evenly"
    },
    buttonInternal: {
        color: '#ffffff',
        backgroundColor: '#3498db',
    }
});

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#f26925',
        },
        secondary: {
            main: '#3498db',
        },
    },
});

export interface ForumAcceptedAnswerComponentProps {
    answer: Answer;
    storeAnswer: any;
    selected: boolean;
    storeQuestion: any;
}

export const ForumAcceptedAnswerComponent: React.FC<ForumAcceptedAnswerComponentProps> = (props) => {
    const classes = useStyles();
    const questionContent = EditorState.createWithContent(convertFromRaw(JSON.parse(props.answer.content)));
    const onChange = () => {};

    if (!(props.answer.id === props.storeQuestion.acceptedId)) {
        return <div></div>;
    } else {
        return (
            <ThemeProvider theme={theme}>
                <Container>
                    <Box justifyContent="flex-start" display="flex" flexDirection="row" className={classes.boxInternal}>
                        <Box justifyContent="flex-start" display="flex">
                            <FormControlLabel
                                control={<DoneIcon className={classes.checkSize} />} label=""
                                style={{ color: green[500] }} />
                            <Box textAlign="left">
                                <div><Editor editorState={questionContent} readOnly={true} onChange={onChange} /></div>
                                <footer>{props.answer.userId} <br />{props.answer.creationDate}</footer>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        )
    }
}

const mapStateToProps = (state: IState) => {
    return {
        storeAnswer: state.answerState.storeAnswer,
        storeQuestion: state.questionState.storeQuestion,
    }
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ForumAcceptedAnswerComponent);