import React from 'react';

// css imports
import './ChoiceDialog.css';

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

const ChoiceDialog = (props) => {
    return (
        <Dialog
            PaperProps={{
                style: {
                    backgroundColor: '#212121',
                },
            }}
            open={props.openDialog}
            onClose={props.onNoClick}
            TransitionComponent={DialogTransition}
            keepMounted
            disabled>
            <DialogTitle className="dialog-title">{props.title}</DialogTitle>
            <DialogContent className="dialog-content">
                <DialogContentText>{props.content}</DialogContentText>
            </DialogContent>
            <DialogActions className="dialog-actions">
                <Button onClick={props.onNoClick}>Nein</Button>
                <Button onClick={props.onYesClick}>Ja</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ChoiceDialog;