import React from 'react';
import { Table, Button, } from 'reactstrap';

import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'

import {
    faEdit,
    faSyncAlt,
    faTrashAlt,
  
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

library.add(
    fab,
    faEdit,
    faTrashAlt,
);

export default function StudentList(props) {
    const {
        studentList,
        setStudent,
        formatDate,
        btnEditOnclick,
        btnDeleteOnClick,
        modalResetPass,
        setModalResetPass,
    } = props;
    return (
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
    )
} 