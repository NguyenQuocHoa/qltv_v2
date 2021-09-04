import {
	EllipsisOutlined,
	SaveOutlined,
	SettingOutlined
} from "@ant-design/icons";
import {
	Button,
	Col,
	Collapse,
	DatePicker,
	Drawer,
	Form,
	Input,
	Row,
	Select,
	Space
} from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { connect } from "umi";

import TableTask from "./components/task/tableTask";
import styles from "./style.less";
import TaskDetail from "./components/task/update";
import SprintHeader from "./components/sprintHeader";
const { Option } = Select;
const { Panel } = Collapse;

const Backlog = props => {
	const { dispatch, userRoles, loading } = props;

	const onClose = () => {
		setIsShowDetail(false);
	};
	const history = useHistory();
	const id = props.match.params.id;
	const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

	const callback = key => {
		console.log(key);
	};

	const [isShowDetail, setIsShowDetail] = useState(false);
	return (
		<div className={styles.container}>
			<Row gutter={8}>
				<Col xs={24} className={styles.backlogColumn}>
					<Space direction="vertical" className={styles.fw}>
						{[1, 2, 3, 4].map((item, key) => (
							<Collapse
								// defaultActiveKey={["1"]}
								className={styles.sprint}
								key={key}
							>
								<Panel header={<SprintHeader />} key={key}>
									<TableTask
										setIsShowDetail={setIsShowDetail}
									/>
								</Panel>
							</Collapse>
						))}
					</Space>
				</Col>
			</Row>
			<Drawer
				title="Online Sale / OS-98"
				width={"40%"}
				onClose={onClose}
				visible={isShowDetail}
				footer={
					<div
						style={{
							textAlign: "right"
						}}
					>
						<Button onClick={onClose} style={{ marginRight: 8 }}>
							Cancel
						</Button>
						<Button
							type="primary"
							icon={<SaveOutlined />}
							onClick={onClose}
						>
							Cập nhật
						</Button>
					</div>
				}
			>
				<TaskDetail />
			</Drawer>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		// projectsPayload: state.projectList.payload,
		// isDeleteSuccess: state.projectDelete.success,
		loading: state.loading.effects["projectList/getProjectListRequest"],
		userRoles: state.UserRole.userRoles
	};
};

export default connect(mapStateToProps)(Backlog);
