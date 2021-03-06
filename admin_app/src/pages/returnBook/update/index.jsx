/* eslint-disable react-hooks/exhaustive-deps */
import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import {
	Col,
	Form,
	Row,
	Input,
	DatePicker,
	Button,
	Divider,
	Typography
} from "antd";
import { useHistory } from "react-router";
import styles from "../../shared/style/detailStyle.less";
import { connect, FormattedMessage } from "umi";
import { useEffect, useState } from "react";
import SelectBorrowBook from "../../shared/select/selectBorrowBook";
import moment from "moment";
import DetailTable from "../components/detailTable";

const { TextArea } = Input;
const { Title } = Typography;

const UpdateReturnBook = props => {
	const {
		getDetailSuccess,
		detailPayload,
		detailBorrowBookPayload,
		getDetailBorrowBookSuccess,
		updateReturnBookSuccess,
		dispatch
	} = props;
	const [form] = Form.useForm();
	const [returnBookDetail, setReturnBookDetail] = useState([]);
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
		setReturnBookDetail(dataSource);
	};

	const handleSelectBorrowBook = id => {
		dispatch({
			type: "borrowBookDetail/getBorrowBookDetailRequest",
			id
		});
	};

	const handleSubmit = payload => {
		const convertPayload = {
			id: +props.match.params.id,
			returnBook: {
				...payload,
				id: +props.match.params.id,
				borrowBook_Id: payload.borrowBookId
			},
			returnBookDetails: [
				...returnBookDetail.map(row => ({
					id: 0,
					book_Id: row.bookIdHide,
					returnBook_Id: +props.match.params.id,
					returnBookDetailCode: row.returnBookDetailCode,
					quantity: row.quantity,
					description: row.description,
				}))
			]
		};

		dispatch({
			type: "returnBookUpdate/updateReturnBookRequest",
			payload: convertPayload
		});
	};

	useEffect(() => {
		if (updateReturnBookSuccess) {
			dispatch({
				type: "returnBookUpdate/clearState"
			});
			history.goBack();
		}
	}, [updateReturnBookSuccess]);

	useEffect(() => {
		dispatch({
			type: "bookAll/getAllBookEnoughInventoryRequest"
		});
		dispatch({
			type: "returnBookDetail/getReturnBookDetailRequest",
			id: +props.match.params.id
		});
	}, []);

	useEffect(() => {
		if (getDetailSuccess) {
			const data = detailPayload?.item?.value;
			if (data) {
				data.borrowBookId = data.borrowBook_Id;
				data.returnDate = moment(data.returnDate);

				setReturnBookDetail(data.returnBookDetails.map(item => ({
					id: item.id,
					bookId: item.book_Id,
					returnBookDetailCode: item.returnBookDetailCode,
					quantity: item.quantity,
					description: item.description
				})));
			}
			form.setFieldsValue({ ...data });
		}
	}, [getDetailSuccess]);

	useEffect(() => {
		if (getDetailBorrowBookSuccess) {
			const data = detailBorrowBookPayload?.item?.value;
			if (data) {
				setReturnBookDetail(
					data.borrowBookDetails.map(item => ({
						bookId: item.book_Id,
						quantity: item.quantity,
						description: ""
					}))
				);
			}
		}
	}, [getDetailBorrowBookSuccess]);

	return (
		<div className={styles.container}>
			<Row>
				<Col>
					<Title level={4}>
						<FormattedMessage
							id="pages.returnBook.titleForm"
							defaultMessage="TH??NG TIN TR??? S??CH"
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
							name="returnBookCode"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.returnBook.returnBookCode"
										defaultMessage="M?? tr??? s??ch"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui l??ng nh???p M?? tr??? s??ch!"
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={8}>
						<Form.Item
							name="returnDate"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.returnBook.returnDate"
										defaultMessage="Ng??y tr??? s??ch"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui l??ng ch???n Ng??y tr??? s??ch!"
								}
							]}
						>
							<DatePicker
								format={"DD/MM/YYYY"}
								className={styles.fw}
							/>
						</Form.Item>
					</Col>
					<Col xs={8}>
						<Form.Item
							name="borrowBookId"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.returnBook.borrowBookId"
										defaultMessage="Phi???u m?????n s??ch"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui l??ng ch???n Phi???u m?????n s??ch!"
								}
							]}
						>
							<SelectBorrowBook
								borrowBookId={form.getFieldValue("borrowBookId")}
								onSelect={handleSelectBorrowBook}
							/>
						</Form.Item>
					</Col>
					<Col xs={24}>
						<Form.Item
							name="description"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.returnBook.description"
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
					code={form.getFieldValue("returnBookCode")}
					dataSource={returnBookDetail}
					getDataSource={dataSourceChange}
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
				"returnBookUpdate/getReturnBookUpdateRequest"
			],
		updatePayload: state.returnBookUpdate.payload,
		updateReturnBookSuccess: state.returnBookUpdate.success,
		detailPayload: state.returnBookDetail.payload,
		getDetailSuccess: state.returnBookDetail.success,
		detailBorrowBookPayload: state.borrowBookDetail.payload,
		getDetailBorrowBookSuccess: state.borrowBookDetail.success
	};
};

export default connect(mapStateToProps)(UpdateReturnBook);
