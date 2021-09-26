/* eslint-disable react-hooks/exhaustive-deps */
import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import {
	Col,
	Form,
	Row,
	Input,
	DatePicker,
	Checkbox,
	Button,
	Divider,
	Typography
} from "antd";
import { useHistory } from "react-router";
import styles from "../../shared/style/detailStyle.less";
import { connect, FormattedMessage } from "umi";
import { useEffect } from "react";

const { TextArea } = Input;
const { Title } = Typography;

const CreateStudent = props => {
	const { createStudentSuccess, dispatch } = props;
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

	const sameAsPassword = value => {
		const password = form.getFieldValue("password");
		const confirmPassword = value;
		if (
			password != null &&
			confirmPassword !== "" &&
			confirmPassword !== null &&
			confirmPassword !== undefined &&
			password != confirmPassword
		)
			return false;
		return true;
	};

	const validateConfirmPassword = () => {
		form.validateFields(["confirmPassword"]);
	};

	const handleSubmit = payload => {
		const convertPayload = {
			...payload,
			image: ""
		};

		dispatch({
			type: "studentCreate/createStudentRequest",
			payload: convertPayload
		});
	};

	useEffect(() => {
		if (createStudentSuccess) {
			dispatch({
				type: "studentCreate/clearState"
			});
			history.goBack();
		}
	}, [createStudentSuccess]);

	return (
		<div className={styles.container}>
			<Row>
				<Col>
					<Title level={4}>
						<FormattedMessage
							id="pages.student.titleForm"
							defaultMessage="THÔNG TIN SINH VIÊN"
						/>
					</Title>
				</Col>
			</Row>
			<Form
				form={form}
				{...formLayout}
				layout="vertical"
				onFinish={handleSubmit}
			>
				<Row gutter={16} className={styles.fullSpan}>
					<Col xs={7}>
						<Form.Item
							name="studentCode"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.student.studentCode"
										defaultMessage="Mã sinh viên"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Mã sinh viên!"
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={7}>
						<Form.Item
							name="studentName"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.student.studentName"
										defaultMessage="Tên sinh viên"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Tên sinh viên!"
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={7}>
						<Form.Item
							name="doB"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.student.doB"
										defaultMessage="Ngày sinh"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng chọn Ngày sinh!"
								}
							]}
						>
							<DatePicker
								format={"DD/MM/YYYY"}
								className={styles.fw}
							/>
						</Form.Item>
					</Col>
					<Col xs={3}>
						<Form.Item
							name="isActive"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.student.state"
										defaultMessage="Trạng thái"
									/>
								</Title>
							}
							valuePropName="checked"
						>
							<Checkbox>
								<FormattedMessage
									id="pages.student.isUse"
									defaultMessage="Sử dụng"
								/>
							</Checkbox>
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							name="nativeLand"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.student.nativeLand"
										defaultMessage="Quê quán"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Quê quán!"
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							name="class"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.student.class"
										defaultMessage="Lớp"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Lớp!"
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							name="course"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.student.course"
										defaultMessage="Khóa học"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Khóa học!"
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							name="faculty"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.student.faculty"
										defaultMessage="Khoa"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Khoa!"
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={24}>
						<Form.Item
							name="description"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.student.description"
										defaultMessage="Ghi chú"
									/>
								</Title>
							}
							hasFeedback
						>
							<TextArea rows={4} />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col xs={6}>
						<Form.Item
							name="password"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.account.password"
										defaultMessage="Mật khẩu"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Mật khẩu!"
								}
							]}
							onChange={validateConfirmPassword}
						>
							<Input.Password />
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							name="confirmPassword"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.account.confirmPassword"
										defaultMessage="Xác nhận mật khẩu"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Xác nhận mật khẩu!"
								},
								{
									validator(rule, value = "") {
										if (!sameAsPassword(value)) {
											return Promise.reject(
												"Xác nhận mật khẩu không khớp!"
											);
										} else {
											return Promise.resolve();
										}
									}
								}
							]}
						>
							<Input.Password />
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
							{" "}
							<FormattedMessage
								id="pages.toBack"
								defaultMessage="Quay lại"
							/>
						</Button>
					</Col>
					<Col>
						<Button
							type="primary"
							icon={<SaveOutlined />}
							htmlType="submit"
						>
							{" "}
							<FormattedMessage
								id="pages.save"
								defaultMessage="Lưu"
							/>
						</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		loading: state.loading.effects["studentCreate/getStudentCreateRequest"],
		createPayload: state.studentCreate.payload,
		createStudentSuccess: state.studentCreate.success
	};
};

export default connect(mapStateToProps)(CreateStudent);
