/* eslint-disable react-hooks/exhaustive-deps */
import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import { Col, Form, Row, Input, Checkbox, Button, Divider } from "antd";
import { useHistory } from "react-router";
import styles from "./style.less";
import { connect } from "umi";
import { useEffect } from "react";
import PermissionDetailTable from "../components/permissionDetailTable";

const { TextArea } = Input;

const Update = props => {
	const {
		success,
		pgPayload,
		allRoles,
		allRolesMutate,
		userRoles,
		dispatch
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
		payload["roleGroupRoles"] = allRolesMutate.map(item => ({
			id: item.id,
			groupRole_Id: item.groupRole_Id,
			role_Id: item.role_Id,
			xem: item.view,
			them: item.create,
			sua: item.update,
			xoa: item.delete,
			isSua: item.isSua
		}));
		dispatch({
			type: "permissionGroupUpdate/updatePermissionGroupRequest",
			payload: payload
		});
	};

	useEffect(() => {
		dispatch({
			type: "permissionGroupDetail/getPermissionGroupDetailRequest",
			id: id
		});
	}, []);

	useEffect(() => {
		if (success) {
			let data = pgPayload;
			form.setFieldsValue({
				// nguoiTao: data.nguoiTao,
				// ngayTao: data.ngayTao,
				// nguoiSua: data.nguoiSua,
				// ngaySua: data.ngaySua,
				groupRoleName: data.groupRoleName,
				ghiChu: data.ghiChu,
				isActive: data.isActive
			});
			// console.table("data", data.roleGroupRoles);
			// console.table("all role", allRoles);

			const payload = data.roleGroupRoles.map((role, index) => ({
				id: role.id,
				groupRole_Id: role.groupRole_Id,
				role_Id: role.role_Id,
				name: allRoles[index].roleName,
				view: role.xem,
				create: role.them,
				update: role.sua,
				delete: role.xoa,
				all: role.xem && role.them && role.sua && role.xoa,
				none: !(role.xem || role.them || role.sua || role.xoa),
				isSua: role.isSua
			}));

			dispatch({
				type: "delegateList/mutateAllRoles",
				payload
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
				<Row gutter={8} align="bottom">
					<Col xs={20}>
						<Form.Item
							name="groupRoleName"
							label="Tên nhóm quyền"
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Tên nhóm quyền!"
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={4}>
						<Row justify="center" align="bottom">
							<Col>
								<Form.Item
									name="isActive"
									valuePropName="checked"
								>
									<Checkbox>Kích hoạt</Checkbox>
								</Form.Item>
							</Col>
						</Row>
					</Col>
					<Col xs={24}>
						<Form.Item label="Ghi chú" name="ghiChu">
							<TextArea rows={3} />
						</Form.Item>
					</Col>
				</Row>
				<Row className={styles.mt16}>
					<Col xs={24}>
						<PermissionDetailTable />
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
							disabled={!userRoles?.NHOMQUYEN?.sua ?? true}
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
		success: state.permissionGroupDetail.success,
		pgPayload: state.permissionGroupDetail.payload,
		allRoles: state.delegateList.allRoles.items,
		allRolesMutate: state.delegateList.allRolesMutate,
		loading:
			state.loading.effects[
				"permissionGroupUpdate/updatePermissionGroupListRequest"
			],
		userRoles: state.UserRole.userRoles
	};
};

export default connect(mapStateToProps)(Update);
