import React from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {
  faEdit,
  faTrashAlt,
  faCheckCircle,
  faTimesCircle,

} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

library.add(
  fab,
  faEdit,
  faTrashAlt,
  faCheckCircle,
  faTimesCircle,
);

export default function StudentForm(props) {
    const {
        student,
        setStudent,
        modal,
        toggle,
        className,
        checkPasswordConfirm,
        addStudent,
        isEdit = false,
        formatDateForInput
    } = props;

    return (
        <Modal size="lg" isOpen={modal} toggle={toggle} className={className} backdrop={true}>
            <ModalHeader toggle={toggle}>Add Student</ModalHeader>
            <ModalBody>
              <Form>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="stduentcode">Student code</Label>
                      <Input readOnly={isEdit} invalid={student.studentCode.length !== 10} 
                        valid={student.studentCode.length === 10} type="text" name="student code" id="stduentcode" 
                        value={student.studentCode} 
                        onChange={e => setStudent({...student, studentCode: e.target.value})} />
                      <FormFeedback>Lenght of Student code have to equal 10!</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="studentname">Student name</Label>
                      <Input
                        valid={student.studentName.length > 0} 
                        type="text" name="student name" id="studentname" 
                        value={student.studentName} 
                        onChange={e => setStudent({...student, studentName: e.target.value})} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="class">Class</Label>
                      <Input 
                        valid={student.class.length > 0} 
                        type="text" name="class" id="class" 
                        value={student.class} 
                        onChange={e => setStudent({...student, class: e.target.value})} />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="dob">Date of Birth</Label>
                      <Input
                        valid={student.doB !== undefined} 
                        type="date"
                        name="dob"
                        id="dob"
                        value={isEdit ? formatDateForInput(student.doB) : student.doB}
                        onChange={e => setStudent({...student, doB: e.target.value})}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="nativeland">Native land</Label>
                      <Input 
                        valid={student.nativeLand.length > 0} 
                        type="text" name="native land" id="nativeland" 
                        value={student.nativeLand} 
                        onChange={e => setStudent({...student, nativeLand: e.target.value})} />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="course">Course</Label>
                      <Input 
                        valid={student.course.length > 0} 
                        type="text" name="course" id="course" 
                        value={student.course} 
                        onChange={e => setStudent({...student, course: e.target.value})} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="faculty">Faculty</Label>
                      <Input 
                        valid={student.faculty.length > 0} 
                        type="text" name="faculty" id="faculty" 
                        value={student.faculty} 
                        onChange={e => setStudent({...student, faculty: e.target.value})} />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold" for="exampleDescription">Description</Label>
                      <Input 
                        valid={student.description.length > 0} 
                        type="text" name="description" id="description" 
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
              <Button color="success" onClick={addStudent}>
                <FontAwesomeIcon icon={faCheckCircle} size="1x"/>
                {' '}Accept</Button>{' '}
              <Button color="secondary" onClick={toggle}>
                <FontAwesomeIcon icon={faTimesCircle} size="1x"/>
                {' '}Cancel</Button>
            </ModalFooter>
          </Modal>
    )
}