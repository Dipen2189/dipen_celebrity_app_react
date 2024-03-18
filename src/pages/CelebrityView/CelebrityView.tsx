/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { useState } from 'react';
import { Option } from '../../components/common/AutoComplete';
//import images, { CloseIcon } from '../../assets/images';
import Dialog from '../../components/common/Dialog/Index';
import { Button, Chip, DialogContent, DialogTitle, TextField, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { useCelebrityListHooks } from './celebrityHook';

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
    ({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    }),
);

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

// export const addIcon = () => {
//     return <img src={images.icAddSVG} alt={'add'} />;
// };

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const CelebrityViewComponent = () => {
    const { CelebrityList, gender } = useCelebrityListHooks();
    const [expanded, setExpanded] = useState<number | null>();

    const handleExpandeChange = (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : null);
    };
    return (
        <>
            {CelebrityList?.map((data, index) => {
                return (
                    <div key={index} style={{}} className="dialog-box-card">
                        <Accordion
                            expanded={expanded === index}
                            onChange={handleExpandeChange(index)}
                            style={{ width: '100%', marginBottom: '25px' }}
                        >
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography width={'100%'} component="div">
                                    {' '}
                                    <div className="dialog-box-chip">
                                        <div
                                            style={{
                                                float: 'left',
                                                fontWeight: 'bold',
                                                display: 'flex',
                                                columnGap: '100px',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <img
                                                style={{ margin: '15px', borderRadius: '50%' }}
                                                src={data.picture ? data.picture : ''}
                                                alt="img"
                                            />
                                            <h3>{data.first || data.last ? `${data.first} ${data.last}` : ''}</h3>
                                        </div>
                                    </div>
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div
                                    style={{
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        columnGap: '100px',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        color: 'grey',
                                        padding: '0px 50px',
                                    }}
                                >
                                    <h4>Age</h4>
                                    <h4>Gender</h4>
                                    <h4>Country</h4>
                                </div>
                                <div
                                    style={{
                                        marginTop: '-35px',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        columnGap: '100px',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '0px 50px',
                                    }}
                                >
                                    <h4>{data.dob ? 2024 - Number(data.dob?.toString()?.split('-')[0]) : ''}</h4>
                                    <h4>{data.gender ? data.gender : ''}</h4>
                                    <h4>{data.country ? data.country : ''}</h4>
                                </div>
                                <div
                                    style={{
                                        fontWeight: 'bold',
                                        //display: 'flex',
                                        //columnGap: '100px',
                                        //justifyContent: 'space-evenly',
                                        //alignItems: 'center',
                                        color: 'grey',
                                        padding: '0px 50px',
                                    }}
                                >
                                    Description
                                </div>
                                <div
                                    style={{
                                        //marginTop: '-35px',
                                        fontWeight: 'bold',
                                        //display: 'flex',
                                        //columnGap: '100px',
                                        //justifyContent: 'space-evenly',
                                        //alignItems: 'center',
                                        padding: '0px 50px',
                                        marginBottom: '10px',
                                    }}
                                >
                                    {data.description ? data.description : ''}
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                );
            })}
        </>
    );
};

export default CelebrityViewComponent;
