import React from 'react';
import { Dialog as MuiDialog } from '@mui/material';

interface props {
    open: boolean;
    handleClose: () => void;
    children: React.ReactNode;
    classes?: string;
    maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    title?: string;
    dataTestId?: string;
}

export default function Dialog({ open, handleClose, classes, children, maxWidth, title, dataTestId }: props) {
    return (
        <>
            <MuiDialog
                open={open}
                fullWidth
                maxWidth={maxWidth}
                className={classes}
                onClose={handleClose}
                title={title}
                data-testid={dataTestId}
            >
                {children}
            </MuiDialog>
        </>
    );
}
