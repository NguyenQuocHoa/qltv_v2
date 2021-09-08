import { EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import React from "react";
import styles from "./style.less";

const SprintHeader = props => {
	const state = {
		title: "Sprint 2",
		issues: 27,
		assigns: [
			{
				avt: "https://jira.kido.vn/secure/useravatar?avatarId=10336",
				alt: "X Danh Thừa's avatar"
			},
			{
				avt: "https://jira.kido.vn/secure/useravatar?avatarId=10336",
				alt: "X Danh Thừa's avatar"
			},
			{
				avt: "https://jira.kido.vn/secure/useravatar?avatarId=10336",
				alt: "X Danh Thừa's avatar"
			}
		],
		time: "08/Jun/21 9:42 PM • 15/Jun/21 9:42 PM",
		name:
			"Xây dựng web online sale 4 mobile: Trang chủ, Chi tiết SP, Xem thêm"
	};
	return (
		<div className={`${styles.sprintHeader}`}>
			<Row gutter={8} direction="row" justify="start">
				<Col>
					<p className={styles.sprintTitle}>{state.title}</p>
				</Col>
				<Col>
					<p className={styles.sprintIssues}>{state.issues}</p>
				</Col>
				<Col flex="auto"></Col>
				<Col>
					<SettingOutlined
						onClick={event => {
							// If you don't want click extra trigger collapse, you can prevent this:
							event.stopPropagation();
						}}
					/>
				</Col>
			</Row>
			<Row gutter={8} direction="row" justify="start">
				<Col>
					<Row gutter={8} direction="row" justify="start">
						{state.assigns.map(item => (
							<Col>
								<img
									className={styles.avatar}
									src={item.avt}
									alt={item.alt}
								></img>
							</Col>
						))}
					</Row>
				</Col>
				<Col>
					<Button
						className={styles.assignedBtn}
						onClick={() => {
							console.log("abc");
						}}
						icon={<EllipsisOutlined />}
					></Button>
				</Col>
				<Col>{state.time}</Col>
			</Row>
			<Row gutter={8} direction="row" justify="start">
				<Col>
					<p className={styles.sprintName}>{state.name}</p>
				</Col>
			</Row>
		</div>
	);
};

export default SprintHeader;
