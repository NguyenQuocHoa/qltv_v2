/* eslint-disable react-hooks/exhaustive-deps */
// import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import {
	Col,
	Form,
	Row,
	Input
	// Checkbox,
	// Button,
	// DatePicker,
	// Divider
} from "antd";
import { useHistory } from "react-router";
import styles from "./style.less";
import { connect } from "umi";
import { useState, useEffect } from "react";
import TableTask from "../components/task/tableTask";
import TaskDetail from "../components/task/update";

const { TextArea } = Input;

const Sprint = props => {
	// const { userRoles, dispatch } = props;
	const [form] = Form.useForm();
	// const history = useHistory();
	const [isShowDetail, setIsShowDetail] = useState(true);

	// const handleSubmit = payload => {
	// 	payload.nguoiTao = "admin";
	// 	payload.tenNguoiTao = "Administrator";
	// 	for (let key in payload) {
	// 		if (payload[key] === undefined) {
	// 			payload[key] = null;
	// 		}
	// 	}
	// 	dispatch({
	// 		type: "staffGroupCreate/createStaffGroupRequest",
	// 		payload: payload
	// 	});
	// };

	useEffect(() => {
		form.setFieldsValue({
			isActive: false
		});
	}, []);

	return (
		<div className={styles.container}>
			<Row>
				<Col xs={isShowDetail ? 14 : 24}>
					<TableTask setIsShowDetail={setIsShowDetail} />
				</Col>
				<Col xs={isShowDetail ? 10 : 0}>
					<TaskDetail setIsShowDetail={setIsShowDetail} />
				</Col>
			</Row>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		// loading:
		// 	state.loading.effects[
		// 		"staffGroupCreate/getStaffGroupCreateRequest"
		// 	],
		// userRoles: state.UserRole.userRoles
	};
};

export default connect(mapStateToProps)(Sprint);
