/* eslint-disable react-hooks/exhaustive-deps */
import { Select } from "antd";
import { useEffect } from "react";
import styles from "./style.less";
import { connect, setLocale } from "umi";
setLocale("vi-VN", false);

const { Option } = Select;

const SelectPermisionGroup = props => {
	const {
		permissionGroupList,
		style,
		onChange,
		value,
		dispatch,
		onSelect,
		placeholder = "Tất cả",
		removeFirstOption = true,
		mode = null,
		tagRender = null
	} = props;

	useEffect(() => {
		dispatch({
			type: "Common/getAllPermissionGroupListRequest"
		});
	}, []);

	return (
		<Select
			style={style}
			className={styles.fw}
			showSearch
			// allowClear
			value={value}
			onChange={onChange}
			onSelect={onSelect}
			placeholder={placeholder}
			mode={mode}
			tagRender={tagRender}
		>
			{permissionGroupList?.length > 0 &&
				permissionGroupList.map(
					(permissionGroup, index) =>
						(index === 0 && removeFirstOption) || (
							<Option
								value={JSON.stringify({
									id: permissionGroup.id,
									name: permissionGroup.groupRoleName
								})}
								key={permissionGroup.id}
							>
								{permissionGroup.groupRoleName}
							</Option>
						)
				)}
		</Select>
	);
};

const mapStateToProps = state => {
	return {
		permissionGroupList: state.Common.allPermissionGroups.items
	};
};

export default connect(mapStateToProps)(SelectPermisionGroup);
