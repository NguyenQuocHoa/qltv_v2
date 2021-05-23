import React, { useState, useEffect, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {
  faEdit,
  faTrashAlt,
  faTimesCircle

} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
  toast,
} from 'react-toastify';

import ButtonAdd from '../ButtonAdd';
import BookList from './BookList';
import BookFrom from './BookForm';

library.add(
  fab,
  faEdit,
  faTrashAlt,
  faTimesCircle
);

export default function BookExample(props) {
  const {
    buttonLabel,
    className
  } = props;
  
  const [books, setBooks] = useState([]);
  const [book, setBook] =  useState({ bookCode: '', bookName: '', inventory: 0, author: undefined, mainContent: undefined, description: undefined, bookCategory_Id: -1 });
  const [bookCategories, setBookCategories] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleDelete = () => setModalDelete(!modalDelete);

  useEffect(() => {
    getBookCategories();
    getBooks();
  }, []);

  const showToastSuccess = (message) => {
    toast['success'](message);
  }

  const showToastError = (message) => {
    toast['error'](message);
  }

  const getBookCategories = () => {
    axios.get('/bookcategory')
      .then(res => {
        setBookCategories(res.data);
      })
  }

  const getBooks= () => {
    axios.get('/book')
      .then(res => {
        setBooks(res.data);
      })
  }

  const addBook = () => {
    axios.post('book', {
      ...book,
      inventory: book.inventory * 1,
      bookCategory_Id: book.bookCategory_Id * 1
    })
      .then(res => {
        if (res.data.status === 500) 
        {
          showToastError('Add book failure, ' + res.data.message);
          return;
        }
        toggle();
        showToastSuccess('Add book success!');
      })
      .finally(() => {
        getBooks();
      })
  }

  const editBook = () => {
    toggleEdit();

    axios.put(`book/${book.id}`, {
      ...book,
      inventory: book.inventory * 1,
      bookCategory_Id: book.bookCategory_Id * 1
    })
      .then(res => {
        if (res.data.status === 500)
        {
          showToastError('Update book failure, ' + res.data.message);
          return;
        }
        showToastSuccess('Update book success!');
      })
      .finally(() => {
        getBooks();
      })
  }

  const deleteBook = () => {
    toggleDelete();

    axios.delete(`book/${book.id}`)
      .then(res => {
        showToastSuccess('Delete book success!');
      })
      .finally(() => getBooks());
  }

  const btnAddOnclick = () => {
    resetForm();
    setModal(true);
  }

  const btnEditOnclick = (id) => {
    const book = books.find(u => u.id == id);
    setBook(book);
    setModalEdit(!modalEdit);
  }

  const btnDeleteOnclick = (id) => {
    setBook({...book, id });
    setModalDelete(!modalDelete);
  }

  const resetForm = () => setBook({ bookCode: '', bookName: '', inventory: 0, author: undefined, mainContent: undefined, description: undefined, bookCategory_Id: -1 });

  return (
    <Fragment>
      <ReactCSSTransitionGroup
        component="div"
        transitionName="TabsAnimation"
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}>
        <ButtonAdd btnAddChange={btnAddOnclick} text="Add Book" />

        {/* Book list */}
        <BookList books={books} btnEditOnclick={btnEditOnclick} btnDeleteOnclick={btnDeleteOnclick} />


        {/* Add book */}
        <BookFrom book={book} bookCategories={bookCategories} 
          modal={modal} toggle={toggle} setBook={setBook} addBook={addBook} className={className} />


        {/* Book Detail && edit */}
        <BookFrom book={book} bookCategories={bookCategories} 
          modal={modalEdit} toggle={toggleEdit} setBook={setBook} addBook={editBook} className={className} isEdit={true} />


        {/* Delete Book */}
        <Modal isOpen={modalDelete} toggle={toggleDelete} className={className} backdrop={true}>
          <ModalHeader toggle={toggleDelete}>Delete Book</ModalHeader>
          <ModalBody>
            <h4>Are you sure delete this book?</h4>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={deleteBook}>
              <FontAwesomeIcon icon={faTrashAlt} size="1x"/>{' '} Delete</Button>{' '}
            <Button color="secondary" onClick={toggleDelete}>
              <FontAwesomeIcon icon={faTimesCircle} size="1x"/>{' '}Cancel</Button>
          </ModalFooter>
        </Modal>

      </ReactCSSTransitionGroup>
    </Fragment>
  )
}