import React from "react";
import { Row, Col, Typography } from "antd";
import styles from "./style.less";

const { Title, Text } = Typography;

const Footer = () => {
	return (
		<Row justify="center" className={styles.bg}>
			<Col xs={16}>
				<Row>
					<Col lg={8}>
						<Title level={4} className={styles.title}>
							THÔNG TIN LIÊN HỆ
						</Title>
						<Text className={styles.text}>
							Địa chỉ: 97 Võ Văn Tần - Phường 6 - Quận 3 - TP.HCM
						</Text>
						<Text className={styles.text}>
							E-mail: thuviendhm@ou.edu.vn
						</Text>
						<Text className={styles.text}>
							Điện thoại: (028) 3930 0209
						</Text>
						<Text className={styles.text}>
							Fax: (028) 3930 0085
						</Text>
					</Col>
					<Col lg={8}>
						<Title level={4} className={styles.title}>
							HỖ TRỢ ONLINE
						</Title>
						<Text className={styles.text}>0903 86 16 87</Text>
						<Text className={styles.text}>0908 23 58 19</Text>
					</Col>
					<Col lg={8}>
						<Title level={4} className={styles.title}>
							THỐNG KÊ
						</Title>
						<Text className={styles.text}>Đang online: 54</Text>
						<Text className={styles.text}>
							Truy cập hôm nay: 1174
						</Text>
						<Text className={styles.text}>
							Truy cập tuần này: 9166
						</Text>
						<Text className={styles.text}>
							Truy cập tháng này: 1174
						</Text>
						<Text className={styles.text}>
							Tổng truy cập: 3644924
						</Text>
					</Col>
				</Row>
				<Row>
					<Text className={styles.text}>
						Copyright © 2021 Thư viện Đại học Mở. All Rights
						Reserved
					</Text>
				</Row>
			</Col>
		</Row>
	);
};

export default Footer;
