USE [QLTV_V6]
GO
/****** Object:  Trigger [dbo].[borrowBookDetail_add]    Script Date: 05/30/2021 21:39:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER TRIGGER [dbo].[borrowBookDetail_add]
ON [dbo].[BorrowBookDetail]
FOR INSERT
AS
BEGIN
	DECLARE @book_id INT, @inventory INT, @quantity INT
	
	-- get book_id, quantity
	SELECT @book_id = book_id FROM inserted
	SELECT @quantity = quantity FROM inserted
	
	SELECT @inventory = inventory from Book where id = @book_id
	
	-- check inventory of book is enough
	IF @inventory >= @quantity 
	BEGIN
		-- update inventory of book
		UPDATE Book 
		SET inventory = inventory - @quantity 
		WHERE id = @book_id
	END
	ELSE
	BEGIN
		RAISERROR('THIS BOOK IS NOT ENOUGH INVENTORY', 16, 1) WITH NOWAIT;
	END	
END