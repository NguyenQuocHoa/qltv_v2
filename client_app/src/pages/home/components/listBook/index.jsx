import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { connect } from "umi";
import CardBook from "../../../shared/cardBook";

const ListBook = props => {
	const { bookPayload, success, params, dispatch } = props;
	const dataBook = bookPayload?.items ? bookPayload.items : [];
    const [bookRender, setBookRender] = useState([]);

    const handleUpdate = () => {
        const cart = localStorage.getItem("cart");
		let bookArr = [];
		if (cart) {
			localStorage.removeItem("cart");
			bookArr = JSON.parse(cart);
		}
        localStorage.setItem("cart", JSON.stringify(bookArr));
        setBookRender(dataBook.map(book => {
            const arr = bookArr.filter(b => book.id === b);
            if (arr.length > 0) {
                return {
                    ...book,
                    disabled: true
                };
            }
            return {
                ...book,
                disabled: false
            };
        }));
    };

    useEffect(() => {
		dispatch({
			type: "bookList/getAllBookActivePagingRequest",
			payload: { params }
		});
    }, []);

	useEffect(() => {
		if (success) {
			handleUpdate();
		}
    }, [success]);

    const reRender = () => {
        handleUpdate();
    };
    
	return (
		<Row gutter={16}>
			{bookRender.map(book => (
				<Col xxl={6} xl={8} key={book.id}>
					<CardBook book={book} reRender={reRender} />
				</Col>
			))}
		</Row>
	);
};

const mapStateToProps = state => {
	return {
		bookPayload: state.bookList.payload,
		success: state.bookList.allBookSuccess
	};
};

export default connect(mapStateToProps)(ListBook);

// export default connect(({ bookList }) => ({
// 	bookPayload: bookList.payload
// })(ListBook));


