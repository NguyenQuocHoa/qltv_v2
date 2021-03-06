USE [QLTV_V6]
GO
/****** Object:  Table [dbo].[User]    Script Date: 09/05/2021 09:03:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING OFF
GO
CREATE TABLE [dbo].[User](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [nvarchar](50) NULL,
	[password] [varchar](255) NULL,
	[description] [nvarchar](255) NULL,
	[isactive] [bit] NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Student]    Script Date: 09/05/2021 09:03:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Student](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[studentcode] [varchar](10) NOT NULL,
	[studentname] [nvarchar](50) NULL,
	[class] [nvarchar](50) NULL,
	[dob] [date] NULL,
	[nativeland] [nvarchar](50) NULL,
	[course] [nvarchar](50) NULL,
	[faculty] [nvarchar](50) NULL,
	[description] [nvarchar](255) NULL,
	[password] [varchar](255) NOT NULL,
	[isactive] [bit] NULL,
 CONSTRAINT [PK_Student] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Post]    Script Date: 09/05/2021 09:03:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Post](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[codepost] [varchar](10) NULL,
	[message] [varchar](255) NULL,
	[description] [varchar](255) NULL,
	[isactive] [bit] NULL,
 CONSTRAINT [PK_Post] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[BookCategory]    Script Date: 09/05/2021 09:03:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[BookCategory](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[bookcategorycode] [varchar](10) NULL,
	[bookcategoryname] [nvarchar](50) NULL,
	[description] [nvarchar](255) NULL,
	[isactive] [bit] NULL,
 CONSTRAINT [PK_BookCategory] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Book]    Script Date: 09/05/2021 09:03:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Book](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[bookcode] [varchar](10) NULL,
	[bookname] [nvarchar](50) NULL,
	[inventory] [int] NULL,
	[author] [nvarchar](50) NULL,
	[maincontent] [nvarchar](255) NULL,
	[description] [nvarchar](255) NULL,
	[bookcategory_id] [int] NULL,
	[isactive] [bit] NULL,
 CONSTRAINT [PK_Book] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[BorrowBook]    Script Date: 09/05/2021 09:03:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[BorrowBook](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[borrowbookcode] [varchar](10) NULL,
	[borrowdate] [date] NULL,
	[numberofdayborrow] [int] NULL,
	[description] [nvarchar](255) NULL,
	[student_id] [int] NULL,
 CONSTRAINT [PK_BorrowBook] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[BorrowBookDetail]    Script Date: 09/05/2021 09:03:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[BorrowBookDetail](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[borrowbookdetailcode] [varchar](10) NULL,
	[quantity] [int] NULL,
	[description] [nvarchar](255) NULL,
	[borrowbook_id] [int] NULL,
	[book_id] [int] NULL,
 CONSTRAINT [PK_BorrowBookDetail] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ReturnBook]    Script Date: 09/05/2021 09:03:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[ReturnBook](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[returnbookcode] [varchar](10) NULL,
	[returndate] [date] NULL,
	[borrowbook_id] [int] NULL,
 CONSTRAINT [PK_ReturnBook] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ReturnBookDetail]    Script Date: 09/05/2021 09:03:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[ReturnBookDetail](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[returnbookdetailcode] [varchar](10) NULL,
	[quantity] [int] NULL,
	[description] [nvarchar](255) NULL,
	[book_id] [int] NULL,
	[returnbook_id] [int] NULL,
 CONSTRAINT [PK_ReturnBookDetail] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  ForeignKey [FK_Book_BookCategory]    Script Date: 09/05/2021 09:03:15 ******/
ALTER TABLE [dbo].[Book]  WITH CHECK ADD  CONSTRAINT [FK_Book_BookCategory] FOREIGN KEY([bookcategory_id])
REFERENCES [dbo].[BookCategory] ([id])
GO
ALTER TABLE [dbo].[Book] CHECK CONSTRAINT [FK_Book_BookCategory]
GO
/****** Object:  ForeignKey [FK_BorrowBook_Student]    Script Date: 09/05/2021 09:03:15 ******/
ALTER TABLE [dbo].[BorrowBook]  WITH CHECK ADD  CONSTRAINT [FK_BorrowBook_Student] FOREIGN KEY([student_id])
REFERENCES [dbo].[Student] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[BorrowBook] CHECK CONSTRAINT [FK_BorrowBook_Student]
GO
/****** Object:  ForeignKey [FK_BorrowBookDetail_Book]    Script Date: 09/05/2021 09:03:15 ******/
ALTER TABLE [dbo].[BorrowBookDetail]  WITH CHECK ADD  CONSTRAINT [FK_BorrowBookDetail_Book] FOREIGN KEY([book_id])
REFERENCES [dbo].[Book] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[BorrowBookDetail] CHECK CONSTRAINT [FK_BorrowBookDetail_Book]
GO
/****** Object:  ForeignKey [FK_BorrowBookDetail_BorrowBook]    Script Date: 09/05/2021 09:03:15 ******/
ALTER TABLE [dbo].[BorrowBookDetail]  WITH CHECK ADD  CONSTRAINT [FK_BorrowBookDetail_BorrowBook] FOREIGN KEY([borrowbook_id])
REFERENCES [dbo].[BorrowBook] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[BorrowBookDetail] CHECK CONSTRAINT [FK_BorrowBookDetail_BorrowBook]
GO
/****** Object:  ForeignKey [FK_ReturnBook_BorrowBook]    Script Date: 09/05/2021 09:03:15 ******/
ALTER TABLE [dbo].[ReturnBook]  WITH CHECK ADD  CONSTRAINT [FK_ReturnBook_BorrowBook] FOREIGN KEY([borrowbook_id])
REFERENCES [dbo].[BorrowBook] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[ReturnBook] CHECK CONSTRAINT [FK_ReturnBook_BorrowBook]
GO
/****** Object:  ForeignKey [FK_ReturnBookDetail_Book]    Script Date: 09/05/2021 09:03:15 ******/
ALTER TABLE [dbo].[ReturnBookDetail]  WITH CHECK ADD  CONSTRAINT [FK_ReturnBookDetail_Book] FOREIGN KEY([book_id])
REFERENCES [dbo].[Book] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[ReturnBookDetail] CHECK CONSTRAINT [FK_ReturnBookDetail_Book]
GO
/****** Object:  ForeignKey [FK_ReturnBookDetail_ReturnBook]    Script Date: 09/05/2021 09:03:15 ******/
ALTER TABLE [dbo].[ReturnBookDetail]  WITH CHECK ADD  CONSTRAINT [FK_ReturnBookDetail_ReturnBook] FOREIGN KEY([returnbook_id])
REFERENCES [dbo].[ReturnBook] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ReturnBookDetail] CHECK CONSTRAINT [FK_ReturnBookDetail_ReturnBook]
GO
