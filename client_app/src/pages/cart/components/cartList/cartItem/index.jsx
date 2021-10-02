import React, { useEffect, useState } from "react";
import { Row, Col, Button, Tooltip, Icon } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import styles from "../../../style.less";

const CartItem = props => {
	const { book, updateCart } = props;

	const handleDelete = () => {
		const cart = localStorage.getItem("cart");
		let bookArr = [];
		if (cart) {
			localStorage.removeItem("cart");
			bookArr = JSON.parse(cart);
		}
        bookArr = bookArr.filter(b => b != book.id);
		localStorage.setItem("cart", JSON.stringify(bookArr));
        setTimeout(() => {
            updateCart();
        }, 300);
	};

	return (
		<Row justify="space-between" className={styles.mt16} align="middle">
			<Col xs={6}>
				<img className={styles.img} src={book?.image} />
			</Col>
			<Col xs={18}>
				<Row justify="space-between" align="middle">
					<Col xs={16}>{book?.bookName}</Col>
					<Col xs={2}>
						<Tooltip title="Xóa sách ra khỏi giỏ">
							<Button
								type="danger"
								shape="circle"
								icon={<DeleteOutlined />}
								onClick={handleDelete}
							/>
						</Tooltip>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default CartItem;
