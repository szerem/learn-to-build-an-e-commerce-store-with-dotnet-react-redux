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

npm install @reduxjs/toolkit

89. Using redux dev tools
90. Creating a basket slice
91. Refactoring the app to use the redux store
npm config set progress false --global
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

102. Section 8 Introduction
103. Adding sorting to the API
104. Adding search functionality to the API
105. Adding filters to the API
106. Adding a pagination helper classes
107. Creating a class that extends our List into a PagedList
108. Testing our pagination in swagger
109. Getting the unique brands and filters as lists from the API
110. Getting the filter lists from the API and storing in Redux state
111. Catalog page design
112. Adding the product params to redux state
113. Setting up the axios get request to use our params
114. Adding the search functionality to the client
115. Adding sort to the client
116. Adding filtering to the client
117. Setting up pagination on the client
118. Adding a pagination component
119. Challenge solution
120. Cleaning up the loading indicators in the catalog
121. Section 8 Summary

122. Section 9 Introduction
123. Setting up identity
124. Adding the entity configuration and migration
dotnet tool install --global dotnet-ef --version 5
dotnet ef migrations add IdentityAdded

125. Adding an account controller
126. Testing the login and register methods
127. JWT Tokens
128. Creating a token service
129. Using the token service
130. Validating the token on the server
131. Configuring swagger to send the auth token
132. Creating Login and Register components
133. Create a login form
134. Using controlled component
135. Adding React hook form
136. Using React hook form validators
137. Adding an account slice
138. Creating a dropdown menu
139. Persisting the login
140. Cleaning up the app init code
141. Adding a register form
142. Adding the registration validators
143. Transfer the basket to logged in user
144. Client side testing and code for basket transfer
145. Challenge solution
146. Adding a private route component
147. Section 9 Summary

148. Section 10 Introduction
149. Creating the order entities
150. Refactoring identity to use an int
151. Creating an orders controller
152. Adding the create order method
153. Testing the order creation
154. Shaping the order data
155. Creating the checkout component
156. Adding a custom text input
157. Using react hook form context
158. Creating a reusable check box
159. Adding a validation library
160. Updating the review component
161. Updating the payment form
162. Submitting the order
163. Fetching a saved address for the form
164. Creating the orders page
165. Challenge - Order detail
166. Challenge - Solution
167. Section 10 Summary

168. Section 11 Introduction
169. Setting up stripe
170. Creating a payment service
171. Creating a payments controller
172. Testing the payment intents using swagger
173. Adding stripe to the client
174. Using stripe payment inputs
175. Validating the stripe inputs part 1
176. Validating the stripe inputs part 2
177. Adding the payment intent function
178. Adding the submit payment function
179. Testing card payments
180. Adding a webhook
181. User secrets
182. Section 11 Summary

183. Section 12 Introduction
184. Home page design
185. Creating a react production build
186. Serving the client app from the API
187. Switching to a production DB Server
188. Setting up heroku
189. Deploying to Heroku
190. Heroku troubleshooting
191. Section 12 Summary

192. Section 13 Introduction
193. Connecting Github to Heroku
194. Adding a create product endpoint
195. Adding automapper
196. Editing a product
197. Adding a delete endpoint
198. Adding an image service
199. Using the image service
200. Updating and deleting images
201. Adding an inventory page
202. Adding a product form
203. Creating a reusable select list
204. Reusable textarea and number inputs
205. Adding a drop zone
206. Styling the drop zone
207. Validating the product form
208. Submitting the form data
209. Deleting a product from the list
210. Extracting the roles from the token
211. Using roles in the client app
212. Publishing changes to Heroku
213. End of course summary

214. Update the project from .Net 5 to .Net 6
215. .Net 6 new project features