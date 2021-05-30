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

export default function BorrowBookForm(props) {
    const {
        borrowBook,
        setBorrowBook,
        borrowBookDetails,
        setBorrowBookDetails,
        modal,
        toggle,
        className,
        students,
        books,
        addBorrowBook,
        isEdit = false,
        formatDateForInput
    } = props;

    const [bookFilter, setBookFilter] = useState([...books]);

    const rowDetailChange = ({ index, value, column}) => {
      borrowBookDetails[index][column] = value;
      setBorrowBookDetails([
        ...borrowBookDetails.slice(0, index),
        borrowBookDetails[index],
        ...borrowBookDetails.slice(index + 1)
      ]);
    }

    const deleteBorrowBookDetail = index => {
      const arr = [...borrowBookDetails];
      arr.splice(index, 1);
      setBorrowBookDetails(arr);
    }

    return (
        <Modal size="lg" isOpen={modal} toggle={toggle} className={className} backdrop={true}>
            <ModalHeader toggle={toggle}>{ isEdit ? 'Edit ' : 'Add '} Borrow Book</ModalHeader>
            <ModalBody>
              <Form>
                <Row>
                  <Col sm="6">
                    <FormGroup>
                      <Label className="font-weight-bold" for="stduentcode">Borrow Book code</Label>
                      <Input readOnly={isEdit} invalid={borrowBook.borrowBookCode.length <= 1 || borrowBook.borrowBookCode.length > 10} 
                        valid={borrowBook.borrowBookCode.length > 1 && borrowBook.borrowBookCode.length < 11} type="text" name="borrowBook code" id="stduentcode" 
                        value={borrowBook.borrowBookCode} 
                        onChange={e => setBorrowBook({...borrowBook, borrowBookCode: e.target.value})} />
                      <FormFeedback>Lenght of Borrow Book code have to 2 -> 10!</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col sm="6">
                  <FormGroup>
                    <Label className="font-weight-bold" for="numberOfDayBorrow">Number of day borrow</Label>
                    <Input 
                        valid={borrowBook.numberOfDayBorrow >= 1}
                        invalid={borrowBook.numberOfDayBorrow < 1}
                        type="number" name="numberOfDayBorrow" id="numberOfDayBorrow" 
                        value={borrowBook.numberOfDayBorrow} 
                        onChange={e => setBorrowBook({...borrowBook, numberOfDayBorrow: e.target.value * 1})} />
                     <FormFeedback>Number of day borrow have to less than 0!</FormFeedback>
                  </FormGroup>
                </Col>
                  <Col sm="6">
                    <FormGroup>
                      <Label className="font-weight-bold" for="nodb">Borrow date</Label>
                      <Input
                        valid={borrowBook.borrowDate !== null} 
                        invalid={borrowBook.borrowDate === null}
                        type="date"
                        name="borrowdate"
                        id="borrowdate"
                        value={isEdit ? formatDateForInput(borrowBook.borrowDate) : borrowBook.borrowDate}
                        onChange={e => setBorrowBook({...borrowBook, borrowDate: e.target.value})}
                      />
                      <FormFeedback>You aren't choice borrow date!</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col sm="6">
                    <FormGroup>
                      <Label className="font-weight-bold" for="student_Id">Student</Label>
                      <Input valid={borrowBook.student_Id !== null && borrowBook.student_Id > 0} 
                      invalid={borrowBook.student_Id === null}
                        type="select" name="student_Id" id="student_Id"
                        value={borrowBook.student_Id}
                        onChange={e => setBorrowBook({...borrowBook, student_Id: e.target.value * 1 })}>
                        <option value={-1}>Unselect</option>
                        { 
                            students.length > 0 && students.map(item => {
                            return (<option value={item.id}>{`${item.studentCode}, ${item.studentName}`}</option>)
                            })
                        }
                        </Input>
                        <FormFeedback>You aren't choice student!</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col sm="12">
                    <FormGroup>
                      <Label className="font-weight-bold" for="exampleDescription">Description</Label>
                      <Input 
                        valid={borrowBook.description !== null && borrowBook.description.length > 0} 
                        type="textarea" name="description" id="description" 
                        value={borrowBook.description} 
                        onChange={e => setBorrowBook({...borrowBook, description: e.target.value})} />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>

              {/* Borrow book detail */}
              <div>
                <Button title="Add borrowBook detail row" className="mb-2 mr-2 btn-transition"
                                        onClick={() => setBorrowBookDetails([...borrowBookDetails, { borrowBookDetailCode: '', quantity: 0, description: '', book_Id: null }])}
                                        color="success" size="sm">
                  <FontAwesomeIcon icon={faPlusCircle} size="1x"/>
                </Button>
                <Table size="sm" className="mb-0">
                  <thead>
                    <tr>
                      <th>Idx</th>
                      <th>Borrow Book detail code</th>
                      <th>Quantity</th>
                      <th>Book</th>
                      <th>Description</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    { borrowBookDetails.length > 0 && borrowBookDetails.map((detail, index) => {
                        return <tr key={index + 1000}>
                          <th>{index + 1}</th>
                          <td>
                          <Input
                            invalid={detail.borrowBookDetailCode.length < 2 || detail.borrowBookDetailCode.length > 10}
                            type="text"
                            name="borrowBookDetailCode"
                            id="borrowBookDetailCode"
                            value={detail.borrowBookDetailCode}
                            onChange={e => rowDetailChange({ index, value: e.target.value, column: 'borrowBookDetailCode'})}
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
                            <Input type="select" name="book_Id" id="book_Id" size="sm" 
                              invalid={detail.book_Id == null || detail.book_Id < 1}
                              onChange={e => rowDetailChange({ index, value: e.target.value * 1, column: 'book_Id'})}
                              value={detail.book_Id}>
                            <option value={-1}>Unselect</option>
                            { 
                                books.map(item => {
                                return (<option value={item.id}>{`${item.bookCode}, ${item.bookName}`}</option>)
                                })
                            }
                            </Input>
                          </td>
                          {/* <td>
                            <Input type="text" size="sm" onChange={e => setBookFilter(searchTextChange(e.target.value))}  />
                          </td> */}
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
                            <Button title="Delete borrowBook detail" outline className="mb-2 mr-2 btn-transition"
                                                    onClick={() => deleteBorrowBookDetail(index)}
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
              <Button color="success" onClick={addBorrowBook}>
                <FontAwesomeIcon icon={faCheckCircle} size="1x"/>
                {' '}Accept</Button>{' '}
              <Button color="secondary" onClick={toggle}>
                <FontAwesomeIcon icon={faTimesCircle} size="1x"/>
                {' '}Cancel</Button>
            </ModalFooter>
          </Modal>
  )
}