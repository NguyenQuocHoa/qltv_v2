/* eslint-disable react-hooks/exhaustive-deps */
import { Select } from "antd";
import { useEffect } from "react";
import styles from "../style/selectStyle.less";
import { connect, setLocale } from "umi";
setLocale("vi-VN", false);

const { Option } = Select;

const SelectCategory = props => {
	const {
		bookCategoryList,
		style,
		onChange,
		value,
		dispatch,
		onSelect,
		placeholder = "Tất cả",
		mode = null,
		tagRender = null
	} = props;

	useEffect(() => {
		dispatch({
			type: "Common/getAllCategoryListRequest"
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
			{bookCategoryList.map((bookCategory, index) => (
				<Option value={bookCategory.id} key={bookCategory.id}>
					{bookCategory.tenNhanVien}
				</Option>
			))}
		</Select>
	);
};

const mapStateToProps = state => {
	return {
		bookCategoryList: state.Common.allCategorys
	};
};

export default connect(mapStateToProps)(SelectCategory);
