/**
 * @file Contains and manages the questions and answer boxes populated into the feed
 * @author Keith Salzman
 */

import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Container, createMuiTheme, ThemeProvider, Box, Button, makeStyles, TextField, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import FeedBoxComponent from './feed-box.component';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import DynamicFeedOutlinedIcon from '@material-ui/icons/DynamicFeedOutlined';
import ConfirmationNumberOutlinedIcon from '@material-ui/icons/ConfirmationNumberOutlined';
import Pagination from '@material-ui/lab/Pagination';
import { BreadcrumbBarComponent } from '../breadcrumb-bar.component';
import { useHistory } from 'react-router';
import * as answerRemote from '../../../remotes/answer.remote';
import * as questionRemote from '../../../remotes/question.remote';
import { Question } from '../../../models/question';
import { IState } from '../../../reducers';
import { connect } from 'react-redux';
import { clickTab } from '../../../actions/question.actions';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import { Autocomplete } from '@material-ui/lab';
import locations from '../../../data/locations.json';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#f26925',
        },
        secondary: {
            main: '#3498db',
        }
    },
});

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

export interface FeedContainerComponentProps {
    storeQuestions: Question[]
    clickTab: (questions: Question[], tab: number, pageCount: number, page: number) => void;
    storeTab: number;
    storePageCount: number;
    storePage: number;
}

enum QuestionType { General, Location };

