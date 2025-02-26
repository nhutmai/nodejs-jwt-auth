# Library

## Giới Thiệu
API này giúp quản lý người dùng, sản phẩm và chức năng mượn trả hàng hóa. xác thưc bằng JWT, với hai role là ADMIN và USER

## Cài Đặt
1. Đảm bảo bạn đã cài đặt [Node.js](https://nodejs.org/) trên máy.
2. Cài đặt các dependencies bằng lệnh:
   ```sh
   npm install
   ```
## Sinh key bằng thuật toán RSA
sinh private key và public key trong thư mục config
```sh
   npm run keys
```


## Cách Chạy Ứng Dụng
Chạy ứng dụng bằng lệnh sau:
```sh
npm start
```
## Seed data lên DB
Chạy ứng dụng bằng lệnh sau (tùy chỉnh trong package.js):
```sh
npm run seed
```

## API Endpoints
Ứng dụng cung cấp các API sau:

### 1. Quản lý Người Dùng
- **Lấy danh sách người dùng có phân trang**
  ```http
  GET /users?currentPage=<num>&&limits=<num>
  ```
  **Mô tả:**
  - `currentPage`: Trang hiện tại (mặc định `1`)
  - `limits`: Số sản phẩm trên mỗi trang (mặc định `5`)
  - 
- **Thêm người dùng mới**
  ```http
  POST /users
  ```
  **Dữ liệu gửi:**
  ```json
  {
    "name": "Tên Người Dùng",
    "email": "email@example.com"
  }
  ```

### 2. Quản lý Sản Phẩm
- **Lấy danh sách sản phẩm có phân trang và sắp xếp**
  ```http
  GET /products?page=1&totalPage=10&sortBy=title&order=asc
  ```
  **Mô tả:**
  - `currentPage`: Trang hiện tại (mặc định `1`)
  - `limits`: Số sản phẩm trên mỗi trang (mặc định `10`)
  - `sortBy`: Trường để sắp xếp (`title` hoặc `publishedYear`, mặc định `title`)
  - `order`: Thứ tự sắp xếp (`asc` hoặc `desc`, mặc định `asc`)

  **Phản hồi:**
  ```json
  {
    "currentPage": 1,
    "totalPages": 5,
    "totalProducts": 50,
    "products": [
      { "title": "Product A", "publishedYear": 2023 },
      { "title": "Product B", "publishedYear": 2022 }
    ]
  }
  ```
- **Thêm sản phẩm mới**
  ```http
  POST /products
  ```
  **Dữ liệu gửi:**
  ```json
  {
    "name": "Tên Sản Phẩm",
    "price": 1000
  }
  ```

### 3. Mượn Sản Phẩm
- **Mượn sản phẩm**
  ```http
  POST /borrow
  ```
  **Dữ liệu gửi:**
  ```json
  {
    "userId": 1,
    "productId": 10,
    "borrowDate": "2024-02-26"
  }
  ```

- **Thống kê theo top-borrower**
  ```http
  GET /borrow/top-borrower
  ```
- **Thống kê theo top-category**
  ```http
  GET /borrow/top-category
  ```

