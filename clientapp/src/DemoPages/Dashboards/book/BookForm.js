import React from 'react';
import {  Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {
  faCheckCircle,
  faEdit,
  faTimesCircle,
  faTrashAlt,

} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

library.add(
  fab,
  faEdit,
  faTrashAlt,
);

export default function BookForm(props) {

    const {
        book,
        bookCategories,
        modal,
        toggle,
        setBook,
        addBook,
        className,
        isEdit
    } = props;
    
    return (
        <Modal size="lg" isOpen={modal} toggle={toggle} className={className} backdrop={true}>
          <ModalHeader toggle={toggle}>{isEdit ? 'Edit Book' : 'Add Book'}</ModalHeader>
          <ModalBody>
            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label className="font-weight-bold" for="bookcode">Book code</Label>
                    <Input readOnly={isEdit} invalid={book.bookCode.length < 4} 
                      valid={book.bookCode.length > 3} type="text" name="book code" id="bookcode" 
                      value={book.bookCode} 
                      onChange={e => setBook({...book, bookCode: e.target.value})} />
                    <FormFeedback>Lenght of Book code have to less than 3!</FormFeedback>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label className="font-weight-bold" for="bookname">Book name</Label>
                    <Input 
                      valid={book.bookName.length > 0}
                      type="text" name="book name" id="bookname" 
                      value={book.bookName} 
                      onChange={e => setBook({...book, bookName: e.target.value})} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label className="font-weight-bold" for="nativeland">Inventory</Label>
                    <Input type="number" name="inventory" id="inventory" 
                      value={book.inventory} 
                      onChange={e => setBook({...book, inventory: e.target.value})} />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label className="font-weight-bold" for="author">Author</Label>
                    <Input 
                      valid={book.author != undefined && book.author.length > 0}
                      type="text" name="author" id="author" 
                      value={book.author} 
                      onChange={e => setBook({...book, author: e.target.value})} />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label className="font-weight-bold" for="bookCategory">Book Category</Label>
                    <Input valid={book.bookCategory_Id > 0} invalid={book.bookCategory_Id === -1}
                      type="select" name="bookCategory" id="bookCategory"
                      value={book.bookCategory_Id}
                      onChange={e => setBook({...book, bookCategory_Id: e.target.value })}>
                      <option value={-1}>Unselect</option>
                      { 
                        bookCategories.length > 0 && bookCategories.map(item => {
                          return (<option value={item.id}>{`${item.bookCategoryCode}, ${item.bookCategoryName}`}</option>)
                        })
                      }
                    </Input>
                    <FormFeedback>You aren't choice book category!</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label className="font-weight-bold" for="mainContent">Main content</Label>
                    <Input
                      valid={book.mainContent != undefined && book.mainContent.length > 0} 
                      type="textarea" name="mainContent" id="mainContent" 
                      value={book.mainContent} 
                      onChange={e => setBook({...book, mainContent: e.target.value})} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label className="font-weight-bold" for="exampleDescription">Description</Label>
                    <Input 
                      valid={book.description != undefined && book.description.length > 0}
                      type="textarea" name="description" id="description" 
                      value={book.description} 
                      onChange={e => setBook({...book, description: e.target.value})} />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={addBook}>
              <FontAwesomeIcon icon={faCheckCircle} size="1x"/>
              {' '}Accept</Button>{' '}
            <Button color="secondary" onClick={toggle}>
              <FontAwesomeIcon icon={faTimesCircle} size="1x"/>
              {' '}Cancel</Button>
          </ModalFooter>
        </Modal>
    )
}