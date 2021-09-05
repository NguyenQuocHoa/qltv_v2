USE [db_a79621_dblibrary]
GO
/****** Object:  Trigger [dbo].[add_new_user_permission]    Script Date: 09/05/2021 21:39:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER TRIGGER [dbo].[add_new_user_permission]
ON [dbo].[User]
FOR INSERT
AS
BEGIN
	DECLARE @user_id INT, @role_id INT
	
	-- get book_id, quantity
	SELECT @user_id = id FROM inserted
	
	-- 2 - Declare Cursor
	DECLARE role_cursor CURSOR FOR 
	SELECT id 
	FROM Role 
	
	-- Open the Cursor
	OPEN role_cursor
		
	-- 3 - Fetch the next record from the cursor
	FETCH NEXT FROM role_cursor INTO @role_id 
	
	-- Set the status for the curso
	WHILE @@FETCH_STATUS = 0
	
	BEGIN
		INSERT INTO Permission(user_id, role_id, "view", "create", "update", "delete") 
		VALUES (@user_id, @role_id, 0, 0, 0, 0)
		
		FETCH NEXT FROM role_cursor INTO @role_id 
	END
	
	-- 6 - Close the cursor
	CLOSE role_cursor 
	
	-- 7 - Deallocate the cursor
	DEALLOCATE role_cursor 
END



