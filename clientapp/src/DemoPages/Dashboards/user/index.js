import React, { useState, useEffect, Fragment } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {
  faEdit,
  faTrashAlt,
  faCheckCircle,
  faTimesCircle

} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
  toast,
} from 'react-toastify';

import ButtonAdd from '../ButtonAdd';

library.add(
  fab,
  faEdit,
  faTrashAlt,
);

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
      .catch(() => {
        showToastError('Get user list failure!');
      })
  }, [userList.length]);

  const showToastSuccess = (message) => {
    toast['success'](message);
  }

  const showToastError = (message) => {
    toast['error'](message);
  }
 
  const addUser = () => {
    toggle();
    
    axios.post('user', {
      ...user
    })
      .then(res => {
        console.log(res);
        if (res.status == 200) {
          showToastSuccess('Add user success!');
        }
      })
      .catch(() => showToastError('Add user failure!'))
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
          showToastSuccess('Update user success!');
        }
      })
      .catch(() => showToastError('Update user failure!'))
      .finally(() => {
        setUserList([...userList, user ]);
      })
  }

  const deleteUser = () => {
    toggleDelete();

    axios.delete(`user/${user.id}`)
      .then(res => {
        if (res.status === 200) {
          showToastSuccess('Delete user success!');
        }
      })
      .catch(() => showToastError('Delete user failure!'))
      .finally(() => {
        setUserList([...userList, user ]);
      })
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
                    <Button title="Edit user" outline className="mb-2 mr-2 btn-transition"
                                            color="warning" size="sm" onClick={() => btnEditOnclick(user.id)}>
                      <FontAwesomeIcon icon={faEdit} size="1x"/>
                    </Button>
                    <Button title="Delete user" outline className="mb-2 mr-2 btn-transition"
                                            color="danger" size="sm" onClick={() => btnDeleteOnClick(user.id)}>
                      <FontAwesomeIcon icon={faTrashAlt} size="1x"/>
                    </Button>
                  </td>
                </tr>
              }) }
            </tbody>
          </Table> 

          {/* Add User */}
          <UserForm user={user} setUser={setUser} modal={modal} toggle={toggle} className={className} addUser={addUser} />
          

          {/* Edit User */}
          <UserForm user={user} setUser={setUser} modal={modalEdit} toggle={toggleEdit} className={className} addUser={editUser} isEdit={true} />
          

          {/* Delete User */}
          <Modal isOpen={modalDelete} toggle={toggleDelete} className={className} backdrop={true}>
            <ModalHeader toggle={toggleDelete}>Delete User</ModalHeader>
            <ModalBody>
              <h4>Are you sure delete this user?</h4>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={deleteUser}>
                <FontAwesomeIcon icon={faTrashAlt} size="1x"/>{' '} Delete</Button>{' '}
              <Button color="secondary" onClick={toggleDelete}>
                <FontAwesomeIcon icon={faTimesCircle} size="1x"/>{' '}Cancel</Button>  
            </ModalFooter>
          </Modal>

        </ReactCSSTransitionGroup>
    </Fragment>
  )
}

function UserForm(props) {
  const {
    user,
    setUser,
    modal, 
    toggle,
    className,
    addUser,
    isEdit = false,
  } = props;

  return (
    <Modal isOpen={modal} toggle={toggle} className={className} backdrop={true}>
      <ModalHeader toggle={toggle}>Add User</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="exampleEmail">User name</Label>
            <Input type="text" name="user name" id="username" placeholder="Input a user name" value={user.userName} onChange={e => setUser({...user, userName: e.target.value})} />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Password</Label>
            <Input readOnly={isEdit} type="password" name="password" id="password" value={user.password} onChange={e => setUser({...user, password: e.target.value})} />
          </FormGroup>
          <FormGroup>
            <Label for="exampleDescription">Description</Label>
            <Input type="text" name="description" id="description" value={user.description} onChange={e => setUser({...user, description: e.target.value})} />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={addUser}>
        <FontAwesomeIcon icon={faCheckCircle} size="1x"/>
          {' '}Accept</Button>{' '}
        <Button color="secondary" onClick={toggle}>
        <FontAwesomeIcon icon={faTimesCircle} size="1x"/>
          {' '}Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}

export default UserExample;