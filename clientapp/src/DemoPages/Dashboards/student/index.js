import React, { useState, useEffect, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {
  faEdit,
  faSyncAlt,
  faTrashAlt,
  faTimesCircle

} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
  toast,
} from 'react-toastify';


import ButtonAdd from '../ButtonAdd';
import StudentList from './StudentList';
import StudentForm from './StudentForm';

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
    { studentCode: '', studentName: '', class: '', doB: undefined, nativeLand: '', course: '', faculty: '', description: '', password: '', passwordConfirm: '' }
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


          <ButtonAdd btnAddChange={btnAddOnclick} text="Add Student" />

          {/* Student List */}
          <StudentList studentList={studentList} setStudent={setStudent} formatDate={formatDate} 
          btnEditOnclick={btnEditOnclick} btnDeleteOnClick={btnDeleteOnClick} setModalResetPass={setModalResetPass} />
          

          {/* Add Student */}
          <StudentForm student={student} setStudent={setStudent} modal={modal} toggle={toggle} 
            className={className} checkPasswordConfirm={checkPasswordConfirm} addStudent={addStudent} />
          

          {/* Edit Student */}
          <StudentForm student={student} setStudent={setStudent} modal={modalEdit} toggle={toggleEdit} 
            className={className} checkPasswordConfirm={checkPasswordConfirm} addStudent={editStudent} isEdit={true} formatDateForInput={formatDateForInput} />


          {/* Delete Student */}
          <Modal isOpen={modalDelete} toggle={toggleDelete} className={className} backdrop={true}>
            <ModalHeader toggle={toggleDelete}>Delete Student</ModalHeader>
            <ModalBody>
              <h4>Are you sure delete this student?</h4>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={deleteStudent}>
              <FontAwesomeIcon icon={faTrashAlt} size="1x"/>{' '}Delete</Button>{' '}
              <Button color="secondary" onClick={toggleDelete}>
              <FontAwesomeIcon icon={faTimesCircle} size="1x"/>
              {' '}Cancel</Button>
            </ModalFooter>
          </Modal>

          {/* Reset Password Student */}
          <Modal isOpen={modalResetPass} toggle={toggleResetPass} className={className} backdrop={true}>
            <ModalHeader toggle={toggleResetPass}>Reset Password Student</ModalHeader>
            <ModalBody>
              <h4>Are you sure reset password become '1' this student?</h4>
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

export default StudentExample;