import React from "react";
import { Card, Row, Button } from "antd";
import styles from "./style.less";
import { history } from "umi";
import { bool } from "prop-types";

const CardBook = props => {
    const { book } = props;
    const handleClick = () => {
        // action add to cart
        history.push("/demo");
    };

	return (
		<Card
			hoverable
            size="small"
			style={{ width: "100%", marginTop: 16 }}
			className={styles.mt16}
            onClick={handleClick}
			cover={
				<img
					alt={bool.imageAlt}
					src={book.imageUrl}
				/>
			}
		>
			<Row justify="center">
				<Button type="primary">Thêm vào giỏ</Button>
			</Row>
		</Card>
	);
};

export default CardBook;
