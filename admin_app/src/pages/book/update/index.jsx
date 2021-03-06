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
import { useEffect, useState } from "react";
import { numberWithComas } from "../../../utils/utils";
import SelectCategory from "../../shared/select/selectCategory";
import UploadImage from "../../shared/uploadImage";

const { TextArea } = Input;
const { Title } = Typography;

const UpdateBook = props => {
	const {
		getDetailSuccess,
		detailPayload,
		updateBookSuccess,
		dispatch
	} = props;
	const [imgUrl, setImgUrl] = useState("");
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

	const getImgUrl = value => {
		console.log("value", value);
		setImgUrl(value);
	};

	const handleSubmit = payload => {
		const converPayload = {
			...payload,
			id: +props.match.params.id,
			image: imgUrl,
			bookCategory_Id: payload.bookCategoryId
		};

		dispatch({
			type: "bookUpdate/updateBookRequest",
			payload: converPayload
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
		if (updateBookSuccess) {
			dispatch({
				type: "bookUpdate/clearState"
			});
			history.goBack();
		}
	}, [updateBookSuccess]);

	useEffect(() => {
		dispatch({
			type: "bookDetail/getBookDetailRequest",
			id: +props.match.params.id
		});
	}, []);

	useEffect(() => {
		if (getDetailSuccess) {
			const data = detailPayload?.item?.value;
			if (data) data.bookCategoryId = data.bookCategory_Id;
			form.setFieldsValue({ ...data });
			setImgUrl(data.image);
		}
	}, [getDetailSuccess]);

	return (
		<div className={styles.container}>
			<Row>
				<Col>
					<Title level={4}>
						<FormattedMessage
							id="pages.book.titleForm"
							defaultMessage="TH??NG TIN S??CH"
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
										defaultMessage="M?? s??ch"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui l??ng nh???p M?? s??ch!"
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
										defaultMessage="T??n s??ch"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui l??ng nh???p T??n s??ch!"
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
										defaultMessage="T???n kho"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui l??ng nh???p T???n kho!"
								}
							]}
						>
							<InputNumber
								min={1}
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
										defaultMessage="T??n t??c gi???"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui l??ng nh???p T??n t??c gi???!"
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={8}>
						<Form.Item
							name="bookCategoryId"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.book.bookCategory"
										defaultMessage="Lo???i s??ch"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui l??ng ch???n lo???i s??ch!"
								}
							]}
						>
							<SelectCategory />
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							name="isActive"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.book.state"
										defaultMessage="Tr???ng th??i"
									/>
								</Title>
							}
							valuePropName="checked"
						>
							<Checkbox>
								<FormattedMessage
									id="pages.book.isUse"
									defaultMessage="S??? d???ng"
								/>
							</Checkbox>
						</Form.Item>
					</Col>
					<Col xs={24}>
						<Row gutter={16}>
							<Col xs={8}>
								<UploadImage
									getImgUrl={getImgUrl}
									imgUrl={imgUrl}
									isEdit={true}
								/>
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
														defaultMessage="N???i dung ch??nh"
													/>
												</Title>
											}
											hasFeedback
											rules={[
												{
													required: true,
													message:
														"Vui l??ng ch???n lo???i s??ch!"
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
		loading: state.loading.effects["bookUpdate/getBookUpdateRequest"],
		updatePayload: state.bookUpdate.payload,
		updateBookSuccess: state.bookUpdate.success,
		detailPayload: state.bookDetail.payload,
		getDetailSuccess: state.bookDetail.success
	};
};

export default connect(mapStateToProps)(UpdateBook);
