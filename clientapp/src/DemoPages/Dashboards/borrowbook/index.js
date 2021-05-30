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
import BorrowBookList from './BorrowBookList';
import BorrowBookForm from './BorrowBookForm';

library.add(
  fab,
  faEdit,
  faTrashAlt,
);

function BorrowBookExample(props) {
  const {
    buttonLabel,
    className
  } = props;
  const [borrowBookList, setBorrowBookList] = useState([]);
  const [borrowBookDetails, setBorrowBookDetails] = useState([]);
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [borrowBook, setBorrowBook] = useState(
    { borrowBookCode: '', borrowDate: null, numberOfDayBorrow: 0, description: '', student_Id: null }
  );

  const toggle = () => setModal(!modal);
  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleDelete = () => setModalDelete(!modalDelete);

  useEffect(() => {
    getBorrowBooks();
    getStudents();
    getBooks();
  }, []);

  const showToastSuccess = (message) => {
    toast['success'](message);
  }

  const showToastError = (message) => {
    toast['error'](message);
  }

  const getStudents = () => {
    axios.get('student')
      .then(res => {
        if (res.data.status === 500)
        {
          showToastError('Get student list failure, ' + res.data.message);
          return;
        }
        setStudents(res.data);
      })
  }

  const getBooks = () => {
    axios.get('book')
      .then(res => {
        if (res.data.status === 500)
        {
          showToastError('Get book list failure, ' + res.data.message);
          return;
        }
        setBooks(res.data);
      })
  }

  const getBorrowBooks = () => {
    axios.get('borrowBook')
    .then((res) => {
      if (res.data.status === 500)
      {
        showToastError('Get borrowBook list failure, ' + res.data.message);
        return;
      }
      setBorrowBookList(res.data);
    })
  }
 
  const addBorrowBook = () => {
    if (!checkForm()) 
      return;
    
    toggle();
    
    axios.post('borrowBook', {
      borrowBook: {...borrowBook, numberOfDayBorrow: borrowBook.numberOfDayBorrow * 1, student_Id: borrowBook.student_Id * 1},
      borrowBookDetails: borrowBookDetails,
    })
      .then(res => {
        if (res.data.status === 500) 
        {
          showToastError('Add borrowBook failure, ' + res.data.message);
          return;
        }
          showToastSuccess('Add borrowBook success!');
      })
      .finally(() => {
        getBorrowBooks();
      })
  }

  const editBorrowBook = () => {
    if (!checkForm())
      return;
    toggleEdit();

    axios.put(`borrowBook/${borrowBook.id}`, {
      borrowBook: { ...borrowBook },
      borrowBookDetails: borrowBookDetails.map(item => ({...item, id: 0}))
    })
      .then(res => {
        if (res.data.status === 500)
        {
          showToastError('Update borrowBook failure, ' + res.data.message);
          return;
        }
        showToastSuccess('Update borrowBook success!');
      })
      .finally(() => {
        getBorrowBooks();
      })
  }

  const deleteBorrowBook = () => {
    toggleDelete();

    axios.delete(`borrowBook/${borrowBook.id}`)
      .then(res => {
        if (res.data.status === 500)
        {
          showToastError('Delete borrowBook failure, ' + res.data.message);
          return;
        }
        showToastSuccess('Delete borrowBook success!');
      })
      .finally(() => {
        getBorrowBooks();
      })
  }

  const btnAddOnclick = () => {
    resetBorrowBookForm();
    setModal(true);
  }

  const btnEditOnclick = (id) => {
    resetBorrowBookForm();
    const br = borrowBookList.find(u => u.id === id);
    console.log(br);
    setBorrowBook({ id: br.id, borrowBookCode: br.borrowBookCode, numberOfDayBorrow: br.numberOfDayBorrow, 
      borrowDate: br.borrowDate, description: br.description, student_Id: br.student_Id });
    setBorrowBookDetails(br.borrowBookDetails);
    setModalEdit(!modalEdit);
  }

  const btnDeleteOnClick = (id) => {
    setBorrowBook({ ...borrowBook, id: id });
    setModalDelete(!modalDelete);
  }

  const resetBorrowBookForm = () => {
    setBorrowBook(
      { borrowBookCode: '', borrowDate: null, numberOfDayBorrow: 0, description: '', student_Id: null }
    );
    setBorrowBookDetails([]);
  }

  const checkForm = () => {
    if (!borrowBook.borrowBookCode || borrowBook.borrowBookCode.length < 2) {
      showToastError('Borrow book code is invalid!');
      return false;
    }

    if (!borrowBook.numberOfDayBorrow || borrowBook.numberOfDayBorrow < 1) {
      showToastError('Number of day borrow is invalid!');
      return false;
    }

    if (!borrowBook.borrowDate) {
      showToastError('Borrow date is invalid!');
      return false;
    }

    if (!borrowBook.student_Id) {
      showToastError("You aren't choice student!");
      return false;
    }

    if (borrowBookDetails.length < 1) {
      showToastError('Borrow book detail at least one item!');
      return;
    }

    for (let item of borrowBookDetails) {
      if (item.borrowBookDetailCode < 2 || item.borrowBookDetailCode > 10) {
        showToastError('Borrow book detail code is invalid!');
        return false;
      }
      if (item.quantity < 1) {
        showToastError('Quantity of borrow book detail is invaid!');
        return false;
      }
      if (item.book_Id == null) {
        showToastError('Please choice book!');
        return false;
      }
    }
    return true;
  }

  const formatDate = d => {
    let da = new Date(d);
    const outPut = da.getDate() + '/' + (da.getMonth() + 1) + '/' + da.getFullYear();
    return outPut;
  }

  const formatDateForInput = d => {
    let da = new Date(d);
    const m =  da.getMonth() + 1 > 10 ? da.getMonth() : '0' + (da.getMonth() + 1);
    const date = da.getDate() > 10 ? da.getDate() : '0' + da.getDate();
    const outPut = da.getFullYear() + '-' + m + '-' + date;
    return outPut;
  }

  return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}>


          <ButtonAdd btnAddChange={btnAddOnclick} text="Add Borrow Book" />

          {/* BorrowBook List */}
          <BorrowBookList borrowBookList={borrowBookList} setBorrowBook={setBorrowBook} formatDate={formatDate} 
          btnEditOnclick={btnEditOnclick} btnDeleteOnClick={btnDeleteOnClick} />
          

          {/* Add BorrowBook */}
          <BorrowBookForm borrowBook={borrowBook} setBorrowBook={setBorrowBook} modal={modal} toggle={toggle} 
            className={className} students={students} addBorrowBook={addBorrowBook} 
            borrowBookDetails={borrowBookDetails} setBorrowBookDetails={setBorrowBookDetails} 
            books={books} />
          

          {/* Edit BorrowBook */}
          <BorrowBookForm borrowBook={borrowBook} setBorrowBook={setBorrowBook} modal={modalEdit} toggle={toggleEdit} 
            className={className} students={students} addBorrowBook={editBorrowBook} isEdit={true}
            formatDateForInput={formatDateForInput} borrowBookDetails={borrowBookDetails} 
            setBorrowBookDetails={setBorrowBookDetails} books={books} />


          {/* Delete BorrowBook */}
          <Modal isOpen={modalDelete} toggle={toggleDelete} className={className} backdrop={true}>
            <ModalHeader toggle={toggleDelete}>Delete BorrowBook</ModalHeader>
            <ModalBody>
              <h4>Are you sure delete this borrowBook?</h4>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={deleteBorrowBook}>
              <FontAwesomeIcon icon={faTrashAlt} size="1x"/>{' '}Delete</Button>{' '}
              <Button color="secondary" onClick={toggleDelete}>
              <FontAwesomeIcon icon={faTimesCircle} size="1x"/>
              {' '}Cancel</Button>
            </ModalFooter>
          </Modal>

        </ReactCSSTransitionGroup>
    </Fragment>
  )
}

export default BorrowBookExample;