import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { connect } from "umi";
import CartItem from "./cartItem";
import styles from "../../style.less";

const CartList = props => {
	const { bookPayload, success, dispatch } = props;

	const [listId, setListId] = useState([]);

	useEffect(() => {
		dispatch({
			type: "bookList/getAllBookActivePagingRequest",
			payload: { params: { pageIndex: 1, pageSize: 100 } }
		});
	}, []);

	useEffect(() => {
		if (success) {
            updateCart();
		}
	}, [success]);

	const updateCart = () => {
		const cart = localStorage.getItem("cart");
		let bookArr = [];
		if (cart) {
			bookArr = JSON.parse(cart);
		}
		setListId(getListBookInCart(bookArr));
	};

	const getListBookInCart = arr => {
		const books = bookPayload?.items;
		return books.filter(book => {
			return arr.includes(book.id);
		});
	};

	return (
		<Row className={styles.container}>
			{listId.length > 0 &&
				listId.map(item => (
					<Col xs={24} key={item.id}>
						<CartItem book={item} updateCart={updateCart} />
					</Col>
				))}
		</Row>
	);
};

const mapStateToProps = state => {
	return {
		bookPayload: state.bookList.payload,
		success: state.bookList.allBookSuccess
	};
};

export default connect(mapStateToProps)(CartList);
