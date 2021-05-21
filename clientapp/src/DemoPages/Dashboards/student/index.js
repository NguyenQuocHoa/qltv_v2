import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {
  faEdit,
  faSyncAlt,
  faTrashAlt,

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

function StudentExample(props) {
  const {
    buttonLabel,
    className
  } = props;
  const [studentList, setStudentList] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalResetPass, setModalResetPass] = useState(false);
  const [student, setStudent] = useState(
    { studentCode: '', studentName: '', class: '', doB: null, nativeLand: '', course: '', faculty: '', description: '', password: '', passwordConfirm: '' }
  );

  const toggle = () => setModal(!modal);
  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleDelete = () => setModalDelete(!modalDelete);
  const toggleResetPass = () => setModalResetPass(!modalResetPass);

  useEffect(() => {
    getStudents();
  }, []);

  const showToastSuccess = (message) => {
    toast['success'](message);
  }

  const showToastError = (message) => {
    toast['error'](message);
  }

  const getStudents = () => {
    axios.get('student')
    .then((res) => {
      if (res.data.status === 500)
      {
        showToastError('Get student list failure, ' + res.data.message);
        return;
      }
      setStudentList(res.data);
    })
  }
 
  const addStudent = () => {
    if (!checkPasswordConfirm(student.password, student.passwordConfirm)) {
      showToastError('Password confirm is invalid!');
      return;
    }
    toggle();
    
    axios.post('student', {
      ...student
    })
      .then(res => {
        if (res.data.status === 500) 
        {
          showToastError('Add student failure, ' + res.data.message);
          return;
        }
          showToastSuccess('Add student success!');
      })
      .finally(() => {
        getStudents();
      })
  }

  const editStudent = () => {
    if (!checkPasswordConfirm(student.password, student.passwordConfirm)) {
      showToastError('Password confirm is invalid!');
      return;
    }
    toggleEdit();

    axios.put(`student/${student.id}`, {
      ...student
    })
      .then(res => {
        if (res.data.status === 500)
        {
          showToastError('Update student failure, ' + res.data.message);
          return;
        }
        showToastSuccess('Update student success!');
      })
      .finally(() => {
        getStudents();
      })
  }

  const deleteStudent = () => {
    toggleDelete();

    axios.delete(`student/${student.id}`)
      .then(res => {
        if (res.data.status === 500)
        {
          showToastError('Delete student failure, ' + res.data.message);
          return;
        }
        showToastSuccess('Delete student success!');
      })
      .finally(() => {
        getStudents();
      })
  }

  const resetPassword = () => {
    toggleResetPass();

    axios.put(`student/reset_password/${student.id}`)
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
    resetStudentForm();
    setModal(true);
  }

  const btnEditOnclick = (id) => {
    const student = studentList.find(u => u.id === id);
    setStudent(student);
    setModalEdit(!modalEdit);
  }

  const btnDeleteOnClick = (id) => {
    setStudent({ ...student, id: id });
    setModalDelete(!modalDelete);
  }

  const checkPasswordConfirm = (pass, passCon) => {
    if (pass === '' && passCon === '' && student.id !== undefined)
      return true;
    if (pass === passCon && pass !== '') 
      return true;
    return false;
  }

  const resetStudentForm = () => {
    setStudent(
      { studentCode: '', studentName: '', class: '', doB: undefined, nativeLand: '', course: '', faculty: '', description: '', password: '', passwordConfirm: '' }
    )
  }

  const formatDate = d => {
    let da = new Date(d);
    const outPut = da.getDate() + '/' + da.getMonth() + '/' + da.getFullYear();
    return outPut;
  }

  const formatDateForInput = d => {
    let da = new Date(d);
    const m =  da.getMonth() > 10 ? da.getMonth() : '0' + da.getMonth();
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
          <ButtonAdd btnAddChange={btnAddOnclick} text="Add Student" />
          <Table className="mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Student code</th>
                <th>Student name</th>
                <th>Class</th>
                <th>DoB</th>
                <th>Nativeland</th>
                <th>Course</th>
                <th>Faculty</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { studentList.map(student => {
                return <tr key={student.id}>
                  <th>{student.id}</th>
                  <td>{student.studentCode}</td>
                  <td>{student.studentName}</td>
                  <td>{student.class}</td>
                  <td>{formatDate(student.doB)}</td>
                  <td>{student.nativeLand}</td>
                  <td>{student.course}</td>
                  <td>{student.faculty}</td>
                  <td>{student.description}</td>
                  <td>
                    <Button title="Edit student" outline className="mb-2 mr-2 btn-transition"
                                            color="warning" size="sm" onClick={() => btnEditOnclick(student.id)}>
                      <FontAwesomeIcon icon={faEdit} size="1x"/>
                    </Button>
                    <Button title="Delete student" outline className="mb-2 mr-2 btn-transition"
                                            color="danger" size="sm" onClick={() => btnDeleteOnClick(student.id)}>
                      <FontAwesomeIcon icon={faTrashAlt} size="1x"/>
                    </Button>
                    <Button title="Reset password" outline className="mb-2 mr-2 btn-transition"
                                            color="danger" size="sm" onClick={() => {setModalResetPass(!modalResetPass)
                                            setStudent({...student, id: student.id})}}>
                      <FontAwesomeIcon icon={faSyncAlt} size="1x"/>
                    </Button>
                  </td>
                </tr>
              }) }
            </tbody>
          </Table> 

          {/* Add Student */}
          <Modal size="lg" isOpen={modal} toggle={toggle} className={className} backdrop={true}>
            <ModalHeader toggle={toggle}>Add Student</ModalHeader>
            <ModalBody>
              <Form>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="stduentcode">Student code</Label>
                      <Input invalid={student.studentCode.length !== 10} 
                        valid={student.studentCode.length === 10} type="text" name="student code" id="stduentcode" 
                        value={student.studentCode} 
                        onChange={e => setStudent({...student, studentCode: e.target.value})} />
                      <FormFeedback>Lenght of Student code have to equal 10!</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="studentname">Student name</Label>
                      <Input type="text" name="student name" id="studentname" 
                        value={student.studentName} 
                        onChange={e => setStudent({...student, studentName: e.target.value})} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="class">Class</Label>
                      <Input type="text" name="class" id="class" 
                        value={student.class} 
                        onChange={e => setStudent({...student, class: e.target.value})} />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="dob">Date of Birth</Label>
                      <Input
                        type="date"
                        name="dob"
                        id="dob"
                        value={student.doB}
                        onChange={e => setStudent({...student, doB: e.target.value})}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="nativeland">Native land</Label>
                      <Input type="text" name="native land" id="nativeland" 
                        value={student.nativeLand} 
                        onChange={e => setStudent({...student, nativeLand: e.target.value})} />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="course">Course</Label>
                      <Input type="text" name="course" id="course" 
                        value={student.course} 
                        onChange={e => setStudent({...student, course: e.target.value})} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="faculty">Faculty</Label>
                      <Input type="text" name="faculty" id="faculty" 
                        value={student.faculty} 
                        onChange={e => setStudent({...student, faculty: e.target.value})} />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="exampleDescription">Description</Label>
                      <Input type="text" name="description" id="description" 
                        value={student.description} 
                        onChange={e => setStudent({...student, description: e.target.value})} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="password">Password</Label>
                      <Input valid={student.password !== '' && checkPasswordConfirm(student.password, student.passwordConfirm)} 
                        invalid={!checkPasswordConfirm(student.password, student.passwordConfirm)}
                        type="password" name="password" id="password" value={student.password} 
                        onChange={e => setStudent({...student, password: e.target.value})} />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="password">Password Confirm</Label>
                      <Input valid={student.password !== '' && checkPasswordConfirm(student.password, student.passwordConfirm)} 
                        invalid={!checkPasswordConfirm(student.password, student.passwordConfirm)}
                        type="password" name="password confirm" id="passwordconfirm" value={student.passwordConfirm} 
                        onChange={e => setStudent({...student, passwordConfirm: e.target.value})} />
                        <FormFeedback>Password confirm have to equal password!</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={addStudent}>Accept</Button>{' '}
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
          

          {/* Edit Student */}
          <Modal size="lg" isOpen={modalEdit} toggle={toggleEdit} className={className} backdrop={true}>
            <ModalHeader toggle={toggleEdit}>Edit Student</ModalHeader>
            <ModalBody>
              <Form>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="stduentcode">Student code</Label>
                      <Input readOnly type="text" name="student code" id="stduentcode" 
                        value={student.studentCode} />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="studentname">Student name</Label>
                      <Input type="text" name="student name" id="studentname" 
                        value={student.studentName} 
                        onChange={e => setStudent({...student, studentName: e.target.value})} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="class">Class</Label>
                      <Input type="text" name="class" id="class" 
                        value={student.class} 
                        onChange={e => setStudent({...student, class: e.target.value})} />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="dob">Date of Birth</Label>
                      <Input
                        type="date"
                        name="dob"
                        id="dob"
                        value={formatDateForInput(student.doB)}
                        onChange={e => setStudent({...student, doB: e.target.value})}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="nativeland">Native land</Label>
                      <Input type="text" name="native land" id="nativeland" 
                        value={student.nativeLand} 
                        onChange={e => setStudent({...student, nativeLand: e.target.value})} />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="course">Course</Label>
                      <Input type="text" name="course" id="course" 
                        value={student.course} 
                        onChange={e => setStudent({...student, course: e.target.value})} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="faculty">Faculty</Label>
                      <Input type="text" name="faculty" id="faculty" 
                        value={student.faculty} 
                        onChange={e => setStudent({...student, faculty: e.target.value})} />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="exampleDescription">Description</Label>
                      <Input type="text" name="description" id="description" 
                        value={student.description} 
                        onChange={e => setStudent({...student, description: e.target.value})} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="password">Password</Label>
                      <Input valid={student.password !== '' && checkPasswordConfirm(student.password, student.passwordConfirm)} 
                        invalid={!checkPasswordConfirm(student.password, student.passwordConfirm)}
                        placeholder="Keep old password let input empty"
                        type="password" name="password" id="password" value={student.password} 
                        onChange={e => setStudent({...student, password: e.target.value})} />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="password">Password Confirm</Label>
                      <Input valid={student.password !== '' && checkPasswordConfirm(student.password, student.passwordConfirm)} 
                        invalid={!checkPasswordConfirm(student.password, student.passwordConfirm)}
                        type="password" name="password confirm" id="passwordconfirm" value={student.passwordConfirm} 
                        onChange={e => setStudent({...student, passwordConfirm: e.target.value})} />
                        <FormFeedback>Password confirm have to equal password!</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={editStudent}>Accept</Button>{' '}
              <Button color="secondary" onClick={toggleEdit}>Cancel</Button>
            </ModalFooter>
          </Modal>

          {/* Delete Student */}
          <Modal isOpen={modalDelete} toggle={toggleDelete} className={className} backdrop={true}>
            <ModalHeader toggle={toggleDelete}>Delete Student</ModalHeader>
            <ModalBody>
              <h4>Are you sure delete this student?</h4>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={deleteStudent}>Delete</Button>{' '}
              <Button color="secondary" onClick={toggleDelete}>Cancel</Button>
            </ModalFooter>
          </Modal>

          {/* Reset Password Student */}
          <Modal isOpen={modalResetPass} toggle={toggleResetPass} className={className} backdrop={true}>
            <ModalHeader toggle={toggleResetPass}>Reset Password Student</ModalHeader>
            <ModalBody>
              <h4>Are you sure reset password this student?</h4>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={resetPassword}>Reset</Button>{' '}
              <Button color="secondary" onClick={toggleResetPass}>Cancel</Button>
            </ModalFooter>
          </Modal>

        </ReactCSSTransitionGroup>
    </Fragment>
  )
}

export default StudentExample;