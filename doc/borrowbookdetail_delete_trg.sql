USE [QLTV_V6]
GO
/****** Object:  Trigger [dbo].[borrowBookDetail_delete]    Script Date: 05/30/2021 21:39:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER TRIGGER [dbo].[borrowBookDetail_delete]
ON [dbo].[BorrowBookDetail]
FOR DELETE
AS
BEGIN
	-- update inventory of book after delete borrow book detail
	UPDATE Book 
	SET inventory = inventory + (SELECT quantity FROM deleted where deleted.book_id = Book.id)
	WHERE id = (select book_id FROM deleted)
END