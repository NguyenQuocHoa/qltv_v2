import React, { useEffect } from "react";
import { Card, Row, Button } from "antd";
import styles from "./style.less";
import { history } from "umi";

const CardBook = props => {
	const { book, reRender } = props;

	const handleClick = id => {
		// action add to cart
		const cart = localStorage.getItem("cart");
		let bookArr = [];
		if (cart) {
			bookArr = JSON.parse(cart);
			localStorage.removeItem("cart");
		}
		bookArr = bookArr.filter(b => b !== id);
		bookArr.push(id);
		localStorage.setItem("cart", JSON.stringify(bookArr));
		setTimeout(() =>{
			reRender();
		}, 300);
	};

	return (
		<Card
			hoverable
			size="small"
			style={{ width: "100%", marginTop: 16 }}
			className={styles.mt16}
			// onClick={handleClick}
			cover={<img alt="book" src={book.image} />}
		>
			<Row justify="center">
				<Button type="primary" disabled={book.disabled} onClick={() => handleClick(book.id)}>
					Thêm vào giỏ
				</Button>
			</Row>
		</Card>
	);
};

export default CardBook;
