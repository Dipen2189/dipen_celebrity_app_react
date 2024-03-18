/* eslint-disable array-callback-return */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { useState } from 'react';
import AutoCompleteComponent, { Option } from '../../components/common/AutoComplete';
//import images, { CloseIcon } from '../../assets/images';
import Dialog from '../../components/common/Dialog/Index';
import { Button, Chip, DialogContent, DialogTitle, TextField, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { useCelebrityListHooks } from './celebrityHook';
import images from '../../assests/index';

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
    const {
        CelebrityList,
        setCelebrityList,
        gender,
        deleteIndex,
        setDeleteIndex,
        search,
        setSearch,
        editIndex,
        setEditIndex,
    } = useCelebrityListHooks();
    const [expanded, setExpanded] = useState<number | null>();

    const handleExpandeChange = (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : null);
    };

    const handleNameChange = (event, index) => {
        const { value } = event.target;
        setCelebrityList((prevList) => {
            const newList = [...prevList];
            newList[index] = { ...newList[index], name: value };
            return newList;
        });
    };
    const handleAgeChange = (event, index) => {
        const { value } = event.target;
        setCelebrityList((prevList) => {
            const newList = [...prevList];
            newList[index] = {
                ...newList[index],
                dob: `${value}-${newList[index]?.dob?.toString()?.split('-')[1]}-${
                    newList[index]?.dob?.toString()?.split('-')[2]
                }`,
            };
            return newList;
        });
    };
    const handleCountryChange = (event, index) => {
        const { value } = event.target;
        setCelebrityList((prevList) => {
            const newList = [...prevList];
            newList[index] = { ...newList[index], country: value };
            return newList;
        });
    };
    const handleDescriptionChange = (event, index) => {
        const { value } = event.target;
        setCelebrityList((prevList) => {
            const newList = [...prevList];
            newList[index] = { ...newList[index], description: value };
            return newList;
        });
    };

    const handleEditClick = (index) => {
        setEditIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleDeleteClick = (index) => {
        setDeleteIndex(index);
    };

    console.log(editIndex);

    return (
        <>
            <div>
                <TextField
                    name="name"
                    id="Name"
                    label="Search"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    fullWidth
                    style={{ marginBottom: '10px' }}
                />
            </div>
            {CelebrityList.map((data, index) => {
                //console.log(gender?.filter((d, i) => i === index)[0]?.value);
                return (
                    <div key={index} className="dialog-box-card">
                        <Accordion
                            expanded={expanded === index}
                            onChange={handleExpandeChange(index)}
                            style={{ width: '100%', marginBottom: '25px' }}
                        >
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography width={'100%'} component="div">
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
                                                src={data.picture || ''}
                                                alt="img"
                                            />
                                            {editIndex === index ? (
                                                <TextField
                                                    name="name"
                                                    id="Name"
                                                    label="Name"
                                                    variant="outlined"
                                                    value={data.name ? data.name : ''}
                                                    onChange={(e) => handleNameChange(e, index)}
                                                />
                                            ) : (
                                                <h3>{data.first || data.last ? `${data.first} ${data.last}` : ''}</h3>
                                            )}
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
                                    {editIndex === index ? '' : <h4>Age</h4>}
                                    {editIndex === index ? '' : <h4>Gender</h4>}
                                    {editIndex === index ? '' : <h4>Country</h4>}
                                </div>
                                <div
                                    style={{
                                        marginTop: editIndex === index ? '20px' : '-35px',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        columnGap: '100px',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '0px 50px',
                                    }}
                                >
                                    {editIndex === index ? (
                                        <TextField
                                            name="age"
                                            id="age"
                                            label="Age"
                                            variant="outlined"
                                            value={
                                                data.dob
                                                    ? data.dob
                                                        ? 2024 - Number(data.dob?.toString()?.split('-')[0])
                                                        : ''
                                                    : ''
                                            }
                                            onChange={(e) => handleAgeChange(e, index)}
                                        />
                                    ) : (
                                        <h4>{data.dob ? 2024 - Number(data.dob?.toString()?.split('-')[0]) : ''}</h4>
                                    )}
                                    {editIndex === index ? (
                                        <AutoCompleteComponent
                                            label="Gender"
                                            defaultValue={gender?.filter((d, i) => i === index)[0]?.value}
                                            options={gender}
                                            onChange={(e: string) =>
                                                setCelebrityList((prevList) => {
                                                    const newList = [...prevList];
                                                    newList[index] = { ...newList[index], gender: e };
                                                    return newList;
                                                })
                                            }
                                            isMultiSelect={false}
                                            disabled={false}
                                            width={278}
                                        />
                                    ) : (
                                        <h4>{data.gender || ''}</h4>
                                    )}
                                    {editIndex === index ? (
                                        <TextField
                                            name="country"
                                            id="country"
                                            label="Country"
                                            variant="outlined"
                                            value={data.country ? data.country : ''}
                                            onChange={(e) => handleCountryChange(e, index)}
                                        />
                                    ) : (
                                        <h4>{data.country || ''}</h4>
                                    )}
                                </div>
                                {/* <div style={{ width: '100%' }}> */}
                                {editIndex === index ? (
                                    ''
                                ) : (
                                    <div
                                        style={{
                                            fontWeight: 'bold',
                                            color: 'grey',
                                            padding: '0px 50px',
                                        }}
                                    >
                                        Description
                                    </div>
                                )}
                                {editIndex === index ? (
                                    <TextField
                                        style={{
                                            fontWeight: 'bold',
                                            padding: '0px 50px',
                                            marginBottom: '10px',
                                            marginTop: editIndex === index ? '20px' : '0px',
                                            width: '50%',
                                        }}
                                        name="description"
                                        id="description"
                                        label="Description"
                                        //variant="outlined"
                                        size="medium"
                                        multiline
                                        maxRows={10}
                                        fullWidth
                                        value={data.description ? data.description : ''}
                                        onChange={(e) => handleDescriptionChange(e, index)}
                                    />
                                ) : (
                                    <h4
                                        style={{
                                            fontWeight: 'bold',
                                            padding: '0px 50px',
                                            marginBottom: '10px',
                                        }}
                                    >
                                        {data.description || ''}
                                    </h4>
                                )}
                                {/* </div> */}
                                <div
                                    style={{
                                        display: 'flex',
                                        columnGap: '15px',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        marginRight: '40px',
                                        marginBottom: '15px',
                                    }}
                                >
                                    {editIndex === index ? (
                                        <>
                                            <img src={images.Check} alt={'check'} onClick={() => setEditIndex(null)} />
                                            <img
                                                src={images.Cancel}
                                                alt={'cancle'}
                                                onClick={() => setEditIndex(null)}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <img
                                                src={images.Edit}
                                                alt={'edit'}
                                                onClick={() => handleEditClick(index)}
                                            />
                                            <img
                                                src={images.Delete}
                                                alt={'delete'}
                                                onClick={() => handleDeleteClick(index)}
                                            />
                                        </>
                                    )}
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
