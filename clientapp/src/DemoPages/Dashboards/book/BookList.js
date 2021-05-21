import React from 'react';
import {  Row, Col, Button,
    Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

export default function BookList(props) {
    const {
        books,
        btnEditOnclick,
        btnDeleteOnclick,
    } = props;

    return (
        <div className="book-list">
            <Row>
                { books.map(book => (
                    <Col xl="3" lg="4" md="6" key={book.id}>
                        <Card className="mb-3">
                        <CardImg top width="100%" src="https://loremflickr.com/640/360" alt="Card image cap" />
                        <CardBody>
                            <CardTitle tag="h5">{ `${ book.bookCode} - ${ book.bookName}` }</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">{ book.author }</CardSubtitle>
                            <CardText>{book.mainContent}</CardText>
                            <Row>
                            <Col>
                                <Button title="Edit book" block outline className="mb-2 mr-2 btn-transition" color="info" onClick={() => btnEditOnclick(book.id)}>
                                <i className="lnr-eye icon-gradient bg-happy-fisher"> </i>
                                </Button>
                            </Col>
                            <Col>
                                <Button title="Delete book" block outline className="mb-2 mr-2 btn-transition" color="danger" onClick={() => btnDeleteOnclick(book.id)}>
                                <i className="lnr-trash icon-gradient bg-amy-crisp"> </i>
                                </Button>
                            </Col>
                            </Row>
                        </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}
