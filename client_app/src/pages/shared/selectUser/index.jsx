/* eslint-disable react-hooks/exhaustive-deps */
import { Select } from "antd";
import { useEffect } from "react";
import styles from "./style.less";
import { connect, setLocale } from "umi";
setLocale("vi-VN", false);

const { Option } = Select;

const SelectUser = props => {
	const {
		userList,
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

	const userId = localStorage.getItem("user_id");

	useEffect(() => {
		dispatch({
			type: "Common/getAllUserListRequest"
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
			{userList.map(
				(user, index) =>
					(index > 0 || (index === 0 && !removeFirstOption)) &&
					user.id != 1 &&
					user.id != userId && (
						<Option
							value={JSON.stringify({
								id: user.id,
								name: user.tenNhanVien
							})}
							key={user.id}
						>
							{user.tenNhanVien}
						</Option>
					)
			)}
		</Select>
	);
};

const mapStateToProps = state => {
	return {
		userList: state.Common.allUsers
	};
};

export default connect(mapStateToProps)(SelectUser);
