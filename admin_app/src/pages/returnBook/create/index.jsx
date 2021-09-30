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
import DetailTable from "../components/detailTable";
import { generateCode } from "../../../utils/utils";

const { TextArea } = Input;
const { Title } = Typography;

const CreateReturnBook = props => {
	const {
		getDetailSuccess,
		detailPayload,
		createReturnBookSuccess,
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
			returnBook: {
				...payload,
				borrowBook_Id: payload.borrowBookId
			},
			returnBookDetails: [
				...returnBookDetail.map(row => ({
					id: 0,
					returnBook_Id: 0,
					book_Id: row.bookIdHide,
					returnBookDetailCode: row.returnBookDetailCode,
					quantity: row.quantity,
					description: row.description
				}))
			]
		};

		dispatch({
			type: "returnBookCreate/createReturnBookRequest",
			payload: convertPayload
		});
	};

	useEffect(() => {
		if (createReturnBookSuccess) {
			dispatch({
				type: "returnBookCreate/clearState"
			});
			history.goBack();
		}
	}, [createReturnBookSuccess]);

	useEffect(() => {
		dispatch({
			type: "bookAll/getAllBookRequest"
		});
		form.setFieldsValue({ returnBookCode: generateCode("RB") });
	}, []);

	useEffect(() => {
		if (getDetailSuccess) {
			const data = detailPayload?.item?.value;
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
	}, [getDetailSuccess]);

	return (
		<div className={styles.container}>
			<Row>
				<Col>
					<Title level={4}>
						<FormattedMessage
							id="pages.returnBook.titleForm"
							defaultMessage="THÔNG TIN TRẢ SÁCH"
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
										defaultMessage="Mã trả sách"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Mã trả sách!"
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
										defaultMessage="Ngày trả sách"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng chọn Ngày trả sách!"
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
										defaultMessage="Phiếu mượn sách"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng chọn Phiếu mượn sách!"
								}
							]}
						>
							<SelectBorrowBook
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
		loading:
			state.loading.effects[
				"returnBookCreate/getReturnBookCreateRequest"
			],
		createPayload: state.returnBookCreate.payload,
		createReturnBookSuccess: state.returnBookCreate.success,
		detailPayload: state.borrowBookDetail.payload,
		getDetailSuccess: state.borrowBookDetail.success
	};
};

export default connect(mapStateToProps)(CreateReturnBook);
