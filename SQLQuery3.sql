create table dbo.Employee (
QuickLookId varchar(10),
FirstName varchar(10),
LastName varchar(10),
PhoneNumber numeric(10),
Address varchar(50),
City varchar(10),
State varchar(10),
Country varchar(10),
ImageURL varchar(100),
EmployeeID int identity(1,1), CONSTRAINT pkEmployeeID PRIMARY KEY (EmployeeID)
)

insert into dbo.Employee values('vp185177', 'Vagdevi', 'Paladi', 9550678356, 'Street 5, Czech colony, Sanathnagar', 'Hyderabad', 'Telangana', 'India', 'img1.png');

exec sp_columns 'dbo.Employee'