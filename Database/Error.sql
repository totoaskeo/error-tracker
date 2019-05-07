CREATE TABLE [dbo].[Error]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [DateCreated] DATETIME NOT NULL, 
    [ShortDesc] NVARCHAR(255) NOT NULL, 
    [Description] NVARCHAR(255) NOT NULL, 
    [UserId] INT NOT NULL, 
    [StatusId] INT NOT NULL, 
    [PriorityId] INT NOT NULL, 
    [ImpactId] INT NOT NULL, 
)
