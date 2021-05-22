import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function getAll(endpoint, name) {
    const [list, setList] = useState([]);

    // React.useEffect(() => {
    //     // getData();
    // }, []);

    // async function getData() {
    //     const response = await axios.get(endpoint)
    //         .then(res => {
    //             if (res.data.status === 500)
    //                 return;
    //             setList(res.data);
    //         })
    // }
    return list;
}