/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "umi";
import { SaveOutlined } from "@ant-design/icons";
import { Button, Col, Row, Spin, Input, notification } from "antd";
import { useHistory } from "react-router";
import styles from "./style.less";
import qs from "query-string";
import DelegateTable from "./components/delegateTable";
import SelectUser from "../shared/selectUser";
import SelectPermissionGroup from "../shared/selectPermissionGroup";

const { Search } = Input;

const Delegate = props => {
	const {
		allRolesMutate,
		allUserRoles,
		allUserRoleSuccess,
		pgDetail,
		pgDetailsuccess,
		userRoles,
		dispatch,
		loading
	} = props;
	const history = useHistory();

	const [userId, setUserId] = useState(0);
	const [userStr, setUserStr] = useState(undefined);
	const [pgId, setPgId] = useState(0);
	const [pgStr, setPgStr] = useState(undefined);

	const handleUpdateUserRole = () => {
		if (userId) {
			const payload = allRolesMutate.map(role => ({
				id: role.id,
				nhanVien_Id: role.nhanVien_Id,
				role_Id: role.role_Id,
				xem: role.view,
				them: role.create,
				sua: role.update,
				xoa: role.delete
			}));
			dispatch({
				type: "delegateUpdate/updateUserRoleRequest",
				payload
			});
		} else {
			notification.warning({ message: "Vui lòng chọn nhân viên" });
		}
	};

	const handleSelectUserChange = userSelected => {
		try {
			console.log(JSON.parse(userSelected));
			setUserId(JSON.parse(userSelected).id);
			setUserStr(userSelected);
			setPgStr(undefined);
		} catch (err) {
			console.log(err);
		}
	};

	const handleSelectPermissionGroupChange = pgSelected => {
		try {
			console.log(JSON.parse(pgSelected));
			setPgId(JSON.parse(pgSelected).id);
			setPgStr(pgSelected);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (userId) {
			dispatch({
				type: "Common/getUserRoleByIdRequest",
				id: userId
			});
		}
	}, [userId]);

	useEffect(() => {
		if (pgId) {
			dispatch({
				type: "permissionGroupDetail/getPermissionGroupDetailRequest",
				id: pgId
			});
		}
	}, [pgId]);

	useEffect(() => {
		if (pgDetailsuccess && pgId !== 0) {
			// console.table("group role by id", pgDetail.roleGroupRoles);
			// console.table("all role mutate", allRolesMutate);
			const data = allRolesMutate;
			const payload =
				data.length > 0
					? data.map((role, index) => {
							return {
								...role,
								id: allRolesMutate?.[index]?.id,
								nhanVien_Id: userId,
								role_Id:
									pgDetail.roleGroupRoles?.[index]?.role_Id,
								view: pgDetail.roleGroupRoles?.[index]?.xem,
								create: pgDetail.roleGroupRoles?.[index]?.them,
								update: pgDetail.roleGroupRoles?.[index]?.sua,
								delete: pgDetail.roleGroupRoles?.[index]?.xoa,
								all:
									pgDetail.roleGroupRoles?.[index]?.xem &&
									pgDetail.roleGroupRoles?.[index]?.them &&
									pgDetail.roleGroupRoles?.[index]?.sua &&
									pgDetail.roleGroupRoles?.[index]?.xoa,
								none: !(
									pgDetail.roleGroupRoles?.[index]?.xem ||
									pgDetail.roleGroupRoles?.[index]?.them ||
									pgDetail.roleGroupRoles?.[index]?.sua ||
									pgDetail.roleGroupRoles?.[index]?.xoa
								)
							};
					  })
					: [];

			dispatch({
				type: "delegateList/mutateAllRoles",
				payload: [...payload]
			});
		}
	}, [pgDetailsuccess]);

	useEffect(() => {
		if (allUserRoleSuccess && userId !== 0) {
			// console.table("group role by id", pgDetail.roleGroupRoles);
			// console.table("all role mutate", allRolesMutate);
			const data = allRolesMutate;
			const payload =
				data.length > 0
					? data.map((role, index) => {
							return {
								...role,
								id: allUserRoles?.[index]?.id,
								nhanVien_Id: allUserRoles?.[index]?.nhanVien_Id,
								role_Id: allUserRoles?.[index]?.role_Id,
								view: allUserRoles?.[index]?.xem,
								create: allUserRoles?.[index]?.them,
								update: allUserRoles?.[index]?.sua,
								delete: allUserRoles?.[index]?.xoa,
								all:
									allUserRoles?.[index]?.xem &&
									allUserRoles?.[index]?.them &&
									allUserRoles?.[index]?.sua &&
									allUserRoles?.[index]?.xoa,
								none: !(
									allUserRoles?.[index]?.xem ||
									allUserRoles?.[index]?.them ||
									allUserRoles?.[index]?.sua ||
									allUserRoles?.[index]?.xoa
								)
							};
					  })
					: [];

			dispatch({
				type: "delegateList/mutateAllRoles",
				payload: [...payload]
			});
		}
	}, [allUserRoleSuccess]);

	return (
		<div className={styles.container}>
			<h1>Delegate page</h1>
			<Row justify="space-between" align="middle">
				<Spin spinning={loading} />
			</Row>
			<Row gutter={8}>
				<Col>
					<SelectUser
						style={{ width: 250 }}
						placeholder="Chọn nhân viên"
						value={userStr}
						removeFirstOption={false}
						onSelect={handleSelectUserChange}
					/>
				</Col>
				<Col>
					<SelectPermissionGroup
						style={{ width: 250 }}
						placeholder="Chọn nhóm quyền"
						value={pgStr}
						removeFirstOption={false}
						onSelect={handleSelectPermissionGroupChange}
					/>
				</Col>
			</Row>
			<Row className={styles.mt16}>
				<DelegateTable />
			</Row>
			<Row justify="end" gutter={8} className={styles.mt16}>
				<Col>
					<Button
						type="primary"
						icon={<SaveOutlined />}
						onClick={handleUpdateUserRole}
						disabled={!userRoles?.PHANQUYEN?.sua ?? true}
					>
						Cập nhật quyền
					</Button>
				</Col>
			</Row>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		allRolesMutate: state.delegateList.allRolesMutate,
		allUserRoles: state.Common.allUserRoles,
		allUserRoleSuccess: state.Common.allUserRoleSuccess,
		pgDetail: state.permissionGroupDetail.payload,
		pgDetailsuccess: state.permissionGroupDetail.success,
		loading: state.loading.effects["delegateList/getAllRoleListRequest"],

		userRoles: state.UserRole.userRoles
	};
};

export default connect(mapStateToProps)(Delegate);
