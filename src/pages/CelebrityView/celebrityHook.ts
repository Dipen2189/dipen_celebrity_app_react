import { useState, useEffect } from 'react';
import { Option } from '../../components/common/AutoComplete';
import { getCelebrityList } from '../../services/celebrityList/celebrity-list-service';
import { ICelebrityList } from '../../models/celebrity/index';

export const useCelebrityListHooks = () => {
    const [CelebrityList, setCelebrityList] = useState<Array<ICelebrityList>>([]);
    const [gender, setGender] = useState<Array<Option>>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const getClebrity = () => {
        if (search === '' || search === null || search === undefined) {
            setCelebrityList(
                getCelebrityList.map((value) => {
                    return { ...value, name: `${value.first} ${value.last}` };
                }),
            );
        } else {
            setCelebrityList(
                CelebrityList.filter((value) =>
                    value?.name?.toLocaleLowerCase()?.startsWith(search?.toLocaleLowerCase()),
                ),
            );
        }
    };

    const getGender = () => {
        setGender([
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
            { value: 'Transgender', label: 'Transgender' },
            { value: 'Rather not say', label: 'Rather not say' },
            { value: 'other', label: 'other' },
        ]);
    };

    return {
        CelebrityList,
        gender,
        editIndex,
        setEditIndex,
        deleteIndex,
        setDeleteIndex,
        search,
        setSearch,
        setCelebrityList,
    };
};
