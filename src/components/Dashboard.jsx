import React, { useEffect, useState } from 'react'
import { getdataonsearch, gettoken, initialStates } from './helper';

function Dashboard() {

    const [states, setStates] = useState(initialStates);

    function updateState(key = '', value = '', actionHelper = () => { }) {
        states[key] = value;
        setStates({ ...states });
        actionHelper();
    }

    async function getToken() {
        if (window.localStorage.getItem('token') === null) {
            let { token } = await gettoken();
            if (token) {
                window.localStorage.setItem('token', token);
            }
            else alert('Something went wrong!');
        }
    }

    async function getDataOnSearch() {
        let data = await getdataonsearch(states['search']);
        updateState('data', data);
    }

    function renderStock() {
        let temp = states['data'];
        if (temp.length > 0) {
            return temp.map((element, index) => {
                if (index < 100) //showing only first 100 data
                    return <div style={{ fontSize: '12px' }}>
                        <span>Name: {element[0]} - </span>
                        <span>Value 1: {element[1]} - </span>
                        <span>Value 2: {element[2]}</span>
                    </div>
            });
        }
    }

    useEffect(() => {
        getToken();
    });

    return (
        <div>
            <input value={states['search']} onChange={(e) => { updateState('search', e.target.value, getDataOnSearch) }} />
            {renderStock()}
        </div>
    )
}

export default Dashboard