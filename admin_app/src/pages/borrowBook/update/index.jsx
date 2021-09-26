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
import { useEffect } from "react";
import SelectStudent from "../../shared/select/selectStudent";
// import DetailTable from "../components/detailTable";
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
		const convertPayload = {
			id: +props.match.params.id,
			borrowBook: {
				...payload,
				id: +props.match.params.id,
				student_Id: payload.studentId
			},
			borrowBookDetails: []
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
							defaultMessage="THÔNG TIN MƯỢN SÁCH"
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
										defaultMessage="Mã mượn sách"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Mã mượn sách!"
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
										defaultMessage="Ngày mượn sách"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng chọn Ngày mượn sách!"
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
										defaultMessage="Số ngày mượn sách"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập số ngày mượn sách!"
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
										defaultMessage="Sinh viên"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng chọn Sinh viên!"
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
				{/* <DetailTable /> */}
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
				"borrowBookUpdate/getBorrowBookUpdateRequest"
			],
		updatePayload: state.borrowBookUpdate.payload,
		updateBorrowBookSuccess: state.borrowBookUpdate.success,
		detailPayload: state.borrowBookDetail.payload,
		getDetailSuccess: state.borrowBookDetail.success
	};
};

export default connect(mapStateToProps)(UpdateBorrowBook);
