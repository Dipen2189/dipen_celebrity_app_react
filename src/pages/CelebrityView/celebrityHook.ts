/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Option } from '../../components/common/AutoComplete';
import { getCelebrityList } from '../../services/celebrityList/celebrity-list-service';
import { ICelebrityList } from '../../models/celebrity/index';

export const useCelebrityListHooks = () => {
    const [CelebrityList, setCelebrityList] = useState<Array<ICelebrityList>>([]);
    const [gender, setGender] = useState<Array<Option>>([]);
    const [edit, setEddit] = useState(false);
    const [deleteElement, setDeleteElement] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([getGender(), getClebrity()]);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const getClebrity = () => {
        setCelebrityList(getCelebrityList);
    };

    const getGender = () => {
        setGender([
            { value: 'MALE', label: 'Male' },
            { value: 'FEMALE', label: 'Female' },
            { value: 'TRANSGENDER', label: 'Transgender' },
            { value: 'RATHER_NOT_SAY', label: 'Rather not say' },
            { value: 'OTHER', label: 'other' },
        ]);
    };

    return {
        CelebrityList,
        gender,
        edit,
        setEddit,
        deleteElement,
        setDeleteElement,
        search,
        setSearch,
    };
};
