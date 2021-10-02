import React, { useEffect, useState } from "react";
import { Row, Col, Typography } from "antd";
import { connect } from "umi";
import MenuNavBar from "../shared/menuNavBar";
import Footer from "../home/components/footer";
import banner from "../../assets/banner_logo.jpg";
import CartList from "./components/cartList";
import styles from "../shared/style/listStyle.less";

const { Title } = Typography;

const CartPage = () => {
    const params = { pageIndex: 1, pageSize: 100 };
	return (
		<Row justify="center">
            <Col xs={16}>
				<img src={banner} />
			</Col>
			<Col xs={16} className={styles.mt16}>
				<MenuNavBar keyNav="cart" />
			</Col>
            <Col xs={12} className={styles.mt16}>
                <Row justify="center">
                    <Title level={2}>Sách trong giỏ</Title>
                </Row>
                <Row justify="center">
                    <CartList />
                </Row>
            </Col>
            <Footer />
		</Row>
	);
};

export default CartPage;
