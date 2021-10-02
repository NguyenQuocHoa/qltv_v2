import React, { useEffect, useState } from "react";
import { Row, Col, Typography } from "antd";
import { connect } from "umi";
import MenuNavBar from "../shared/menuNavBar";
import ListBook from "../home/components/listBook";
import Footer from "../home/components/footer";
import banner from "../../assets/banner_logo.jpg";
import styles from "../shared/style/listStyle.less";

const { Title } = Typography;

const BookPage = () => {
    const params = { pageIndex: 1, pageSize: 100 };
	return (
		<Row justify="center">
            <Col xs={16}>
				<img src={banner} />
			</Col>
			<Col xs={16} className={styles.mt16}>
				<MenuNavBar keyNav="book" />
			</Col>
			<Col xs={16} className={styles.mt16}>
				<ListBook params={params} />
			</Col>
            <Footer />
		</Row>
	);
};

export default BookPage;
