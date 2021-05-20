import React, { useState, useEffect, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {
  toast,
} from 'react-toastify';

import BookList from '../bindings/book/BookList';

import ButtonAdd from '../ButtonAdd';

function BookExample(props) {
  const {
    buttonLabel,
    className,
  } = props;
  const [userList, setUserList] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  // const [user, setUser] = useState({ userName: "user name", password: "password", description: null });
  const [isAdd, setIsAdd] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleDelete = () => setModalDelete(!modalDelete);

//   useEffect(() => {
//     fetchBooks();
//   }, [userList.length]);

//   const showToastSuccess = (message) => {
//     toast['success'](message);
//   }

//   const showToastError = (message) => {
//     toast['error'](message);
//   }
 
//   const addUser = () => {
//     toggle();
    
//     axios.post('user', {
//       ...user
//     })
//       .then(res => {
//         console.log(res);
//         if (res.status == 200) {
//           showToastSuccess('Add user success!');
//         }
//       })
//       .catch(() => showToastError('Add user failure!'))
//       .finally(() => {
//         setUserList([...userList, user ]);
//       })
//   }

//   const editUser = () => {
//     toggleEdit();

//     axios.put(`user/${user.id}`, {
//       ...user
//     })
//       .then(res => {
//         console.log(res);
//         if (res.status == 200) {
//           showToastSuccess('Update user success!');
//         }
//       })
//       .catch(() => showToastError('Update user failure!'))
//       .finally(() => {
//         setUserList([...userList, user ]);
//       })
//   }

//   const deleteUser = () => {
//     toggleDelete();

//     axios.delete(`user/${user.id}`)
//       .then(res => {
//         if (res.status === 200) {
//           showToastSuccess('Delete user success!');
//         }
//       })
//       .catch(() => showToastError('Delete user failure!'))
//       .finally(() => {
//         setUserList([...userList, user ]);
//       })
//   }

//   const inputUserNameChange = (event) => {
//     setUser({ ...user, userName: event.target.value });
//   }

//   const inputPasswordChange = (event) => {
//     setUser({ ...user, password: event.target.value });
//   }

//   const inputDescriptionChange = (event) => {
//     setUser({ ...user, description: event.target.value });
//   }

  const btnAddOnclick = () => {
    setIsAdd(!isAdd);
  }

//   const btnEditOnclick = (id) => {
//     const user = userList.find(u => u.id == id);
//     console.log(user);
//     user.password = '';
//     setUser(user);
//     setModalEdit(!modalEdit);
//   }

//   const btnDeleteOnClick = (id) => {
//     setUser({ ...user, id: id });
//     setModalDelete(!modalDelete);
//   }

  return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}>
            <ButtonAdd setIsAdd={setIsAdd} text="Add Book" />
          
          <BookList isAdd={isAdd} setIsAdd={setIsAdd} />

          {/* Add User */}
          {/* <Modal isOpen={modal} toggle={toggle} className={className} backdrop={true}>
            <ModalHeader toggle={toggle}>Add User</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">User name</Label>
                  <Input type="text" name="user name" id="username" placeholder="Input a user name" value={user.userName} onChange={inputUserNameChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Password</Label>
                  <Input type="password" name="password" id="password" value={user.password} onChange={inputPasswordChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleDescription">Description</Label>
                  <Input type="text" name="description" id="description" value={user.description} onChange={inputDescriptionChange} />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={addUser}>Accept</Button>{' '}
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal> */}
          

          {/* Edit User */}
          {/* <Modal isOpen={modalEdit} toggle={toggleEdit} className={className} backdrop={true}>
            <ModalHeader toggle={toggleEdit}>Edit User</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup disabled>
                  <Label for="exampleEmail">User name</Label>
                  <Input type="text" name="user name" id="username" placeholder="Input a user name" value={user.userName} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Password</Label>
                  <Input type="password" name="password" id="password" value={user.password} onChange={inputPasswordChange} placeholder="Keep old password let input empty" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleDescription">Description</Label>
                  <Input type="text" name="description" id="description" value={user.description} onChange={inputDescriptionChange} />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={editUser}>Accept</Button>{' '}
              <Button color="secondary" onClick={toggleEdit}>Cancel</Button>
            </ModalFooter>
          </Modal> */}

          {/* Delete User */}
          {/* <Modal isOpen={modalDelete} toggle={toggleDelete} className={className} backdrop={true}>
            <ModalHeader toggle={toggleDelete}>Delete User</ModalHeader>
            <ModalBody>
              <h4>Are you sure delete this user?</h4>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={deleteUser}>Delete</Button>{' '}
              <Button color="secondary" onClick={toggleDelete}>Cancel</Button>
            </ModalFooter>
          </Modal> */}

        </ReactCSSTransitionGroup>
    </Fragment>
  )
}

export default BookExample;