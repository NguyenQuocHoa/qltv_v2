/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "umi";
import { Checkbox } from "antd";
import styles from "./style.less";

const DelegateTable = props => {
	const { dispatch, allRoles, allRoleSuccess, allRolesMutate } = props;

	const [data, setData] = useState(allRolesMutate);
	console.table("data of table", allRolesMutate);

	useEffect(() => {
		dispatch({
			type: "delegateList/getAllRoleListRequest",
			payload: {}
		});
	}, []);

	useEffect(() => {
		setData(allRolesMutate);
	}, [allRolesMutate]);

	useEffect(() => {
		if (allRoleSuccess) {
			setData(
				allRoles.items.map(role => {
					return {
						id: role.id,
						code: role.roleCode,
						name: role.roleName,
						view: false,
						create: false,
						update: false,
						delete: false,
						all: false,
						none: true
					};
				})
			);
		}
	}, [allRoleSuccess]);

	const checkBoxNormalChange = (name, value, index) => {
		const record = data[index];
		record[name] = !value;
		record.all =
			record.view && record.create && record.update && record.delete;
		record.none = !(
			record.view ||
			record.create ||
			record.update ||
			record.delete
		);

		dispatch({
			type: "delegateList/mutateAllRoles",
			payload: [
				...data.slice(0, index),
				{ ...record },
				...data.slice(index + 1)
			]
		});
	};

	const checkAllChange = (value, index) => {
		const record = data[index];
		for (let key in record) {
			if (
				key !== "id" &&
				key !== "name" &&
				key != "nhanVien_Id" &&
				key !== "role_Id"
			)
				record[key] = !value;
		}
		record.none = value;

		dispatch({
			type: "delegateList/mutateAllRoles",
			payload: [
				...data.slice(0, index),
				{ ...record },
				...data.slice(index + 1)
			]
		});
	};

	const checkNoneChange = (value, index) => {
		const record = data[index];
		for (let key in record) {
			if (
				key !== "id" &&
				key !== "name" &&
				key != "nhanVien_Id" &&
				key !== "role_Id"
			)
				record[key] = !value;
		}
		record.none = value;

		dispatch({
			type: "delegateList/mutateAllRoles",
			payload: [
				...data.slice(0, index),
				{ ...record },
				...data.slice(index + 1)
			]
		});
	};

	return (
		<table className={styles.delegateTable}>
			<thead>
				<tr>
					<th>
						<strong>Tên quyền</strong>
					</th>
					<th>
						<strong>Xem</strong>
					</th>

					<th>
						<strong>Thêm</strong>
					</th>

					<th>
						<strong>Sửa</strong>
					</th>

					<th>
						<strong>Xóa</strong>
					</th>

					<th>
						<strong>Tất cả</strong>
					</th>

					<th>
						<strong>Không</strong>
					</th>
				</tr>
			</thead>
			<tbody>
				{data.length > 0 &&
					data.map((role, index) => (
						<tr key={role.id}>
							<td>
								<span>
									<strong>{role.name}</strong>
								</span>
							</td>
							<td>
								<Checkbox
									checked={role.view}
									onChange={() =>
										checkBoxNormalChange(
											"view",
											role.view,
											index
										)
									}
								/>
							</td>
							<td>
								<Checkbox
									checked={role.create}
									onChange={() =>
										checkBoxNormalChange(
											"create",
											role.create,
											index
										)
									}
								/>
							</td>
							<td>
								<Checkbox
									checked={role.update}
									onChange={() =>
										checkBoxNormalChange(
											"update",
											role.update,
											index
										)
									}
								/>
							</td>
							<td>
								<Checkbox
									checked={role.delete}
									onChange={() =>
										checkBoxNormalChange(
											"delete",
											role.delete,
											index
										)
									}
								/>
							</td>
							<td>
								<Checkbox
									checked={role.all}
									onChange={() =>
										checkAllChange(role.all, index)
									}
								/>
							</td>
							<td>
								<Checkbox
									checked={role.none}
									onChange={() =>
										checkNoneChange(role.name, index)
									}
								/>
							</td>
						</tr>
					))}
			</tbody>
		</table>
	);
};

const mapStateToProps = state => {
	return {
		allRoles: state.delegateList.allRoles,
		allRoleSuccess: state.delegateList.allRoleSuccess,
		allRolesMutate: state.delegateList.allRolesMutate,
		loading: state.loading.effects["delegateList/getAllRoleListRequest"]
	};
};

export default connect(mapStateToProps)(DelegateTable);
