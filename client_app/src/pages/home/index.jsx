import React from "react";
import { Row, Col } from "antd";
import banner from "../../assets/banner_logo.jpg";
import MenuNavBar from "../shared/menuNavBar";
import ListBook from "./components/listBook";
import Post from "./components/post";
import Footer from "./components/footer";
import styles from "./style.less";

const Home = () => {
	const params = { pageIndex: 1, pageSize: 12 };
	return (
		<Row gutter={16} justify="center">
			<Col xs={16}>
				<img src={banner} />
			</Col>
			<Col xs={16} className={styles.mt16}>
				<MenuNavBar keyNav="home" />
			</Col>
			<Col xs={16}>
				<Row gutter={16}>
					<Col xs={16}>
						<ListBook params={params} />
					</Col>
					<Col xs={8}>
						<Post />
					</Col>
				</Row>
			</Col>
			<Footer />
		</Row>
	);
};

export default Home;
