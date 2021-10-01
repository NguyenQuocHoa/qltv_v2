import React from "react";
import { Row, Col } from "antd";
import banner from "../../assets/banner_logo.jpg";
import CardBook from "../shared/cardBook";
import Post from "./components/post";
import Footer from "./components/footer";
import styles from "./style.less";

const dataBook = [
	{
		id: 1,
		imageUrl: "http://localhost:6165/images/1socola_hanh_nhan215644528.png",
		imageAlt: "content"
	},
	{
		id: 2,
		imageUrl: "http://localhost:6165/images/1socola_hanh_nhan215644528.png",
		imageAlt: "content"
	},
	{
		id: 3,
		imageUrl: "http://localhost:6165/images/1socola_hanh_nhan215644528.png",
		imageAlt: "content"
	},
	{
		id: 4,
		imageUrl: "http://localhost:6165/images/1socola_hanh_nhan215644528.png",
		imageAlt: "content"
	},
	{
		id: 5,
		imageUrl: "http://localhost:6165/images/1socola_hanh_nhan215644528.png",
		imageAlt: "content"
	},
	{
		id: 6,
		imageUrl: "http://localhost:6165/images/1socola_hanh_nhan215644528.png",
		imageAlt: "content"
	},
	{
		id: 7,
		imageUrl: "http://localhost:6165/images/1socola_hanh_nhan215644528.png",
		imageAlt: "content"
	},
	{
		id: 8,
		imageUrl: "http://localhost:6165/images/1socola_hanh_nhan215644528.png",
		imageAlt: "content"
	},
	{
		id: 9,
		imageUrl: "http://localhost:6165/images/1socola_hanh_nhan215644528.png",
		imageAlt: "content"
	},
	{
		id: 10,
		imageUrl: "http://localhost:6165/images/1socola_hanh_nhan215644528.png",
		imageAlt: "content"
	},
	{
		id: 11,
		imageUrl: "http://localhost:6165/images/1socola_hanh_nhan215644528.png",
		imageAlt: "content"
	},
	{
		id: 12,
		imageUrl: "http://localhost:6165/images/1socola_hanh_nhan215644528.png",
		imageAlt: "content"
	}
];

const Home = () => {
	return (
		<Row gutter={16} justify="center">
			<Col xs={16}>
				<img src={banner} />
			</Col>
			<Col xs={16}>
				<Row gutter={16}>
					<Col xs={16}>
						<Row gutter={16}>
							{dataBook.map(book => (
								<Col xxl={8} xl={12} key={book.id}>
									<CardBook book={book} />
								</Col>
							))}
						</Row>
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
