import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { setToggle } from '../redux/books';

export default function BookForm(props) {

    const {
        toggle,
    } = props;
    
    return (
        <div className="book-form">
            <Modal isOpen={toggle} toggle={setToggle(true)} backdrop={true} size="lg">
                <ModalHeader toggle={setToggle(true)}>Add User</ModalHeader>
                <ModalBody>
                    <h1>Modal</h1>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </Modal>
        </div>
    )
}