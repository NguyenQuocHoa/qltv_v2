/* eslint-disable react-hooks/exhaustive-deps */
import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import { Col, Form, Row, Input, Checkbox, Button, Divider } from "antd";
import { useHistory } from "react-router";
import styles from "./style.less";
import { connect } from "umi";
import { useEffect } from "react";

const { TextArea } = Input;

const CreateStaffGroup = props => {
	const { userRoles, dispatch } = props;
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
		payload.nguoiTao = "admin";
		payload.tenNguoiTao = "Administrator";
		for (let key in payload) {
			if (payload[key] === undefined) {
				payload[key] = null;
			}
		}
		dispatch({
			type: "staffGroupCreate/createStaffGroupRequest",
			payload: payload
		});
	};

	useEffect(() => {
		form.setFieldsValue({
			isActive: false
		});
	}, []);

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
							disabled={!userRoles?.NHOMNHANVIEN?.them ?? true}
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
		loading:
			state.loading.effects["staffGroupCreate/getStaffGroupCreateRequest"],
			userRoles: state.UserRole.userRoles
	};
};

export default connect(mapStateToProps)(CreateStaffGroup);
