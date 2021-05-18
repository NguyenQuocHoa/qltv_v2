import React, { useState, useEffect, Fragment } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
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

import {
  ToastContainer,
  toast,
  Bounce,
  Slide,
  Flip,
  Zoom
} from 'react-toastify';


import ButtonAdd from '../ButtonAdd';

function UserExample(props) {
  const {
    buttonLabel,
    className
  } = props;
  const [userList, setUserList] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [user, setUser] = useState({ userName: "user name", password: "password", description: null });

  const toggle = () => setModal(!modal);
  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleDelete = () => setModalDelete(!modalDelete);

  useEffect(() => {
    axios.get('user')
      .then((res) => {
        if (res.status === 200) {
          setUserList(res.data)
        }
        else {
          console.log(res);
        }
      })
  }, [userList.length]);

  // config for show notification 
  // const isDefaultProps = () => {
  //   return (
  //     this.state.position === 'top-right' &&
  //     (this.state.autoClose === 5000 && !this.state.disableAutoClose) &&
  //     !this.state.hideProgressBar &&
  //     !this.state.newestOnTop &&
  //     !this.state.rtl &&
  //     this.state.pauseOnFocusLoss &&
  //     this.state.pauseOnHover &&
  //     this.state.closeOnClick &&
  //     this.state.draggable
  //   );
  // }
 
  const addUser = () => {
    toggle();
    
    axios.post('user', {
      ...user
    })
      .then(res => {
        console.log(res);
        if (res.status == 200) {
          console.log("OK");
        }
      })
      .finally(() => {
        setUserList([...userList, user ]);
      })
  }

  const editUser = () => {
    toggleEdit();

    axios.put(`user/${user.id}`, {
      ...user
    })
      .then(res => {
        console.log(res);
        if (res.status == 200) {
          console.log("OK");
        }
      })
      .finally(() => {
        setUserList([...userList, user ]);
      })
  }

  const deleteUser = () => {
    toggleDelete();

    axios.delete(`user/${user.id}`)
      .then(res => {
        if (res.status === 200) {
          console.log("Delete success");
        }
      })
      .finally(() => {
        setUserList([...userList, user ]);
      })
  }

  const inputUserNameChange = (event) => {
    setUser({ ...user, userName: event.target.value });
  }

  const inputPasswordChange = (event) => {
    setUser({ ...user, password: event.target.value });
  }

  const inputDescriptionChange = (event) => {
    setUser({ ...user, description: event.target.value });
  }

  const btnAddOnclick = () => {
    setModal(true);
  }

  const btnEditOnclick = (id) => {
    const user = userList.find(u => u.id == id);
    console.log(user);
    user.password = '';
    setUser(user);
    setModalEdit(!modalEdit);
  }

  const btnDeleteOnClick = (id) => {
    setUser({ ...user, id: id });
    setModalDelete(!modalDelete);
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
          <ButtonAdd btnAddChange={btnAddOnclick} text="Add User" />
          <Table className="mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>User name</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { userList.map(user => {
                return <tr key={user.id}>
                  <th>{user.id}</th>
                  <td>{user.userName}</td>
                  <td>{user.description}</td>
                  <td>
                    <Button outline className="mb-2 mr-2 btn-transition"
                                            color="warning" size="sm" onClick={() => btnEditOnclick(user.id)}>
                      <FontAwesomeIcon icon={faEdit} size="1x"/>
                    </Button>
                    <Button outline className="mb-2 mr-2 btn-transition"
                                            color="danger" size="sm" onClick={() => btnDeleteOnClick(user.id)}>
                      <FontAwesomeIcon icon={faTrashAlt} size="1x"/>
                    </Button>
                  </td>
                </tr>
              }) }
            </tbody>
          </Table> 

          {/* Add User */}
          <Modal isOpen={modal} toggle={toggle} className={className} backdrop={true}>
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
          </Modal>
          

          {/* Edit User */}
          <Modal isOpen={modalEdit} toggle={toggleEdit} className={className} backdrop={true}>
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
          </Modal>

          {/* Delete User */}
          <Modal isOpen={modalDelete} toggle={toggleDelete} className={className} backdrop={true}>
            <ModalHeader toggle={toggleDelete}>Delete User</ModalHeader>
            <ModalBody>
              <h4>Are you sure delete this user?</h4>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={deleteUser}>Delete</Button>{' '}
              <Button color="secondary" onClick={toggleDelete}>Cancel</Button>
            </ModalFooter>
          </Modal>

        </ReactCSSTransitionGroup>
    </Fragment>
  )
}

export default UserExample;