export const FeedContainerComponent: React.FC<FeedContainerComponentProps> = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [view, setView] = useState<'question' | 'answer' | 'confirm' | 'recent' | 'faq'>('recent');
    const [value, setValue] = useState(props.storeTab);
    const [questionType, setQuestionType] = useState<QuestionType>(QuestionType.General);
    const [filterText, setFilterText] = useState<string | null>(null);
    const userId = (+JSON.parse(JSON.stringify(localStorage.getItem('userId'))));
    const admin = (localStorage.getItem("admin"));
    const size = 10;
    let filteredQuestions: Question[] = [];

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        load(view, value - 1);
    };

    /**
     * Populates the feed with answers or questions according to the particular view and page input.
     * @param view string variable that dictates what is displayed in the rendered feed box components
     * @param page number variable that describes which page to display form the paginated information recieved from the server
     */
    const load = async (view: string, page: number) => {
        let retrievedPageable: any;
        let tab: any;
        if (view === 'recent') {
            const location = questionType === QuestionType.Location ? filterText : null;
            retrievedPageable = await questionRemote.getAllQuestionsByLocation(size, page, location);
            tab = 0;
            setView(view);
        } else if (view === 'question') {
            const location = questionType === QuestionType.Location ? filterText : null;
            retrievedPageable = await questionRemote.getAllUserQuestionsByLocation(size, page, location, userId);
            tab = 1;
            setView(view)
        } else if (view === 'answer') {
            retrievedPageable = await answerRemote.getAnswersByUserId(userId, size, page);
            tab = 2;
            setView(view)
        } else if (view === 'confirm') {
            retrievedPageable = await questionRemote.getUnconfirmedQuestions(size, page);
            tab = 3;
            setView(view)
        }
        else if (view === 'faq') {
            const location = questionType === QuestionType.Location ? filterText : null;
            retrievedPageable = await questionRemote.getAllQuestionsByLocation(size, page, location);
            tab = 4;
            setView(view);
        }

        props.clickTab(retrievedPageable.content, tab, retrievedPageable.totalPages, retrievedPageable.number);
    }

    /**
     * Maps the questions or answers into feed boxes to be displayed within the feed container.
     */
    const renderFeedBoxComponents = () => {
        if (view === 'confirm') {
            filteredQuestions = props.storeQuestions.filter(question => question.acceptedId !== null);
            return filteredQuestions.map(question => {
                return (
                    <FeedBoxComponent key={question.id} question={question} questionContent={question.content} view={view} />
                )
            })


            //ADDED THIS FAQ FILTER LOGIC
        } else if (view === 'faq') {
            filteredQuestions = props.storeQuestions.filter(question => question.isFaq === true);
            return filteredQuestions.map(question => {
                return (
                    <FeedBoxComponent key={question.id} question={question} questionContent={question.content} view={view} />
                )
            })
        }
        else {
            return props.storeQuestions.map(question => {
                return (
                    <FeedBoxComponent key={question.id} question={question} questionContent={question.content} view={view} />
                )
            })
        }
    }

    const handleRedirect = () => {
        history.push('/question');
    }

    /**
     * This method gets called on the on click on line 193 and sends in size, page number, and filterText value
     *  not 100% sure how to change the view for this.
     */
    const handleFilter = async () => {
        // just refreshes the filter
        load(view, 0);
    }

    /**
     * This function handles the clicking of the add faq button. 
     * Routes the user to the text editor component; on clicking submit, the added
     * question is marked by default as a FAQ
     */
    const clickAdd = () => {
        console.log("add clicked");
        history.push('/question/faq');
    }

    return (
        <div>
            <BreadcrumbBarComponent />
            <Container className={classes.containerInternal}>
                <Box justifyContent="flex-end" display="flex">
                    <ThemeProvider theme={theme} >
                        <Button variant="contained" color="secondary" style={{ margin: '0.5em' }} onClick={() => handleRedirect()}>
                            Ask a Question
                    </Button>
                    </ThemeProvider>
                    <ThemeProvider theme={theme}>
                        {(view === 'faq' && admin === 'true') ? <Button id="add-FAQ-button" variant="contained" color="secondary" style={{ margin: '0.5em' }} onClick={() => clickAdd()}>
                            Add FAQ
                    </Button> : ""}
                    </ThemeProvider>
                </Box>
                <Box justifyContent="flex-end" display="flex">

                </Box>
                <ThemeProvider theme={theme} >
                    <Box justifyContent="center" display="flex" className={classes.boxExternal}>
                        <Tabs
                            value={value}
                            indicatorColor="secondary"
                            textColor="primary"
                            variant="fullWidth"
                            scrollButtons="auto"
                            onChange={handleChange}
                        >
                            <Tab icon={<DynamicFeedOutlinedIcon fontSize="large" />} label="RECENT" className={classes.boxInternal}
                                onClick={(e) => load("recent", 0)} />
                            <Tab icon={<LiveHelpIcon fontSize="large" />} label="MY QUESTIONS" className={classes.boxInternal}
                                onClick={(e) => load("question", 0)} />
                            <Tab icon={<QuestionAnswerIcon fontSize="large" />} label="MY ANSWERS" className={classes.boxInternal}
                                onClick={(e) => load("answer", 0)} />
                            {admin === 'true' ? <Tab icon={<ConfirmationNumberOutlinedIcon fontSize="large" onClick={(e) => load("confirm", 0)} />}
                                label="CONFIRM" className={classes.boxInternal} /> : ""}
                            {/* ADDED THIS FAQ BUTTON TO SHOW UP ON FEED PAGE */}
                            <Tab icon={<QuestionAnswerIcon fontSize="large" />} id="FAQ-Tab" label="FAQ" className={classes.boxInternal}
                                onClick={(e) => load('faq', 0)} />
                        </Tabs>
                    </Box>
                    {/* Only show the question filter if we are on a question tab */}
                    {view !== 'answer' ?
                        <Box className={classes.boxInternal} display='flex' justifyContent='center' alignItems='center' m={2}>
                            <RadioGroup value={questionType} onChange={e => setQuestionType(parseInt(e.currentTarget.value))}>
                                <FormControlLabel
                                    labelPlacement="end"
                                    value={QuestionType.General}
                                    control={<Radio />}
                                    label="General Revature Questions"
                                />
                                <FormControlLabel
                                    labelPlacement="end"
                                    value={QuestionType.Location}
                                    control={<Radio />}
                                    label="Location-Specific Questions"
                                />
                            </RadioGroup>
                            {questionType === QuestionType.Location ?
                                <Autocomplete
                                    onChange={(e, value) => setFilterText(value)}
                                    value={filterText}
                                    options={locations}
                                    style={{ width: 300 }}
                                    renderInput={params =>
                                        <TextField {...params} onChange={e => setFilterText(e.target.value)} label="View by Location" variant="outlined" />
                                    }
                                /> :
                                <></>
                            }
                            <Button onClick={() => handleFilter()} variant="outlined" style={{ marginLeft: '1rem' }}>Filter</Button>
                        </Box> :
                        <></>
                    }
                    <div style={{ width: '100%' }}>
                        <Box display="flex" flexDirection="column" justifyContent="center" >
                            {renderFeedBoxComponents()}
                        </Box>
                    </div>
                    <Box display="flex" justifyContent="center" padding={5}>
                        <Pagination size="medium" count={props.storePageCount} page={props.storePage + 1} color="secondary" onChange={handlePageChange} />
                    </Box>
                </ThemeProvider>
            </Container>
        </div>
    );
}

const mapStateToProps = (state: IState) => {
    return {
        storeQuestions: state.questionState.collectedQuestions,
        storeQuestion: state.questionState.storeQuestion,
        storeTab: state.questionState.storeTab,
        storePageCount: state.questionState.storePageCount,
        storePage: state.questionState.storePage,
    }
}

const mapDispatchToProps = {
    clickTab
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainerComponent);
