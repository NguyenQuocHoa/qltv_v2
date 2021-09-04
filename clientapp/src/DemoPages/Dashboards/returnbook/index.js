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
import ReturnBookList from './ReturnBookList';
import ReturnBookForm from './ReturnBookForm';

library.add(
  fab,
  faEdit,
  faTrashAlt,
);

function ReturnBookExample(props) {
  const {
    buttonLabel,
    className
  } = props;
  const [returnBookList, setReturnBookList] = useState([]);
  const [returnBookDetails, setReturnBookDetails] = useState([]);
  const [borrowBooks, setBorrowBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [returnBook, setReturnBook] = useState(
    { returnBookCode: '', returnDate: null, numberOfDayBorrow: 0, description: '', student_Id: null, borrowBook_Id: -1 }
  );

  const toggle = () => setModal(!modal);
  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleDelete = () => setModalDelete(!modalDelete);

  useEffect(() => {
    getReturnBooks();
    getBorrowBooks();
    getBooks();
  }, []);

  const showToastSuccess = (message) => {
    toast['success'](message);
  }

  const showToastError = (message) => {
    toast['error'](message);
  }

  const getBorrowBooks = () => {
    axios.get('borrowbook/getall_withstudent')
    .then(res => {
      if (res.data.status === 500)
      {
        showToastError('Get borrow book list failure, ' + res.data.message);
        return;
      }
      setBorrowBooks(res.data);
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

  const getReturnBooks = () => {
    axios.get('returnBook')
    .then((res) => {
      if (res.data.status === 500)
      {
        showToastError('Get returnBook list failure, ' + res.data.message);
        return;
      }
      setReturnBookList(res.data);
    })
  }
 
  const addReturnBook = () => {
    // if (!checkForm()) 
    //   return;
    
    toggle();
    console.log(returnBook);
    axios.post('returnBook', {
      returnBook: {...returnBook, borrowBook_Id: +returnBook.borrowBook_Id, numberOfDayBorrow: returnBook.numberOfDayBorrow * 1 },
      returnBookDetails: returnBookDetails,
    })
      .then(res => {
        if (res.data.status === 500) 
        {
          showToastError('Add returnBook failure, ' + res.data.message);
          return;
        }
          showToastSuccess('Add returnBook success!');
      })
      .finally(() => {
        getReturnBooks();
      })
  }

  const editReturnBook = () => {
    // if (!checkForm())
    //   return;
    // toggleEdit();

    axios.put(`returnBook/${returnBook.id}`, {
      returnBook: { ...returnBook },
      returnBookDetails: returnBookDetails.map(item => ({...item, id: 0}))
    })
      .then(res => {
        if (res.data.status === 500)
        {
          showToastError('Update returnBook failure, ' + res.data.message);
          return;
        }
        showToastSuccess('Update returnBook success!');
      })
      .finally(() => {
        getReturnBooks();
      })
  }

  const deleteReturnBook = () => {
    toggleDelete();

    axios.delete(`returnBook/${returnBook.id}`)
      .then(res => {
        if (res.data.status === 500)
        {
          showToastError('Delete returnBook failure, ' + res.data.message);
          return;
        }
        showToastSuccess('Delete returnBook success!');
      })
      .finally(() => {
        getReturnBooks();
      })
  }

  const btnAddOnclick = () => {
    resetReturnBookForm();
    setModal(true);
  }

  const btnEditOnclick = (id) => {
    resetReturnBookForm();
    axios.get(`returnbook/${id}`)
      .then(res => {
        if (res.status !== 500) {
          console.log(res.data);
          const rb = res.data;
          setReturnBook({ id: rb.id, returnBookCode: rb.returnBookCode, numberOfDayBorrow: rb.numberOfDayBorrow, 
          returnDate: rb.borrowDate, description: rb.description, student_Id: rb.student_Id, borrowBoook_Id: rb.borrowBook_Id });
          setReturnBookDetails(rb.returnBookDetails);
          setModalEdit(!modalEdit);
        }
      })
    // setReturnBook({ id: rb.id, returnBookCode: rb.returnBookCode, numberOfDayBorrow: rb.numberOfDayBorrow, 
    //  returnDate: rb.borrowDate, description: rb.description, student_Id: rb.student_Id, borrowBoook_Id: rb.borrowBook_Id });
    // setReturnBookDetails(rb.returnBookDetails);
    // setModalEdit(!modalEdit);
  }

  const btnDeleteOnClick = (id) => {
    setReturnBook({ ...returnBook, id: id });
    setModalDelete(!modalDelete);
  }

  const resetReturnBookForm = () => {
    setReturnBook(
      { returnBookCode: '', returnDate: null }
    );
    setReturnBookDetails([]);
  }

  // const checkForm = () => {
  //   if (!returnBook.returnBookCode || returnBook.returnBookCode.length < 2) {
  //     showToastError('Borrow book code is invalid!');
  //     return false;
  //   }

  //   if (!returnBook.numberOfDayBorrow || returnBook.numberOfDayBorrow < 1) {
  //     showToastError('Number of dayreturn is invalid!');
  //     return false;
  //   }

  //   if (!returnBook.borrowDate) {
  //     showToastError('Borrow date is invalid!');
  //     return false;
  //   }

  //   if (!returnBook.student_Id) {
  //     showToastError("You aren't choice student!");
  //     return false;
  //   }

  //   if (returnBookDetails.length < 1) {
  //     showToastError('Borrow book detail at least one item!');
  //     return;
  //   }

  //   for (let item of returnBookDetails) {
  //     if (item.returnBookDetailCode < 2 || item.returnBookDetailCode > 10) {
  //       showToastError('Borrow book detail code is invalid!');
  //       return false;
  //     }
  //     if (item.quantity < 1) {
  //       showToastError('Quantity ofreturn book detail is invaid!');
  //       return false;
  //     }
  //     if (item.book_Id == null) {
  //       showToastError('Please choice book!');
  //       return false;
  //     }
  //   }
  //   return true;
  // }

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


          <ButtonAdd btnAddChange={btnAddOnclick} text="Add Return Book" />

          {/* ReturnBook List */}
          <ReturnBookList returnBookList={returnBookList} setReturnBook={setReturnBook} formatDate={formatDate} 
          btnEditOnclick={btnEditOnclick} btnDeleteOnClick={btnDeleteOnClick} />
          

          {/* Add ReturnBook */}
          <ReturnBookForm returnBook={returnBook} setReturnBook={setReturnBook} modal={modal} toggle={toggle} 
            className={className} borrowBooks={borrowBooks} addReturnBook={addReturnBook} 
            returnBookDetails={returnBookDetails} setReturnBookDetails={setReturnBookDetails} 
            books={books} />
          

          {/* Edit ReturnBook */}
          <ReturnBookForm returnBook={returnBook} setReturnBook={setReturnBook} modal={modalEdit} toggle={toggleEdit} 
            className={className} borrowBooks={borrowBooks} addReturnBook={editReturnBook} isEdit={true}
            formatDateForInput={formatDateForInput} returnBookDetails={returnBookDetails} 
            setReturnBookDetails={setReturnBookDetails} books={books} />


          {/* Delete ReturnBook */}
          <Modal isOpen={modalDelete} toggle={toggleDelete} className={className} backdrop={true}>
            <ModalHeader toggle={toggleDelete}>Delete ReturnBook</ModalHeader>
            <ModalBody>
              <h4>Are you sure delete this return book?</h4>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={deleteReturnBook}>
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

export default ReturnBookExample;