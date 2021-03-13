import React, { useState } from 'react';

// own module imports
import AnswerVoting from '../voting/answerVoting/AnswerVoting';

// css imports
import './Answeritem.css';

// third party imports
import firebase from 'firebase/app';
import { Link, Redirect } from 'react-router-dom';

// material-ui imports
import {
    Slide,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@material-ui/core';

const DialogTransition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Answeritem = (props) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [routeRedirect, setRedirect] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const deleteAnswer = async () => {
        await firebase.firestore().collection("articles").doc(props.articleId).collection("answers").doc(props.id).delete();
        setOpenDialog(false);
        alert('Antwort wurde erfolgreich gelöscht.');
        setRedirect(true);
    }

    const redirectTo = routeRedirect;
    if (redirectTo) {
        return <Redirect to={{pathname: `/article/${props.articleId}`}} />
    }

    let answerActionButtons;
    if (props.currentUserId === props.creatorId) {
        answerActionButtons = (
            <div>
                <Button>Bearbeiten</Button>
                <Button onClick={handleClickOpen}>Löschen</Button>
                <Dialog
                    PaperProps={{
                        style: {
                            backgroundColor: '#212121',
                        },
                    }}
                    open={openDialog}
                    onClose={handleClose}
                    TransitionComponent={DialogTransition}
                    keepMounted
                    disabled>
                    <DialogTitle className="dialog-title">Antwort löschen?</DialogTitle>
                    <DialogContent className="dialog-content">
                        <DialogContentText>
                            Wollen Sie die Antwort wirklich unwideruflich löschen?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className="dialog-actions">
                        <Button onClick={handleClose}>Nein</Button>
                        <Button onClick={deleteAnswer}>Ja</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    } else {
        answerActionButtons = (
            <div></div>
        )
    }

    return (
        <div className="answeritem">
            <AnswerVoting voting={props.voting} id={props.id} />
            <div className="answer-content">
                <p className="answertext">{props.answerText}</p>
                {answerActionButtons}
            </div>
            <div className="user-info-section">
                <p>{props.createdAt}</p>
                <Link to={{pathname: `/userprofile/${props.creatorId}`}}>
                    {props.creator}
                </Link>
            </div>
        </div>
    );
}

export default Answeritem;