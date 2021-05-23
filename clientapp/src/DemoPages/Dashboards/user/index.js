import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {
  faEdit,
  faTrashAlt,
  faSyncAlt,
  faCheckCircle,
  faTimesCircle,

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
  faSyncAlt,
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
  const [modalResetPass, setModalResetPass] = useState(false);
  const [user, setUser] = useState({ userName: "", password: "", passwordConfirm: '', description: '' });

  const toggle = () => setModal(!modal);
  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleDelete = () => setModalDelete(!modalDelete);
  const toggleResetPass = () => setModalResetPass(!modalResetPass);

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
    if (!checkPasswordConfirm(user.password, user.passwordConfirm)) {
      showToastError('Password confirm is invalid!');
      return;
    }
    toggle();
    
    axios.post('user', {
      ...user
    })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
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
        if (res.status === 200) {
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

  const resetPassword = () => {
    toggleResetPass();

    axios.put(`user/reset_password/${user.id}`)
      .then(res => {
        if (res.data.status === 500)
        {
          showToastError('Reset password failure, ' + res.data.message);
          return;
        }
        showToastSuccess('Reset password success!');
      })
  }

  const btnAddOnclick = () => {
    resetUser();
    setModal(true);
  }

  const btnEditOnclick = (id) => {
    const user = userList.find(u => u.id === id);
    console.log(user);
    user.password = '';
    setUser(user);
    setModalEdit(!modalEdit);
  }

  const btnDeleteOnClick = (id) => {
    setUser({ ...user, id: id });
    setModalDelete(!modalDelete);
  }

  const checkPasswordConfirm = (pass, passCon) => {
    if (pass === '' && passCon === '' && user.id !== undefined)
      return true;
    if (pass === passCon && pass !== '') 
      return true;
    return false;
  }

  const resetUser = () => {
    setUser({ userName: "", password: "", passwordConfirm: '', description: '' })
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
                                            color="info" size="sm" onClick={() => btnEditOnclick(user.id)}>
                      <FontAwesomeIcon icon={faEdit} size="1x"/>
                    </Button>
                    <Button title="Delete user" outline className="mb-2 mr-2 btn-transition"
                                            color="danger" size="sm" onClick={() => btnDeleteOnClick(user.id)}>
                      <FontAwesomeIcon icon={faTrashAlt} size="1x"/>
                    </Button>
                    <Button title="Reset password" outline className="mb-2 mr-2 btn-transition"
                                            color="warning" size="sm" onClick={() => {setModalResetPass(!modalResetPass)
                                            setUser({...user, id: user.id})}}>
                    <FontAwesomeIcon icon={faSyncAlt} size="1x"/>
                    </Button>
                  </td>
                </tr>
              }) }
            </tbody>
          </Table> 

          {/* Add User */}
          <UserForm user={user} setUser={setUser} modal={modal} toggle={toggle} 
            className={className} checkPasswordConfirm={checkPasswordConfirm} addUser={addUser} />
          

          {/* Edit User */}
          <UserForm user={user} setUser={setUser} modal={modalEdit} toggle={toggleEdit} 
            lassName={className} checkPasswordConfirm={checkPasswordConfirm} addUser={editUser} isEdit={true} />
          

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

          {/* Reset Password User */}
          <Modal isOpen={modalResetPass} toggle={toggleResetPass} className={className} backdrop={true}>
            <ModalHeader toggle={toggleResetPass}>Reset Password User</ModalHeader>
            <ModalBody>
              <h4>Are you sure reset password become '1' this user?</h4>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={resetPassword}>
              <FontAwesomeIcon icon={faSyncAlt} size="1x"/>{' '}Reset</Button>{' '}
              <Button color="secondary" onClick={toggleResetPass}>
              <FontAwesomeIcon icon={faTimesCircle} size="1x"/>
              {' '}Cancel</Button>
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
    checkPasswordConfirm,
    isEdit = false,
  } = props;

  return (
    <Modal isOpen={modal} toggle={toggle} className={className} backdrop={true}>
      <ModalHeader toggle={toggle}>{ isEdit ? 'Edit ' : 'Add ' } User</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label className="font-weight-bold" for="username">User name</Label>
            <Input 
              valid={user.userName.length > 1}  invalid={user.userName.length <= 1}
              readOnly={isEdit}
              type="text" name="user name" id="username" value={user.userName} onChange={e => setUser({...user, userName: e.target.value})} />
            <FormFeedback>User name length have to less than 1</FormFeedback>
          </FormGroup>
          { !isEdit && 
          <Row>
            <Col>
              <FormGroup>
                <Label className="font-weight-bold" for="password">Password</Label>
                <Input 
                  valid={user.password !== '' && checkPasswordConfirm(user.password, user.passwordConfirm)} 
                  invalid={!checkPasswordConfirm(user.password, user.passwordConfirm)}
                  type="password" name="password" id="password" value={user.password} onChange={e => setUser({...user, password: e.target.value})} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label className="font-weight-bold" for="passwordConfirm">Password Confirm</Label>
                <Input 
                  valid={!isEdit && user.password !== '' && checkPasswordConfirm(user.password, user.passwordConfirm)} 
                  invalid={!checkPasswordConfirm(user.password, user.passwordConfirm)}
                  type="password" name="passwordConfirm" id="passwordConfirm" value={user.passwordConfirm} onChange={e => setUser({...user, passwordConfirm: e.target.value})} />
               <FormFeedback>Password confirm have to equal password!</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          }
          <FormGroup>
            <Label className="font-weight-bold" for="description">Description</Label>
            <Input valid={user.description.length > 0} type="textarea" name="description" id="description" value={user.description} onChange={e => setUser({...user, description: e.target.value})} />
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