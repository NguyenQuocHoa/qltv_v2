import { InboxOutlined, LeftOutlined, SaveOutlined } from "@ant-design/icons";
import {
	Row,
	Form,
	Select,
	Col,
	Input,
	DatePicker,
	Button,
	Divider,
	Upload,
	Image,
	Radio
} from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { connect } from "umi";
import { isVietnamesePhoneNumber } from "../../../utils/utils";
import styles from "./style.less";

const { Option } = Select;

const UserForm = props => {
	const {
		currentUser,
		userDetailResponse,
		getDetailSuccess,
		updateSuccess,
		updateLoading,
		createSuccess,
		createLoading,
		allUserGroupResponse,
		userRoles,
		dispatch
	} = props;
	const imagSourceUrl = "http://27.77.55.90:8080/api/User/Picture/";
	const id = props.match.params.id;
	const isUpdate = id !== undefined;
	const [form] = Form.useForm();
	const history = useHistory();

	const disabledSaveBtn = () => {
		return isUpdate
			? !userRoles?.NHANVIEN?.sua ?? true
			: !userRoles?.NHANVIEN?.them ?? true;
	};

	const onFinish = payload => {
		console.log("[payload]", payload);
		const form = new FormData();

		form.append("tendangnhap", payload.tendangnhap);
		form.append("matkhau", payload.matkhau ?? "");
		form.append("email", payload.email);
		form.append("isActive", payload.isActive ?? false);
		form.append("ghichu", payload.ghichu);
		form.append("tennhanvien", payload.tennhanvien);
		form.append("ngaysinh", moment(payload.ngaysinh).format("YYYY-MM-DD"));
		form.append("sdt", payload.sdt);
		form.append("cmnd", payload.cmnd);
		form.append("diachi", payload.diachi);
		form.append("gioitinh", payload.gioitinh);
		form.append("nhomnhanvien_id", payload.nhomnhanvien_id);
		// form.append("ngayBatDau", new Date(payload.ngaybatdau));
		console.log(previewImgFile);
		if (typeof previewImgFile?.file === "object") {
			form.append("picture", previewImgFile.file);
		} else {
			form.append(
				"hinhanh",
				previewImgFile?.imgSrc?.split("/").slice(-1)[0] ?? ""
			);
		}
		if (isUpdate) {
			// dispatch update action
			form.append("id", id);
			form.append("nguoisua", currentUser?.tenDangNhap);
			dispatch({
				type: "userUpdate/updateUserRequest",
				payload: {
					formData: form,
					id: id
				}
			});
		} else {
			//dispatch create action
			form.append("nguoiTao", currentUser?.tenDangNhap);
			dispatch({
				type: "userCreate/createUserRequest",
				payload: { formData: form }
			});
		}
		// form.resetFields();
	};

	const getUserDetail = id => {
		dispatch({
			type: "userDetail/getUserDetailRequest",
			id: id
		});
	};

	const getCurrentUser = () => {
		dispatch({ type: "currentUser/getCurrentUserRequest" });
	};

	const getUserGroup = () => {
		dispatch({ type: "userGroupList/getAllListUserGroupRequest" });
	};

	// get list user group
	useEffect(() => {
		getUserGroup();
		getCurrentUser();
	}, []);

	useEffect(() => {
		if (updateSuccess || createSuccess) getUserDetail(id);
	}, [updateSuccess, createSuccess]);

	useEffect(() => {
		if (isUpdate) getUserDetail(id);
	}, [id]);

	useEffect(() => {
		if (getDetailSuccess) {
			if (isUpdate) {
				let data = userDetailResponse;
				form.setFieldsValue({
					id: data.id,
					tendangnhap: data.tenDangNhap ?? "",
					matkhau: data.matKhau ?? "",
					email: data.email ?? "",
					nhomnhanvien_id: data.nhomNhanVien_Id ?? "",
					ghichu: data.ghiChu ?? "",
					tennhanvien: data.tenNhanVien ?? "",
					cmnd: data.cmnd ?? "",
					sdt: data.sdt ?? "",
					diachi: data.diaChi ?? "",
					ngaysinh: moment(data.ngaySinh) ?? "",
					gioitinh: data.gioiTinh ?? "",
					isActive: data.isActive ?? ""
				});

				setPreviewImgFile({
					...previewImgFile,
					imgSrc: imagSourceUrl.concat(data.hinhAnh)
				});
			}
		}
	}, [getDetailSuccess]);

	const formItemLayout = {
		labelCol: {
			span: 12
		},
		wrapperCol: {
			span: 24
		}
	};

	const [previewImgFile, setPreviewImgFile] = useState(null);
	// const onUploadChange = info => {
	// 	const imgFile = {
	// 		file: null,
	// 		previewImg: ""
	// 	};
	// 	switch (info.file.status) {
	// 		case "uploading":
	// 			imgFile.file = info.file;
	// 			// var image = await this.toBstr(file);
	// 			break;
	// 		case "done":
	// 			imgFile.file = info.file;
	// 			break;
	// 		default:
	// 			// error or removed
	// 			imgFile = {
	// 				file: null,
	// 				previewImgFile: ""
	// 			};
	// 	}
	// 	setPreviewImgFile(imgFile);
	// };

	const toBstr = file =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
		});
	const onUpload = async options => {
		const { onSuccess, onError, file } = options;
		try {
			const imageSrc = await toBstr(file);
			setPreviewImgFile({
				file: file,
				imgSrc: imageSrc
			});
			onSuccess("Ok");
		} catch (err) {
			onError({ err });
		}
	};

	const validateMessages = {
		required: "${label} is required!",
		types: {
			email: "${label} is not a valid email!",
			number: "${label} is not a valid number!"
		},
		number: {
			range: "${label} must be between ${min} and ${max}"
		}
	};
	return (
		<div className={styles.container}>
			<Form
				{...formItemLayout}
				form={form}
				layout="vertical"
				onFinish={onFinish}
				validateMessages={validateMessages}
			>
				<Row gutter={16}>
					<Divider orientation="left" plain>
						Thông tin chung
					</Divider>
					<Col xs={8}>
						<Form.Item label="Ảnh đại diện">
							<Upload.Dragger
								// onChange={onUploadChange}
								customRequest={onUpload}
								name="file"
								multiple={false}
								showUploadList={false}
								accept="image/*"
							>
								{previewImgFile?.imgSrc === undefined ? (
									<>
										<p className="ant-upload-drag-icon">
											<InboxOutlined />
										</p>
										<p className="ant-upload-text">
											Chọn hoặc kéo ảnh vào khung này để
											tải lên
										</p>
									</>
								) : (
									<Image
										style={{ height: 172, width: "auto" }}
										preview={false}
										src={previewImgFile.imgSrc}
										fallback="data:image/png;base64,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"
									/>
								)}
							</Upload.Dragger>
						</Form.Item>
					</Col>
					<Col xs={16}>
						<Row gutter={16}>
							<Col xs={12}>
								<Form.Item
									name="tendangnhap"
									label="Tên đăng nhập"
									hasFeedback
									rules={[
										{
											required: true,
											message:
												"Vui lòng nhập tên đăng nhập"
										}
									]}
								>
									<Input />
								</Form.Item>
								{!isUpdate && (
									<Form.Item
										label="Mật khẩu"
										name="matkhau"
										KasFeedback
										rules={[
											{
												required: true,
												message:
													"Vui lòng nhập mật khẩu!"
											}
										]}
									>
										<Input.Password />
									</Form.Item>
								)}
								<Form.Item
									name="email"
									label="Email"
									hasFeedback
									rules={[{ type: "email" }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={12}>
								<Form.Item
									name="nhomnhanvien_id"
									label="Nhóm người dùng"
									hasFeedback
									rules={[
										{
											required: true,
											message:
												"Vui lòng chọn nhóm người dùng!"
										}
									]}
								>
									<Select placeholder="Vui lòng chọn nhóm người dùng">
										{allUserGroupResponse?.map(item => (
											<Option
												key={item.id}
												value={item.id}
											>
												{item.tenNhomNhanVien}
											</Option>
										))}
									</Select>
								</Form.Item>
								<Form.Item
									name="ghichu"
									label="Ghi chú"
									hasFeedback
								>
									<TextArea rows={5} />
								</Form.Item>
							</Col>
						</Row>
					</Col>
				</Row>
				<Divider orientation="left" plain>
					Thông cá nhân
				</Divider>
				<Row gutter={16}>
					<Col xs={8}>
						<Form.Item
							label="Họ tên nhân viên"
							name="tennhanvien"
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập tên nhân viên!"
								}
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label="Địa chỉ"
							name="diachi"
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập địa chỉ nhân viên!"
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={8}>
						<Form.Item
							label="Số CMT/CCCD"
							name="cmnd"
							hasFeedback
							rules={[
								{
									required: true,
									message:
										"Vui lòng nhập số Chứng minh thư hoặc công cước công dân!"
								}
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label="Số điện thoại"
							name="sdt"
							hasFeedback
							rules={[
								{
									required: true,
									message:
										"Vui lòng nhập số điện thoại nhân viên!"
								},
								{
									validator(rule, value = "") {
										if (!isVietnamesePhoneNumber(value)) {
											return Promise.reject(
												"Sai định dạng số điện thoại!"
											);
										} else {
											return Promise.resolve();
										}
									}
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={8}>
						<Form.Item
							label="Ngày sinh"
							name="ngaysinh"
							rules={[
								{
									required: true,
									message:
										"Vui lòng nhập ngày sinh nhân viên!"
								}
							]}
							hasFeedback
						>
							<DatePicker
								placeholder="Chọn ngày"
								format="DD/MM/YYYY"
								className={styles.fw}
							/>
						</Form.Item>

						<Form.Item
							label="Giới tính"
							name="gioitinh"
							hasFeedback
						>
							<Radio.Group
								value={allUserGroupResponse.gioiTinh}
								className={styles.fw}
							>
								<Radio.Button value={1}>Nam</Radio.Button>
								<Radio.Button value={0}>Nữ</Radio.Button>
								{/* <Radio.Button value="">Khác</Radio.Button> */}
							</Radio.Group>
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
							loading={isUpdate ? updateLoading : createLoading}
							icon={<SaveOutlined />}
							htmlType="submit"
							disabled={disabledSaveBtn()}
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
		userDetailResponse: state.userDetail.response,
		getDetailSuccess: state.userDetail.success,

		updateSuccess: state.userUpdate.success,
		updateLoading: state.loading.effects["userUpdate/updateUserRequest"],

		createSuccess: state.userCreate.success,
		createLoading: state.loading.effects["userCreate/createUserRequest"],

		allUserGroupResponse: state.userGroupList.allUserGroupResponse,

		currentUser: state.currentUser.response,
		currentUserSuccess: state.currentUser.success,

		userRoles: state.UserRole.userRoles
	};
};
export default connect(mapStateToProps)(UserForm);
