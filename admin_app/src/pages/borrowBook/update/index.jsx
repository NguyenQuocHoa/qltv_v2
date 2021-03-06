/* eslint-disable react-hooks/exhaustive-deps */
import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import {
	Col,
	Form,
	Row,
	Input,
	DatePicker,
	InputNumber,
	Button,
	Divider,
	Typography
} from "antd";
import { useHistory } from "react-router";
import styles from "../../shared/style/detailStyle.less";
import { connect, FormattedMessage } from "umi";
import { useEffect, useState } from "react";
import SelectStudent from "../../shared/select/selectStudent";
import DetailTable from "../components/detailTable";
import moment from "moment";

const { TextArea } = Input;
const { Title } = Typography;

const UpdateBorrowBook = props => {
	const {
		getDetailSuccess,
		detailPayload,
		updateBorrowBookSuccess,
		dispatch
	} = props;
	const [form] = Form.useForm();
	const [borrowBookDetail, setBorrowBookDetail] = useState([]);
	const history = useHistory();
	const formLayout = {
		labelCol: {
			span: 12
		},
		wrapperCol: {
			span: 24
		}
	};

	const dataSourceChange = dataSource => {
		setBorrowBookDetail(dataSource);
	};

	const handleSubmit = payload => {
		const convertPayload = {
			id: +props.match.params.id,
			borrowBook: {
				...payload,
				id: +props.match.params.id,
				student_Id: payload.studentId
			},
			borrowBookDetails: [
				...borrowBookDetail.map(row => ({
					id: 0,
					book_Id: row.bookIdHide,
					borrowBook_Id: +props.match.params.id,
					borrowBookDetailCode: row.borrowBookDetailCode,
					quantity: row.quantity,
					description: row.description,
				}))
			]
		};

		dispatch({
			type: "borrowBookUpdate/updateBorrowBookRequest",
			payload: convertPayload
		});
	};

	useEffect(() => {
		if (updateBorrowBookSuccess) {
			dispatch({
				type: "borrowBookUpdate/clearState"
			});
			history.goBack();
		}
	}, [updateBorrowBookSuccess]);

	useEffect(() => {
		dispatch({
			type: "bookAll/getAllBookEnoughInventoryRequest"
		});
		dispatch({
			type: "borrowBookDetail/getBorrowBookDetailRequest",
			id: +props.match.params.id
		});
	}, []);

	useEffect(() => {
		if (getDetailSuccess) {
			const data = detailPayload?.item?.value;
			if (data) {
				data.studentId = data.student_Id;
				data.borrowDate = moment(data.borrowDate);
				setBorrowBookDetail(data.borrowBookDetails.map(item => ({
					id: item.id,
					bookId: item.book_Id,
					borrowBookId: item.borrowBook_Id,
					borrowBookDetailCode: item.borrowBookDetailCode,
					quantity: item.quantity,
					description: item.description
				})));
			}
			form.setFieldsValue({ ...data });
		}
	}, [getDetailSuccess]);

	return (
		<div className={styles.container}>
			<Row>
				<Col>
					<Title level={4}>
						<FormattedMessage
							id="pages.borrowBook.titleForm"
							defaultMessage="TH??NG TIN M?????N S??CH"
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
					<Col xs={6}>
						<Form.Item
							name="borrowBookCode"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.borrowBook.borrowBookCode"
										defaultMessage="M?? m?????n s??ch"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui l??ng nh???p M?? m?????n s??ch!"
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							name="borrowDate"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.borrowBook.borrowDate"
										defaultMessage="Ng??y m?????n s??ch"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui l??ng ch???n Ng??y m?????n s??ch!"
								}
							]}
						>
							<DatePicker
								format={"DD/MM/YYYY"}
								className={styles.fw}
							/>
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							name="numberOfDayBorrow"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.borrowBook.numberOfDayBorrow"
										defaultMessage="S??? ng??y m?????n s??ch"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui l??ng nh???p s??? ng??y m?????n s??ch!"
								}
							]}
						>
							<InputNumber
								className={styles.fw}
								min={7}
								max={100}
							/>
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							name="studentId"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.borrowBook.studentId"
										defaultMessage="Sinh vi??n"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui l??ng ch???n Sinh vi??n!"
								}
							]}
						>
							<SelectStudent />
						</Form.Item>
					</Col>
					<Col xs={24}>
						<Form.Item
							name="description"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.borrowBook.description"
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
				<DetailTable
					code={form.getFieldValue("borrowBookCode")}
					getDataSource={dataSourceChange}
					dataSource={borrowBookDetail}
				/>
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
		loading:
			state.loading.effects[
				"borrowBookUpdate/getBorrowBookUpdateRequest"
			],
		updatePayload: state.borrowBookUpdate.payload,
		updateBorrowBookSuccess: state.borrowBookUpdate.success,
		detailPayload: state.borrowBookDetail.payload,
		getDetailSuccess: state.borrowBookDetail.success
	};
};

export default connect(mapStateToProps)(UpdateBorrowBook);
