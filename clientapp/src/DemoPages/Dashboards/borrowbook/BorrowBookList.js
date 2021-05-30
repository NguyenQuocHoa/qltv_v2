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

export default function BorrowBookList(props) {
    const {
        borrowBookList,
        formatDate,
        btnEditOnclick,
        btnDeleteOnClick,
    } = props;
    return (
        <Table className="mb-0">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Borrow Book code</th>
                    <th>Borrow date</th>
                    <th>Number of day borrow</th>
                    <th>Description</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                { borrowBookList.map(borrowBook => {
                    return <tr key={borrowBook.id}>
                        <th>{borrowBook.id}</th>
                        <td>{borrowBook.borrowBookCode}</td>
                        <td>{formatDate(borrowBook.borrowDate)}</td>
                        <td>{borrowBook.numberOfDayBorrow}</td>
                        <td>{borrowBook.description}</td>
                        <td>
                            <Button title="Edit borrowBook" outline className="mb-2 mr-2 btn-transition"
                                                    color="info" size="sm" onClick={() => btnEditOnclick(borrowBook.id)}>
                            <FontAwesomeIcon icon={faEdit} size="1x"/>
                            </Button>
                            <Button title="Delete borrowBook" outline className="mb-2 mr-2 btn-transition"
                                                    color="danger" size="sm" onClick={() => btnDeleteOnClick(borrowBook.id)}>
                            <FontAwesomeIcon icon={faTrashAlt} size="1x"/>
                            </Button>
                        </td>
                    </tr>
                }) }
            </tbody>
        </Table> 
    )
} 