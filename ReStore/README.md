# learn-to-build-an-e-commerce-store-with-dotnet-react-redux
https://github.com/TryCatchLearn/Restore

## vscode extensions 
* C#
* C# Extensions
* Code Spell Checker
* Material Icon Theme
* NuGet Gallery
* Bracket Pair Colorizer 2
* Auto Rename Tag
* SQLite
---------------
* Prettier - Code formatter


## Microsoft.EntityFrameworkCore

dotnet ef migrations add CreateProduct --project .\API\ -o .\API\Data\Migrations


STOP dotnet watch run !!!!!
cd API
dotnet ef migrations add CreateProduct -o Data/Migrations
dotnet ef database update 


dotnet ef migrations add CreateProduct --project .\API\ -o Data\Migrations
dotnet ef database update --project .\API\

## React 
* Material UI 5
* Axios
* Redux
* Forms (React-hook-form)
* React-Router

npx create-react-app client --template typescript --use-npm 

npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material


React & Redux & Axios
npm install react-router-dom@5.3.0 @types/react-router-dom@5.3.2 
rm .\node_modules\
rm package-lock.json 
npm install

npm install axios


# Middleware error handler 
200 ok 
300 redirection
400 client error 
    -- toast notifications
    -- console errors 
    -- error pages
    -- validation errors 
500 server error 

npm i react-toastify


# Using React in Visual Studio Code
https://code.visualstudio.com/docs/nodejs/reactjs-tutorial

dotnet ef migrations add CreateBasket --project .\API\ -o .\Data\Migrations




npm install @mui/lab


Section 6: Adding the shopping cart feature
62. Creating the basket entity
63. EF Relationships
64. Create a basket controller
65. Add basket item endpoint logic
66. Using the debugger to check the add item logic
67. Shaping the data to return
68. Removing an item from the basket
69. Using CreatedAtRoute
70. Adding the axios methods for the basket
71. Creating a basket component
72. Styling the basket page with a table
73. Using React context to centralise state
74. App initialisation - fetching the basket on app start
75. Updating the header with the basket item count
76. Adding the remove item functionality
77. Adding specific loading indicators for the buttons
78. Challenge - Basket Summary
79. Challenge - Solution
80. Updating the product detail component to add items to cart part 1
81. Updating the product detail component to add items to cart part 2
82. Adding a checkout page
83. Section 6 Summary


84. Section 7 Introduction
85. Installing and using Redux
    npm install redux react-redux

86. Redux actions
87. Action Creators
88. Using Redux Toolkit
89. Using redux dev tools
90. Creating a basket slice
91. Refactoring the app to use the redux store
92. Using async functions in redux part 1
93. Using async functions in redux part 2
94. Using async functions in redux part 3
95. Challenge - Solution
96. Using Entity Adapters
97. Using entity adapter selectors
98. Fetching a single product
99. Error handling in the reducers
100. Error handling in the basket slice
101. Section 7 summary
