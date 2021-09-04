/* eslint-disable react/style-prop-object */
import React, { useState } from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback, Table } from 'reactstrap';

import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {
  faEdit,
  faTrashAlt,
  faCheckCircle,
  faTimesCircle,
  faPlusCircle,

} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

library.add(
  fab,
  faEdit,
  faTrashAlt,
  faCheckCircle,
  faTimesCircle,
  faPlusCircle,

);

export default function ReturnBookForm(props) {
    const {
        returnBook,
        setReturnBook,
        returnBookDetails,
        setReturnBookDetails,
        modal,
        toggle,
        className,
        borrowBooks,
        books,
        addReturnBook,
        isEdit = false,
        formatDateForInput
    } = props;

    const borrowBookChange = (e) => {
      if (e.target.value == -1) {
        setReturnBook({ ...returnBook, borrowBook_Id: e.target.value, studentName: '' });
        setReturnBookDetails([]);
        return;
      }
      const br = borrowBooks.find(item => item.id === e.target.value * 1);
      setReturnBook({ ...returnBook, borrowBook_Id: e.target.value, studentName: br.studentName });
      setReturnBookDetails(
        br.borrowBookDetails.map(detail => {
          return {
            returnBookDetailCode: '',
            quantity: detail.quantity,
            description: detail.description,
            bookCode: detail.bookCode,
            bookName: detail.bookName 
          }
        })
      );
    }

    const rowDetailChange = ({ index, value, column}) => {
      returnBookDetails[index][column] = value;
      setReturnBookDetails([
        ...returnBookDetails.slice(0, index),
        returnBookDetails[index],
        ...returnBookDetails.slice(index + 1)
      ]);
    }

    const deleteReturnBookDetail = index => {
      const arr = [...returnBookDetails];
      arr.splice(index, 1);
      setReturnBookDetails(arr);
    }

    return (
        <Modal size="lg" isOpen={modal} toggle={toggle} className={className} backdrop={true}>
            <ModalHeader toggle={toggle}>{ isEdit ? 'Edit ' : 'Add '} Return Book</ModalHeader>
            <ModalBody>
              <Form>
                <Row>
                  <Col sm="6">
                    <FormGroup>
                      <Label className="font-weight-bold" for="stduentcode">Return Book code</Label>
                      <Input readOnly={isEdit} invalid={returnBook.returnBookCode.length <= 1 || returnBook.returnBookCode.length > 10} 
                        valid={returnBook.returnBookCode.length > 1 && returnBook.returnBookCode.length < 11} type="text" name="returnBook code" id="stduentcode" 
                        value={returnBook.returnBookCode} 
                        onChange={e => setReturnBook({...returnBook, returnBookCode: e.target.value})} />
                      <FormFeedback>Lenght of Return Book code have to 2 -> 10!</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col sm="6">
                    <FormGroup>
                      <Label className="font-weight-bold" for="nodb">Return date</Label>
                      <Input
                        valid={returnBook.returnDate !== null} 
                        invalid={returnBook.returnDate === null}
                        type="date"
                        name="returnDate"
                        id="returnDate"
                        value={isEdit ? formatDateForInput(returnBook.returnDate) : returnBook.returnDate}
                        onChange={e => setReturnBook({...returnBook, returnDate: e.target.value})}
                      />
                      <FormFeedback>You aren't choice borrow date!</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col sm="6">
                    <FormGroup>
                      <Label className="font-weight-bold" for="borrowBook_Id">Borrow book</Label>
                      <Input valid={returnBook.borrowBook_Id !== null && returnBook.borrowBook_Id > 0} 
                      invalid={returnBook.borrowBook_Id === null || returnBook.borrowBook_Id < 1}
                        type="select" name="borrowBook_Id" id="borrowBook_Id"
                        value={returnBook.borrowBook_Id}
                        onChange={(e) => borrowBookChange(e)}>
                        <option value={-1}>Unselect</option>  
                        { 
                          borrowBooks.length > 0 && borrowBooks.map(item => {
                          return (<option key={`borrow_${item.id}`} value={item.id}>{`${item.borrowBookCode}`}</option>)
                          })
                        }
                        </Input>
                        <FormFeedback>You aren't choice borrow book!</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col sm="6">
                    <FormGroup>
                      <Label className="font-weight-bold" for="exampleDescription">Student</Label>
                      <Input 
                        readOnly={true}
                        type="text" name="studentName" id="studentName" 
                        value={returnBook.studentName} 
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>

              {/* Return book detail */}
              <div>
                <Button title="Add returnBook detail row" className="mb-2 mr-2 btn-transition"
                                        onClick={() => setReturnBookDetails([...returnBookDetails, { returnBookDetailCode: '', quantity: 0, description: '', bookName: null }])}
                                        color="success" size="sm">
                  <FontAwesomeIcon icon={faPlusCircle} size="1x"/>
                </Button>
                <Table size="sm" className="mb-0">
                  <thead>
                    <tr>
                      <th>Idx</th>
                      <th>Return Book detail code</th>
                      <th>Quantity</th>
                      <th>Book</th>
                      <th>Description</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    { returnBookDetails.length > 0 && returnBookDetails.map((detail, index) => {
                        return <tr key={index + 1000}>
                          <th>{index + 1}</th>
                          <td>
                            <Input
                              invalid={detail.returnBookDetailCode.length < 2 || detail.returnBookDetailCode.length > 10}
                              type="text"
                              name="returnBookDetailCode"
                              id="returnBookDetailCode"
                              value={detail.returnBookDetailCode}
                              onChange={e => rowDetailChange({ index, value: e.target.value, column: 'returnBookDetailCode'})}
                              size="sm"
                            />
                          </td>
                          <td>
                            <Input
                              invalid={detail.quantity < 1}
                              type="number"
                              name="quantity"
                              id="quantity"
                              value={detail.quantity}
                              onChange={e => rowDetailChange({ index, value: e.target.value * 1, column: 'quantity'})}
                              size="sm"
                            />
                          </td>
                          <td>
                            <Input
                              readOnly={true}
                              type="text"
                              name="bookName"
                              id="bookName"
                              value={`${detail.bookCode}, ${detail.bookName}`}
                              size="sm"
                            />
                          </td>
                          <td>
                            <Input
                              type="text"
                              name="description"
                              id="description"
                              value={detail.description}
                              onChange={e => rowDetailChange({ index, value: e.target.value, column: 'description'})}
                              size="sm"
                            />
                          </td>
                          <td>
                            <Button title="Delete returnBook detail" outline className="mb-2 mr-2 btn-transition"
                                                    onClick={() => deleteReturnBookDetail(index)}
                                                    color="danger" size="sm">
                            <FontAwesomeIcon icon={faTrashAlt} size="1x"/>
                            </Button>
                          </td>
                        </tr>
                    }) }
                  </tbody>
                </Table> 
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={addReturnBook}>
                <FontAwesomeIcon icon={faCheckCircle} size="1x"/>
                {' '}Accept</Button>{' '}
              <Button color="secondary" onClick={toggle}>
                <FontAwesomeIcon icon={faTimesCircle} size="1x"/>
                {' '}Cancel</Button>
            </ModalFooter>
          </Modal>
  )
}