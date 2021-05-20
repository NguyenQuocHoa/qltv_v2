import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';

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

import BookForm from './BookForm';

export default function BookList(props) {

    const [isEdit, setIsEdit] = useState(false);

    const {
        books, 
        fetchBooks, 
        isAdd, 
        setIsAdd,
        setToggle,
    } = props;

    useEffect(() => {
        console.log('is add: ', isAdd); 
        fetchBooks();
    }, []);
    return (
        <div className="book-list">
            <Table className="mb-0">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Book Code</th>
                    <th>Book Name</th>
                    <th>Inventory</th>
                    <th>Author</th>
                    <th>Main Content</th>
                    <th>Description</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                { books.map(book => {
                    return <tr key={book.id}>
                        <th>{book.id}</th>
                        <td>{book.bookCode}</td>
                        <td>{book.bookName}</td>
                        <td>{book.inventory}</td>
                        <td>{book.author}</td>
                        <td>{book.mainContent}</td>
                        <td>{book.description}</td>
                        <td>
                            <Button title="Edit book" outline className="mb-2 mr-2 btn-transition"
                                                    color="warning" size="sm" 
                                                    onClick={() => setToggle(true)}>        
                                <FontAwesomeIcon icon={faEdit} size="1x"/>
                            </Button>
                            <Button title="Delete book" outline className="mb-2 mr-2 btn-transition"
                                                    color="danger" size="sm">
                                <FontAwesomeIcon icon={faTrashAlt} size="1x"/>
                            </Button>
                        </td>
                    </tr>                                                                                               
                }) }
                </tbody>
            </Table> 

            <BookForm />

            {/* Add Book && Edit Book */}
            {/* {
                isAdd && <BookForm />
            } */}
        </div>
    )
}