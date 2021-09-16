/* eslint-disable react-hooks/exhaustive-deps */
import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import {
	Col,
	Form,
	Row,
	Input,
	InputNumber,
	Checkbox,
	Button,
	Divider,
	Typography
} from "antd";
import { useHistory } from "react-router";
import styles from "../../shared/style/detailStyle.less";
import { connect, FormattedMessage } from "umi";
import { useEffect } from "react";
import { numberWithComas } from "../../../utils/utils";

const { TextArea } = Input;
const { Title } = Typography;

const CreateBook = props => {
	const { createPayload, createBookSuccess, dispatch } = props;
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
		dispatch({
			type: "bookCreate/createBookRequest",
			payload: payload
		});
	};

	useEffect(() => {
		form.setFieldsValue({
			isActive: false,
			chooseDefault: false,
			description: null
		});
	}, []);

	useEffect(() => {
		if (createBookSuccess) history.goBack();
	}, [createBookSuccess]);

	return (
		<div className={styles.container}>
			<Row>
				<Col>
					<Title level={4}>
						<FormattedMessage
							id="pages.book.titleForm"
							defaultMessage="THÔNG TIN SÁCH"
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
					<Col xs={8}>
						<Form.Item
							name="bookCode"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.book.bookCode"
										defaultMessage="Mã sách"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Mã sách!"
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={8}>
						<Form.Item
							name="bookName"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.book.bookName"
										defaultMessage="Tên sách"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Tên sách!"
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={8}>
						<Form.Item
							name="inventory"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.book.inventory"
										defaultMessage="Tồn kho"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Tồn kho!"
								}
							]}
						>
							<InputNumber
								className={styles.fw}
								formatter={numberWithComas}
							/>
						</Form.Item>
					</Col>
					<Col xs={8}>
						<Form.Item
							name="author"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.book.author"
										defaultMessage="Tên tác giả"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Tên tác giả!"
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={8}>
						<Form.Item
							name="bookCategory"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.book.bookCategory"
										defaultMessage="Loại sách"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng chọn loại sách!"
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={8}>
						<Form.Item
							name="isActive"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.book.state"
										defaultMessage="Trạng thái"
									/>
								</Title>
							}
							valuePropName="checked"
						>
							<Checkbox>
								<FormattedMessage
									id="pages.book.isUse"
									defaultMessage="Sử dụng"
								/>
							</Checkbox>
						</Form.Item>
					</Col>
					<Col xs={24}>
						<Row gutter={16}>
							<Col xs={8}>
								<Form.Item
									name="bookCategory"
									label={
										<Title
											className={styles.title}
											level={5}
										>
											<FormattedMessage
												id="pages.book.bookCategory"
												defaultMessage="Loại sách"
											/>
										</Title>
									}
									hasFeedback
									rules={[
										{
											required: true,
											message: "Vui lòng chọn loại sách!"
										}
									]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={16}>
								<Row>
									<Col xs={24}>
										<Form.Item
											name="mainContent"
											label={
												<Title
													className={styles.title}
													level={5}
												>
													<FormattedMessage
														id="pages.book.mainContent"
														defaultMessage="Nội dung chính"
													/>
												</Title>
											}
											hasFeedback
											rules={[
												{
													required: true,
													message:
														"Vui lòng chọn loại sách!"
												}
											]}
										>
											<TextArea rows={5} />
										</Form.Item>
									</Col>
									<Col xs={24}>
										<Form.Item
											name="description"
											label={
												<Title
													className={styles.title}
													level={5}
												>
													<FormattedMessage
														id="pages.book.description"
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
							</Col>
						</Row>
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
		loading: state.loading.effects["bookCreate/getBookCreateRequest"],
		createPayload: state.bookCreate.payload,
		createBookSuccess: state.bookCreate.success
	};
};

export default connect(mapStateToProps)(CreateBook);
