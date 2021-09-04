import {
	BackwardOutlined,
	FastBackwardOutlined,
	LeftOutlined,
	SaveOutlined
} from "@ant-design/icons";
import {
	Row,
	Form,
	Select,
	Col,
	Input,
	DatePicker,
	InputNumber,
	TimePicker,
	Button,
	Divider,
	Radio
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { connect } from "umi";
import { createDateAsUTC } from "../../../utils/utils";
import { limit } from "../const";
import styles from "./style.less";

const { Option } = Select;

const ReportForm = props => {
	const {
		currentUser,
		currentUserSuccess,
		reportDetailResponse,
		getDetailSuccess,
		updateLoading,
		createLoading,
		jobsList,
		statusList,
		allProjects,
		userRoles,
		dispatch
	} = props;

	const id = props.match.params.id;
	const isUpdate = id !== undefined;
	const [form] = Form.useForm();
	const history = useHistory();

	const disabledSaveBtn = () => {
		return isUpdate
			? !userRoles?.BAOCAO?.sua ?? true
			: !userRoles?.BAOCAO?.them ?? true;
	};

	const onFinish = payload => {
		const dateString = payload.ngayBaoCao.format("YYYY-MM-DD HH:mm");
		console.log("dateString", dateString);
		payload.ngayBaoCao = createDateAsUTC(
			new Date(payload.ngayBaoCao.format("YYYY-MM-DD HH:mm"))
		);
		payload.batDau = moment(payload.batDau).format("HH:mm");
		payload.ketThuc = moment(payload.ketThuc).format("HH:mm");
		if (isUpdate) {
			// dispatch update action
			payload["id"] = +id;
			payload["tenDangNhap"] = reportDetailResponse.tenDangNhap;
			dispatch({
				type: "reportUpdate/updateReportRequest",
				payload: payload
			});
		} else {
			//dispatch create action
			payload["tenDangNhap"] = currentUser?.tenDangNhap ?? "";
			dispatch({
				type: "reportCreate/createReportRequest",
				payload: payload
			});
		}
		// form.resetFields();
	};

	const getGroupListByType = type => {
		dispatch({
			type: "groupList/getGroupListByTypeRequest",
			payload: { type: type }
		});
	};

	const getReportDetail = id => {
		dispatch({
			type: "reportDetail/getReportDetailRequest",
			id: id
		});
	};

	const getCurrentUser = () => {
		dispatch({ type: "currentUser/getCurrentUserRequest" });
	};

	const getAllProjects = () => {
		dispatch({ type: "projectList/getAllProjectListRequest" });
	};

	useEffect(() => {
		getGroupListByType(11);
		getGroupListByType(12);
		getAllProjects();
	}, []);

	useEffect(() => {
		if (currentUserSuccess && !isUpdate) {
			form.setFieldsValue({
				nguoiBaoCao: currentUser.tenNhanVien,
				ngayBaoCao: moment()
			});
		}
	}, [currentUserSuccess]);

	useEffect(() => {
		isUpdate ? getReportDetail(id) : getCurrentUser();
	}, [id]);
	const [status, setStatus] = useState("");
	const [task, setTask] = useState("");
	useEffect(() => {
		if (getDetailSuccess) {
			if (isUpdate) {
				let data = reportDetailResponse;
				form.setFieldsValue({
					id: data.id,
					duAn_ID: data.duAn_ID,
					nguoiBaoCao: data.tenNguoiBaoCao,
					ngayBaoCao: moment(data.ngayBaoCao),
					moTa: data.moTa,
					loai: data.loai,
					trangThai: data.trangThai,
					soGioDuKien: data.soGioDuKien,
					batDau: moment(data.batDau, "HH:mm"),
					ketThuc: moment(data.ketThuc, "HH:mm")
				});
				setStatus(data.trangThai);
				setTask(data.loai);
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
	return (
		<div className={styles.container}>
			<Form
				{...formItemLayout}
				form={form}
				layout="vertical"
				onFinish={onFinish}
			>
				<Row gutter={8}>
					<Col xs={12}>
						<Form.Item
							name="duAn_ID"
							label="Dự án"
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng chọn dự án!"
								}
							]}
						>
							<Select placeholder="Vui lòng chọn dự án">
								{allProjects?.map(item => (
									<Option key={item.id} value={item.id}>
										{item.tenDuAn}
									</Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							name="nguoiBaoCao"
							label="Người báo cáo"
							hasFeedback
							rules={
								[
									// {
									// 	required: true,
									// 	message: "Vui lòng chọn dự án!"
									// }
								]
							}
							disable
						>
							<Input disabled={true} />
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							name="ngayBaoCao"
							label="Ngày báo cáo"
							hasFeedback
							rules={
								[
									// {
									// 	required: true,
									// 	message: "Vui lòng chọn dự án!"
									// }
								]
							}
						>
							<DatePicker showTime className={styles.fw} />
						</Form.Item>
					</Col>
					<Col xs={24}>
						<Form.Item
							label="Mô tả"
							name="moTa"
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập mô tả!"
								}
							]}
						>
							<TextArea />
						</Form.Item>
					</Col>
					<Col xs={10}>
						<Form.Item
							name="loai"
							label="Công việc"
							rules={[
								{
									required: true,
									message: "Vui lòng chọn công việc!"
								}
							]}
							hasFeedback
						>
							{jobsList?.length >= limit && (
								<Select placeholder="Vui lòng chọn công việc!">
									{jobsList?.map(item => (
										<Option value={item.id} key={item.id}>
											{item.tenNhom}
										</Option>
									))}
								</Select>
							)}
							{jobsList?.length < limit && (
								<Radio.Group
									className={`${styles.fw} ${styles.flexBox}`}
									value={task}
								>
									{jobsList?.map(item => (
										<Radio.Button
											className={styles.flexItem}
											value={item.id}
											key={item.id}
											onChange={e => {
												form.setFieldsValue({
													loai: e.target.value
												});
												setTask(e.target.value);
											}}
										>
											{item.tenNhom}
										</Radio.Button>
									))}
								</Radio.Group>
							)}
						</Form.Item>
					</Col>
					<Col xs={10}>
						<Form.Item
							name="trangThai"
							label="Trạng thái"
							rules={[
								{
									required: true,
									message:
										"Vui lòng chọn trạng thái công việc!"
								}
							]}
							hasFeedback
						>
							{statusList?.length >= limit && (
								<Select placeholder="Vui lòng chọn trạng thái công việc!">
									{statusList?.map(item => (
										<Option value={item.id} key={item.id}>
											{item.tenNhom}
										</Option>
									))}
								</Select>
							)}
							{statusList?.length < limit && (
								<Radio.Group
									className={`${styles.fw} ${styles.flexBox}`}
									value={status}
								>
									{statusList?.map(item => (
										<Radio.Button
											className={styles.flexItem}
											value={item.id}
											key={item.id}
											onChange={e => {
												form.setFieldsValue({
													trangThai: e.target.value
												});
												setStatus(e.target.value);
											}}
										>
											{item.tenNhom}
										</Radio.Button>
									))}
								</Radio.Group>
							)}
						</Form.Item>
					</Col>
					<Col xs={4}>
						<Form.Item
							name="soGioDuKien"
							label="Số giờ dự kiến"
							rules={[
								{
									required: true,
									message: "Vui lòng nhập số giờ dự kiến!"
								}
							]}
							labelCol={{ span: 24 }}
							hasFeedback
						>
							<InputNumber className={styles.fw} />
						</Form.Item>
					</Col>
					{/* <Col xs={12}></Col> */}
					<Col xs={5}>
						<Form.Item
							label="Bắt đầu"
							name="batDau"
							// rules={[
							// 	[
							// 		{
							// 			required: true,
							// 			message:
							// 				"Vui lòng chọn thời gian bắt đầu"
							// 		}
							// 	]
							// ]}

							hasFeedback
						>
							<TimePicker
								defaultValue={moment()}
								className={styles.fw}
							/>
						</Form.Item>
					</Col>
					<Col xs={5}>
						<Form.Item
							label="Kết thúc"
							name="ketThuc"
							rules={[
								{
									required: true,
									message: "Vui lòng chọn thời gian kết thúc"
								}
							]}
							hasFeedback
						>
							<TimePicker
								defaultValue={moment()}
								className={styles.fw}
							/>
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
		reportDetailResponse: state.reportDetail.response,
		getDetailSuccess: state.reportDetail.success,

		updateSuccess: state.reportUpdate.success,
		updateLoading:
			state.loading.effects["reportUpdate/updateReportRequest"],

		createSuccess: state.reportCreate.success,
		createLoading:
			state.loading.effects["reportCreate/createReportRequest"],

		jobsList: state.groupList.jobsListResponse,
		// jobsListSuccess: state.groupList.jobsListSuccess,

		statusList: state.groupList.statusListResponse,
		// statusListSuccess: state.groupList.statusListSuccess

		currentUser: state.currentUser.response,
		currentUserSuccess: state.currentUser.success,

		allProjects: state.projectList.allProjects,

		userRoles: state.UserRole.userRoles
	};
};
export default connect(mapStateToProps)(ReportForm);
