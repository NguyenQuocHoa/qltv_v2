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
import moment from "moment";

const { TextArea } = Input;
const { Title } = Typography;

const UpdateStudent = props => {
	const {
		getDetailSuccess,
		detailPayload,
		updateStudentSuccess,
		dispatch
	} = props;
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
			id: +props.match.params.id,
			image: ""
		};

		dispatch({
			type: "studentUpdate/updateStudentRequest",
			payload: convertPayload
		});
	};

	useEffect(() => {
		if (updateStudentSuccess) {
			dispatch({
				type: "studentUpdate/clearState"
			});
			history.goBack();
		}
	}, [updateStudentSuccess]);

	useEffect(() => {
		dispatch({
			type: "studentDetail/getStudentDetailRequest",
			id: +props.match.params.id
		});
	}, []);

	useEffect(() => {
		if (getDetailSuccess) {
			const data = detailPayload?.item?.value;
			data.doB = data.doB ? moment(data.doB) : null;
			form.setFieldsValue({ ...data });
		}
	}, [getDetailSuccess]);

	return (
		<div className={styles.container}>
			<Row>
				<Col>
					<Title level={4}>
						<FormattedMessage
							id="pages.student.titleForm"
							defaultMessage="TH??NG TIN SINH VI??N"
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
										defaultMessage="M?? sinh vi??n"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui l??ng nh???p M?? sinh vi??n!"
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
										defaultMessage="T??n sinh vi??n"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui l??ng nh???p T??n sinh vi??n!"
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
										defaultMessage="Ng??y sinh"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui l??ng ch???n Ng??y sinh!"
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
										defaultMessage="Tr???ng th??i"
									/>
								</Title>
							}
							valuePropName="checked"
						>
							<Checkbox>
								<FormattedMessage
									id="pages.student.isUse"
									defaultMessage="S??? d???ng"
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
										defaultMessage="Qu?? qu??n"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui l??ng nh???p Qu?? qu??n!"
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
										defaultMessage="L???p"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui l??ng nh???p L???p!"
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
										defaultMessage="Kh??a h???c"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui l??ng nh???p Kh??a h???c!"
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
									message: "Vui l??ng nh???p Khoa!"
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
										defaultMessage="Ghi ch??"
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
										id="pages.student.password"
										defaultMessage="M???t kh???u"
									/>
								</Title>
							}
							hasFeedback
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
										id="pages.student.confirmPassword"
										defaultMessage="X??c nh???n m???t kh???u"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									validator(rule, value = "") {
										if (!sameAsPassword(value)) {
											return Promise.reject(
												"X??c nh???n m???t kh???u kh??ng kh???p!"
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
								defaultMessage="Quay l???i"
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
								defaultMessage="L??u"
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
		loading: state.loading.effects["studentUpdate/getStudentUpdateRequest"],
		updatePayload: state.studentUpdate.payload,
		updateStudentSuccess: state.studentUpdate.success,
		detailPayload: state.studentDetail.payload,
		getDetailSuccess: state.studentDetail.success
	};
};

export default connect(mapStateToProps)(UpdateStudent);
