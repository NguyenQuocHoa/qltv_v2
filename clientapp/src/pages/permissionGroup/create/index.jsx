import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import { Col, Form, Row, Input, Checkbox, Button, Divider } from "antd";
import { useHistory } from "react-router";
import styles from "./style.less";
import { connect } from "umi";
import PermissionDetailTable from "../components/permissionDetailTable";

const { TextArea } = Input;

const Create = props => {
	const { allRolesMutate, userRoles, dispatch } = props;
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
		payload["nguoitao"] = "Administrator";
		payload["roleGroupRoles"] = allRolesMutate.map(item => ({
			grouprole_Id: 0,
			role_Id: item.role_Id,
			xem: item.view,
			them: item.create,
			sua: item.update,
			delete: item.delete
		}));
		dispatch({
			type: "permissionGroupCreate/createPermissionGroupRequest",
			payload: payload
		});
	};

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
							disabled={!userRoles?.NHOMQUYEN?.them ?? true}
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
		allRolesMutate: state.delegateList.allRolesMutate,
		loading:
			state.loading.effects[
				"permissionGroupCreate/getPermissionGroupCreateRequest"
			],
		userRoles: state.UserRole.userRoles
	};
};

export default connect(mapStateToProps)(Create);
