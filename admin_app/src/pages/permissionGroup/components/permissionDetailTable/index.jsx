/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "umi";
import { Checkbox } from "antd";
import styles from "./style.less";

const PermissionDetailTable = props => {
	const { dispatch, allRoles, allRoleSuccess, allRolesMutate } = props;

	const [data, setData] = useState([]);

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
						role_Id: role.id,
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
				key === "view" ||
				key === "create" ||
				key === "update" ||
				key === "delete" ||
				key === "all" ||
				key === "none"
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
				key === "view" ||
				key === "create" ||
				key === "update" ||
				key === "delete" ||
				key === "all" ||
				key === "none"
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
						<strong>T??n quy???n</strong>
					</th>
					<th>
						<strong>Xem</strong>
					</th>

					<th>
						<strong>Th??m</strong>
					</th>

					<th>
						<strong>S???a</strong>
					</th>

					<th>
						<strong>X??a</strong>
					</th>

					<th>
						<strong>T???t c???</strong>
					</th>

					<th>
						<strong>Kh??ng</strong>
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

export default connect(mapStateToProps)(PermissionDetailTable);
