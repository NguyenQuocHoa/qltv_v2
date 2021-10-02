/* eslint-disable react-hooks/exhaustive-deps */
import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import {
	Col,
	Form,
	Row,
	Input,
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

const UpdateAccount = props => {
	const {
		getDetailSuccess,
		detailPayload,
		updateAccountSuccess,
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
			id: +props.match.params.id,
			password: payload.password ?? null,
			...payload
		};

		dispatch({
			type: "accountUpdate/updateAccountRequest",
			payload: convertPayload
		});
	};

	useEffect(() => {
		if (updateAccountSuccess) {
			dispatch({
				type: "accountUpdate/clearState"
			});
			history.goBack();
		}
	}, [updateAccountSuccess]);

	useEffect(() => {
		dispatch({
			type: "accountDetail/getAccountDetailRequest",
			id: +props.match.params.id
		});
	}, []);

	useEffect(() => {
		if (getDetailSuccess) {
			const data = detailPayload?.item?.value;
			form.setFieldsValue({ ...data });
		}
	}, [getDetailSuccess]);

	return (
		<div className={styles.container}>
			<Row>
				<Col>
					<Title level={4}>
						<FormattedMessage
							id="pages.account.titleForm"
							defaultMessage="THÔNG TIN TÀI KHOẢN"
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
							name="username"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.account.username"
										defaultMessage="Tên tài khoản"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Tên tài khoản!"
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={7}>
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
							onChange={validateConfirmPassword}
						>
							<Input.Password />
						</Form.Item>
					</Col>
					<Col xs={7}>
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
					<Col xs={3}>
						<Form.Item
							name="isActive"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.account.state"
										defaultMessage="Trạng thái"
									/>
								</Title>
							}
							valuePropName="checked"
						>
							<Checkbox>
								<FormattedMessage
									id="pages.account.isUse"
									defaultMessage="Sử dụng"
								/>
							</Checkbox>
						</Form.Item>
					</Col>
					<Col xs={24}>
						<Form.Item
							name="description"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.account.description"
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
		loading: state.loading.effects["accountUpdate/getAccountUpdateRequest"],
		updatePayload: state.accountUpdate.payload,
		updateAccountSuccess: state.accountUpdate.success,
		detailPayload: state.accountDetail.payload,
		getDetailSuccess: state.accountDetail.success
	};
};

export default connect(mapStateToProps)(UpdateAccount);
