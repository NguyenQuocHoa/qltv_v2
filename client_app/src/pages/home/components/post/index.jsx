import React from "react";
import { Row, Col, Typography } from "antd";
import CardPost from "../../../shared/cardPost";
import styles from "./style.less";

const { Title } = Typography;

const dataPost = [
	"Thông báo Về việc thay đổi giao diện website Thư viện",
	"Hướng dẫn truy cập cơ sở dữ liệu trực tuyến Emerald",
	"Thông báo Về việc thay đổi hình thức phục vụ từ ngày 28/5/2021 đến khi có thông báo mới"
];

const Post = () => {
	return (
		<Row className={styles.ml20}>
			<Title level={4} className={styles.titleLeft}>
				BẢN TIN THƯ VIỆN
			</Title>
			{dataPost.map(post => (
				<Col xs={24} key={post}>
					<CardPost textLink={post} />
				</Col>
            ))}
            <Col xs={24} className={styles.mt16}>
                <Row justify="end">
                    <a href="/post">Xem tất cả</a>
                </Row>
            </Col>
		</Row>
	);
};

export default Post;
