import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import {
	Col,
	Form,
	Row,
	Select,
	Input,
	Checkbox,
	DatePicker,
	Button,
	Divider
} from "antd";
import { useHistory } from "react-router";
import styles from "./style.less";
import { connect } from "umi";
import { useEffect } from "react";
import moment from "moment";

const { Option } = Select;
const { TextArea } = Input;

const Update = props => {
	const {
		success,
		projectPayload,
		dispatch,
		allCustomers,
		userRoles
	} = props;
	const id = props.match.params.id;
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
		payload["id"] = +id;
		payload.ngayBatDau = moment(payload.ngayBatDau).format("YYYY-MM-DD");
		dispatch({
			type: "projectUpdate/updateProjectRequest",
			payload: payload
		});
	};

	useEffect(() => {
		dispatch({
			type: "projectDetail/getProjectDetailRequest",
			id: id
		});
	}, []);

	useEffect(() => {
		dispatch({
			type: "customerList/getAllCustomerListRequest"
		});
	}, []);

	useEffect(() => {
		if (success) {
			let data = projectPayload;
			form.setFieldsValue({
				// nguoiTao: data.nguoiTao,
				// ngayTao: data.ngayTao,
				// nguoiSua: data.nguoiSua,
				// ngaySua: data.ngaySua,
				maDuAn: data.maDuAn,
				tenDuAn: data.tenDuAn,
				ngayBatDau: moment(data.ngayBatDau),
				ghiChu: data.ghiChu,
				khachHang_ID: data.khachHang_ID,
				isActive: data.isActive
			});
		}
	}, [success]);

	return (
		<div className={styles.container}>
			<Form
				form={form}
				{...formLayout}
				layout="vertical"
				onFinish={handleSubmit}
			>
				<Row gutter={8}>
					<Col xs={6}>
						<Form.Item
							name="maDuAn"
							label="Mã dự án"
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Mã dự án!"
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							name="khachHang_ID"
							label="Khách hàng"
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng chọn Khách hàng!"
								}
							]}
						>
							<Select placeholder="Vui lòng chọn Khách hàng">
								{allCustomers.map(customer => (
									<Option
										value={customer.id}
										map={customer.id}
									>
										{customer.tenKhachHang}
									</Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col xs={12}>
						<Form.Item
							name="tenDuAn"
							label="Tên dự án"
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng chọn nhập Tên dự án!"
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={24}>
						<Form.Item
							label="Ghi chú"
							name="ghiChu"
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Ghi chú!"
								}
							]}
						>
							<TextArea rows={8} />
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col xs={6}>
						<Form.Item
							name="ngayBatDau"
							label="Ngày bắt đầu dự án"
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng chọn ngày bắt đầu dự án!"
								}
							]}
						>
							<DatePicker
								placeholder="Chọn ngày"
								className={styles.fw}
								format="DD/MM/YYYY"
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col>
						<Form.Item name="isActive" valuePropName="checked">
							<Checkbox>Kích hoạt</Checkbox>
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
							Trở về
						</Button>
					</Col>
					<Col>
						<Button
							type="primary"
							icon={<SaveOutlined />}
							htmlType="submit"
							disabled={!userRoles?.DUAN?.sua ?? true}
						>
							Lưu
						</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		success: state.projectDetail.success,
		projectPayload: state.projectDetail.payload,
		allCustomers: state.customerList.allCustomers,
		loading:
			state.loading.effects["projectUpdate/updateProjectListRequest"],
		userRoles: state.UserRole.userRoles
	};
};

export default connect(mapStateToProps)(Update);
