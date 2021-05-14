import React, { useState, useEffect, Fragment } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';

import ButtonAdd from '../ButtonAdd';

function UserExample(props) {
  const {
    buttonLabel,
    className
  } = props;
  const [userList, setUserList] = useState([]);
  const [modal, setModal] = useState(false);
  const [keyboard, setKeyboard] = useState(true);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    axios.get('user')
      .then((res) => {
        if (res.status === 200) {
          setUserList(res.data)
        }
        else {
          console.log("Server error");
        }
      })
  });

  const btnAddChange = () => {
    setModal(true);
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
          <ButtonAdd btnAddChange={btnAddChange} text="Add User" />
          <Table className="mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              { userList.map(user => {
                return <tr key={user.id}>
                  <th>{user.id}</th>
                  <td>{user.userName}</td>
                  <td>{user.password}</td>
                </tr>
              }) }
            </tbody>
          </Table> 
          <Modal isOpen={modal} toggle={toggle} className={className} backdrop={true}>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">User name</Label>
                  <Input type="text" name="user name" id="username" placeholder="Input a user name" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Password</Label>
                  <Input type="password" name="password" id="password" />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggle}>Add User</Button>{' '}
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </ReactCSSTransitionGroup>
    </Fragment>
  )
}

export default UserExample;