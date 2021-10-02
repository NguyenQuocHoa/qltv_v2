/* eslint-disable react-hooks/exhaustive-deps */
import { Select } from "antd";
import { useEffect, useState } from "react";
import styles from "../../style/selectStyle.less";
import { connect, setLocale } from "umi";
setLocale("vi-VN", false);

const { Option } = Select;

const SelectBook = props => {
	const {
		bookList,
		bookListIsSelect,
		success,
		style,
		onChange,
		value,
		dispatch,
		onSelect,
		placeholder = "Chọn sách",
		mode = null,
		tagRender = null,
		isCatched = false,
		disabled
	} = props;

	useEffect(() => {
		if (!isCatched) {
			dispatch({
				type: "bookAll/getAllBookEnoughInventoryRequest"
			});
		} else {
			setBooks(getBookNotSelect());
		}
	}, []);

	const [books, setBooks] = useState([]);

	const getBookNotSelect = () => {
		return bookList.filter(book => {
			return !bookListIsSelect.includes(book);
		});
	}

	useEffect(() => {
		if (success) 
			setBooks(bookList?.items ? bookList?.items : []);
	}, [success]);

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
			disabled={disabled}
		>
			{books.length > 0 &&
				books.map((book, index) => (
					<Option value={book.id} key={book.id}>
						{`${book.bookName} (${book.inventory})`}
					</Option>
				))}
		</Select>
	);
};

const mapStateToProps = state => {
	return {
		bookList: state.bookAll.payload,
		success: state.bookAll.success
	};
};

export default connect(mapStateToProps)(SelectBook);
