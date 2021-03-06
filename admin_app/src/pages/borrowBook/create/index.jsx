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
import { generateCode } from "../../../utils/utils";

const { TextArea } = Input;
const { Title } = Typography;

const CreateBorrowBook = props => {
	const { createBorrowBookSuccess, dispatch } = props;
	const [form] = Form.useForm();
	const [borrowBookDetail, setBorrowBookDetal] = useState([]);
	const [code, setCode] = useState(null);
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
		setBorrowBookDetal(dataSource);
	};

	const handleSubmit = payload => {
		const convertPayload = {
			borrowBook: {
				...payload,
				student_Id: payload.studentId
			},
			borrowBookDetails: [
				...borrowBookDetail.map(row => ({
					id: 0,
					book_Id: row.bookIdHide,
					borrowBookDetailCode: row.borrowBookDetailCode,
					quantity: row.quantity,
					description: row.description,
					borrowBook_Id: 0
				}))
			]
		};

		dispatch({
			type: "borrowBookCreate/createBorrowBookRequest",
			payload: convertPayload
		});
	};

	useEffect(() => {
		if (createBorrowBookSuccess) {
			dispatch({
				type: "borrowBookCreate/clearState"
			});
			history.goBack();
		}
	}, [createBorrowBookSuccess]);

	useEffect(() => {
		const code = generateCode("BB");
		form.setFieldsValue({ borrowBookCode: code });
		setCode(code);
	}, []);

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
					code={code}
					dataSource={borrowBookDetail}
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
				"borrowBookCreate/getBorrowBookCreateRequest"
			],
		createPayload: state.borrowBookCreate.payload,
		createBorrowBookSuccess: state.borrowBookCreate.success
	};
};

export default connect(mapStateToProps)(CreateBorrowBook);
