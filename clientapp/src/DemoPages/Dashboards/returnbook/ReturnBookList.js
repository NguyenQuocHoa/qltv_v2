import React from 'react';
import { Table, Button, } from 'reactstrap';

import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'

import {
    faEdit,
    faTrashAlt,
  
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

library.add(
    fab,
    faEdit,
    faTrashAlt,
);

export default function ReturnBookList(props) {
    const {
        returnBookList,
        formatDate,
        btnEditOnclick,
        btnDeleteOnClick,
    } = props;
    return (
        <Table className="mb-0">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Return Book code</th>
                    <th>Return date</th>
                    <th>Borrow code</th>
                    <th>Borrow date</th>
                    <th>Student</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                { returnBookList.map(returnBook => {
                    return <tr key={returnBook.id}>
                        <th>{returnBook.id}</th>
                        <td>{returnBook.returnBookCode}</td>
                        <td>{formatDate(returnBook.returnDate)}</td>
                        <td>{returnBook.borrowBookCode}</td>
                        <td>{formatDate(returnBook.borrowDate)}</td>
                        <td>{`${returnBook.studentCode}-${returnBook.studentName}`}</td>
                        <td>
                            <Button title="Edit returnBook" outline className="mb-2 mr-2 btn-transition"
                                                    color="info" size="sm" onClick={() => btnEditOnclick(returnBook.id)}>
                            <FontAwesomeIcon icon={faEdit} size="1x"/>
                            </Button>
                            <Button title="Delete returnBook" outline className="mb-2 mr-2 btn-transition"
                                                    color="danger" size="sm" onClick={() => btnDeleteOnClick(returnBook.id)}>
                            <FontAwesomeIcon icon={faTrashAlt} size="1x"/>
                            </Button>
                        </td>
                    </tr>
                }) }
            </tbody>
        </Table> 
    )
} 