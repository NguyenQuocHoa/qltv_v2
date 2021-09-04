import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import {
	Col,
	Form,
	Row,
	Select,
	Input,
	InputNumber,
	Checkbox,
	DatePicker,
	Button,
	Divider,
	notification
} from "antd";
import { useHistory } from "react-router";
import styles from "./style.less";
import { connect } from "umi";
import { useEffect } from "react";

const { Option } = Select;
const { TextArea } = Input;

const CreateCustomer = props => {
	const { dispatch } = props;
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
		// validate email & sdt
		let phoneInValid = true;
		let emailInValid = true;
		if (
			payload.sdt === null ||
			payload.sdt === "" ||
			/^(84|0[3|5|7|8|9])+([0-9]{8})\b$/.test(payload.sdt)
		) {
			phoneInValid = false;
		} else {
			phoneInValid = false;
			notification.error({
				message: "Vui lòng nhập đúng định dạng số điện thoại!"
			});
		}
		if (
			payload.email == null ||
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				payload.email
			)
		) {
			emailInValid = false;
		} else {
			emailInValid = true;
			notification.error({
				message: "Vui lòng nhập đúng định dạng email!"
			});
		}

		if (!phoneInValid && !emailInValid) {
			for (let key in payload) {
				if (payload[key] === undefined) {
					payload[key] = null;
				}
			}
			payload.danhSachLienHe = [];
			payload.danhSachCongNo = [];
			payload.strDanhSachLienHe = null;

			dispatch({
				type: "customerCreate/createCustomerRequest",
				payload: payload
			});
		}
	};

	useEffect(() => {
		form.setFieldsValue({
			isActive: false,
			daChamSoc: false
		});
	}, []);

	return (
		<div className={styles.container}>
			<Form
				form={form}
				{...formLayout}
				layout="vertical"
				onFinish={handleSubmit}
			>
				<Row gutter={8} className={styles.fullSpan}>
					<Col xs={6}>
						<Form.Item
							name="maKhachHang"
							label="Mã khách hàng"
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Mã khách hàng!"
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							name="tenKhachHang"
							label="Tên khách hàng"
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Tên khách hàng!"
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={12}>
						<Form.Item
							name="diaChi"
							label="Địa chỉ"
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Địa chỉ khách hàng!"
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							name="sdt"
							label="Số điện thoại"
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Số điện thoại!"
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item name="email" label="Email" hasFeedback>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item name="fax" label="Fax" hasFeedback>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							name="trangWeb"
							label="Trang web"
							hasFeedback
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							name="tenNguoiDaiDien"
							label="Tên người đại diện"
							hasFeedback
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item name="chucVu" label="Chức vụ" hasFeedback>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							name="ngaySinh"
							label="Ngày sinh"
							hasFeedback
						>
							<DatePicker
								placeholder="Chọn ngày"
								className={styles.fw}
								format="DD/MM/YYYY"
							/>
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							name="cmnd"
							label="Chứng minh nhân dân"
							hasFeedback
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							name="soTaiKhoan"
							label="Số tài khoản"
							hasFeedback
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							name="tenChuTaiKhoan"
							label="Tên chủ tài khoản"
							hasFeedback
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							name="tenNganHang"
							label="Tên ngân hàng"
							hasFeedback
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							name="diaChiXuatHoaDon"
							label="Địa chỉ xuất hóa đơn"
							hasFeedback
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							name="congNoDinhMuc"
							label="Công nợ định mức"
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Công nợ định mức!"
								}
							]}
						>
							<InputNumber min={0} className={styles.fw} />
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							name="congNoBanDau"
							label="Công nợ ban đầu"
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Công nợ ban đầu!"
								}
							]}
						>
							<InputNumber min={0} className={styles.fw} />
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							name="soNgayNhacNo"
							label="Số ngày nhắc nợ"
							hasFeedback
						>
							<InputNumber
								min={0}
								max={365}
								className={styles.fw}
							/>
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item name="hanNo" label="Hạn nợ" hasFeedback>
							<InputNumber
								min={0}
								max={365}
								className={styles.fw}
							/>
						</Form.Item>
					</Col>
					<Col xs={24}>
						<Form.Item label="Ghi chú" name="ghiChu" hasFeedback>
							<TextArea rows={4} />
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col xs={6}>
						<Form.Item name="isActive" valuePropName="checked">
							<Checkbox>Kích hoạt</Checkbox>
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item name="daChamSoc" valuePropName="checked">
							<Checkbox>Đã chăm sóc</Checkbox>
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
		loading:
			state.loading.effects["customerCreate/getCustomerCreateRequest"]
	};
};

export default connect(mapStateToProps)(CreateCustomer);
