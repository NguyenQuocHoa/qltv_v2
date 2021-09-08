/* eslint-disable react-hooks/exhaustive-deps */
import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import { Col, Form, Row, Input, Checkbox, Button, Divider } from "antd";
import { useHistory } from "react-router";
import styles from "./style.less";
import { connect } from "umi";
import { useEffect } from "react";
import moment from "moment";

const { TextArea } = Input;

const UpdateStaffGroup = props => {
	const id = props.match.params.id;
	const { success, staffGroupPayload, userRoles, dispatch } = props;
	const [form] = Form.useForm();
	const history = useHistory();
	const formLayout = {
		labelCol: {
			span: 12
		},
		wrapperCol: {
			span: 24
		}
	};

	const handleSubmit = payload => {
		payload["id"] = +id;
		payload.nguoiSua = "admin";
		payload.tenNguoiSua = "Administrator";
		for (let key in payload) {
			if (payload[key] === undefined) {
				payload[key] = null;
			}
		}
		dispatch({
			type: "staffGroupUpdate/updateStaffGroupRequest",
			payload: payload
		});
	};

	useEffect(() => {
		dispatch({
			type: "staffGroupDetail/getStaffGroupDetailRequest",
			id: +props.match.params.id
		});
	}, []);

	useEffect(() => {
		if (success) {
			let data = staffGroupPayload;
			if (data.ngaySinh !== null) {
				data.ngaySinh = moment(data.ngaySinh);
			}
			for (let key in data) {
				if (data[key] === null || data[key] === "") {
					data[key] = undefined;
				}
			}
			form.setFieldsValue({ ...data });
		}
	}, [success]);

	return (
		<div className={styles.container}>
			<Form
				form={form}
				{...formLayout}
				layout="vertical"
				onFinish={handleSubmit}
			>
				<Row gutter={8} className={styles.fullSpan}>
					<Col xs={12}>
						<Form.Item
							name="maNhomNhanVien"
							label="Mã nhóm nhân viên"
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Mã nhóm nhân viên!"
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={12}>
						<Form.Item
							name="tenNhomNhanVien"
							label="Tên nhóm nhân viên"
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Tên nhóm nhân viên!"
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={24}>
						<Form.Item label="Ghi chú" name="ghiChu" hasFeedback>
							<TextArea rows={8} />
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col xs={6}>
						<Form.Item name="isActive" valuePropName="checked">
							<Checkbox>Kích hoạt</Checkbox>
						</Form.Item>
					</Col>
				</Row>
				<Divider />
				<Row justify="end" gutter={8}>
					<Col>
						<Button
							type="default"
							icon={<LeftOutlined />}
							onClick={() => {
								history.goBack();
							}}
						>
							Trở về
						</Button>
					</Col>
					<Col>
						<Button
							type="primary"
							icon={<SaveOutlined />}
							htmlType="submit"
							disabled={!userRoles?.NHOMNHANVIEN?.sua ?? true}
						>
							Lưu
						</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		success: state.staffGroupDetail.success,
		staffGroupPayload: state.staffGroupDetail.payload,
		loading:
			state.loading.effects[
				"staffGroupUpdate/getStaffGroupUpdateRequest"
			],
		userRoles: state.UserRole.userRoles
	};
};

export default connect(mapStateToProps)(UpdateStaffGroup);
