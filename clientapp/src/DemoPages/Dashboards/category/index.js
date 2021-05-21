import React, { useState, useEffect, Fragment } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
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
  toast,
} from 'react-toastify';


import ButtonAdd from '../ButtonAdd';

function CategoryExample(props) {
  const {
    buttonLabel,
    className
  } = props;
  const [categoryList, setCategoryList] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [category, setCategory] = useState({ bookCategoryCode: '', bookCategoryName: '', description: '' });

  const toggle = () => setModal(!modal);
  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleDelete = () => setModalDelete(!modalDelete);

  useEffect(() => {
    getCategories();
  }, []);

	const getCategories = () => {
		axios.get('bookcategory')
      .then((res) => {
        if (res.status === 200) {
          setCategoryList(res.data)
        }
      })
      .catch(() => {
        showToastError('Get book category list failure!');
      })
	}

  const showToastSuccess = (message) => {
    toast['success'](message);
  }

  const showToastError = (message) => {
    toast['error'](message);
  }
 
  const addCategory = () => {
    toggle();
    
    axios.post('bookcategory', {
      ...category
    })
      .then(res => {
        if (res.status == 200) {
          showToastSuccess('Add book category success!');
        }
      })
      .catch(() => showToastError('Add book category failure!'))
      .finally(() => {
        getCategories();
      })
  }

  const editBookCategory = () => {
    toggleEdit();

    axios.put(`bookcategory/${category.id}`, {
      ...category
    })
      .then(res => {
        if (res.status == 200) {
          showToastSuccess('Update book category success!');
        }
      })
      .catch(() => showToastError('Update book category failure!'))
      .finally(() => {
        getCategories();
      })
  }

  const deleteCategory = () => {
    toggleDelete();

    axios.delete(`category/${category.id}`)
      .then(res => {
        if (res.status === 200) {
          showToastSuccess('Delete book category success!');
        }
      })
      .catch(() => showToastError('Delete book category failure!'))
      .finally(() => {
        getCategories();
      })
  }

  const btnAddOnclick = () => {
    setModal(true);
  }

  const btnEditOnclick = (id) => {
    const category = categoryList.find(u => u.id == id);
    setCategory(category);
    setModalEdit(!modalEdit);
  }

  const btnDeleteOnClick = (id) => {
    setCategory({ ...category, id: id });
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
          <ButtonAdd btnAddChange={btnAddOnclick} text="Add Book Category" />
          <Table className="mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Category name</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { categoryList.map(category => {
                return <tr key={category.id}>
                  <th>{category.id}</th>
									<td>{category.bookCategoryName}</td>
                  <td>{category.bookCategoryName}</td>
                  <td>{category.description}</td>
                  <td>
                    <Button title="Edit book category" outline className="mb-2 mr-2 btn-transition"
                                            color="warning" size="sm" onClick={() => btnEditOnclick(category.id)}>
                      <FontAwesomeIcon icon={faEdit} size="1x"/>
                    </Button>
                    <Button title="Delete book category" outline className="mb-2 mr-2 btn-transition"
                                            color="danger" size="sm" onClick={() => btnDeleteOnClick(category.id)}>
                      <FontAwesomeIcon icon={faTrashAlt} size="1x"/>
                    </Button>
                  </td>
                </tr>
              }) }
            </tbody>
          </Table> 

          {/* Add Category */}
          <Modal isOpen={modal} toggle={toggle} className={className} backdrop={true}>
            <ModalHeader toggle={toggle}>Add Book Category</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
									<Label for="exampleBookCategoryCode">Book category code</Label>
									<Input type="text" name="exampleBookCategoryCode" id="exampleBookCategoryName" 
										placeholder="Input a book category code" value={category.bookCategoryCode} 
										onChange={e => setCategory({...category, bookCategoryCode: e.target.value })} />
                </FormGroup>
                <FormGroup>
									<Label for="exampleBookCategoryName">Book category name</Label>
									<Input type="text" name="exampleBookCategoryName" id="exampleBookCategoryName" 
										placeholder="Input a book category name" value={category.bookCategoryName} 
										onChange={e => setCategory({...category, bookCategoryName: e.target.value})} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleDescription">Description</Label>
                  <Input type="text" name="description" id="description" 
										placeholder="Input description" value={category.description} 
										onChange={e => setCategory({...category, description: e.target.value})} />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={addCategory}>Accept</Button>{' '}
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
          

          {/* Edit Category */}
          <Modal isOpen={modalEdit} toggle={toggleEdit} className={className} backdrop={true}>
            <ModalHeader toggle={toggleEdit}>Edit Book Category</ModalHeader>
            <ModalBody>
						<Form>
                <FormGroup>
									<Label for="exampleBookCategoryCode">Book category code</Label>
									<Input type="text" name="exampleBookCategoryCode" id="exampleBookCategoryName" 
										placeholder="Input a book category code" value={category.bookCategoryCode} 
										onChange={e => setCategory({...category, bookCategoryCode: e.target.value })} />
                </FormGroup>
                <FormGroup>
									<Label for="exampleBookCategoryName">Book category name</Label>
									<Input type="text" name="exampleBookCategoryName" id="exampleBookCategoryName" 
										placeholder="Input a book category name" value={category.bookCategoryName} 
										onChange={e => setCategory({...category, bookCategoryName: e.target.value})} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleDescription">Description</Label>
                  <Input type="text" name="description" id="description" 
										placeholder="Input description" value={category.description} 
										onChange={e => setCategory({...category, description: e.target.value})} />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={editBookCategory}>Accept</Button>{' '}
              <Button color="secondary" onClick={toggleEdit}>Cancel</Button>
            </ModalFooter>
          </Modal>

          {/* Delete Category */}
          <Modal isOpen={modalDelete} toggle={toggleDelete} className={className} backdrop={true}>
            <ModalHeader toggle={toggleDelete}>Delete Book Category</ModalHeader>
            <ModalBody>
              <h4>Are you sure delete this book category?</h4>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={deleteCategory}>Delete</Button>{' '}
              <Button color="secondary" onClick={toggleDelete}>Cancel</Button>
            </ModalFooter>
          </Modal>

        </ReactCSSTransitionGroup>
    </Fragment>
  )
}

export default CategoryExample;