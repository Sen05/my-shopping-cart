const express = require("express");
const mysql = require("mysql2"); // sửa đúng tên package
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// Kết nối MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sgallant01", // thay bằng mật khẩu MySQL của bạn
  database: "shopping_cart2",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

// API: lấy toàn bộ sản phẩm trong giỏ hàng
app.get("/api/cart", (req, res) => {
  db.query("SELECT * FROM cart_items", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// API: thêm sản phẩm
app.post("/api/cart", (req, res) => {
  const { name, price, quantity, image, description } = req.body;
  const query =
    "INSERT INTO cart_items (name, price, quantity, image, description) VALUES (?, ?, ?, ?, ?)";
  db.query(
    query,
    [name, price, quantity, image, description],
    (err, result) => {
      if (err) throw err;
      res.json({
        id: result.insertId,
        name,
        price,
        quantity,
        image,
        description,
      });
    }
  );
});

// API: xem thông tin chi tiết sản phẩm theo id
app.get("/api/product/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM cart_items WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
    res.json(results[0]);
  });
});

// API: cập nhật thông tin sản phẩm
app.put("/api/product/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, quantity, image, description } = req.body;
  const query =
    "UPDATE cart_items SET name=?, price=?, quantity=?, image=?, description=? WHERE id=?";
  db.query(
    query,
    [name, price, quantity, image, description, id],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Cập nhật sản phẩm thành công" });
    }
  );
});

// Trang chủ
app.get("/home", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Trang chủ</title>
        <style>
          body {
            text-align: center;
            font-family: Arial, sans-serif;
          }
          .tenor-gif-embed {
            max-width: 1100px;   /* giới hạn chiều rộng */
            margin: 20px auto;  /* căn giữa */
          }
        </style>
      </head>
      <body>
        <h1>Chào mừng đến với Cửa Hàng Cc</h1>
        <div class="tenor-gif-embed" 
             data-postid="23922350" 
             data-share-method="host" 
             data-aspect-ratio="1.77778" 
             data-width="100%">
        </div>
        <img src="/asset/Yasuo_36.jpg" alt="Banner cửa hàng" />
      </body>
    </html>
  `);
});

// Xoá sản phẩm theo id
app.delete("/api/cart/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM cart_items WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Xoá sản phẩm thành công" });
  });
});

// Cập nhật sản phẩm
app.put("/api/cart/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, quantity } = req.body;
  const query = `
UPDATE cart_items
SET name = ?, price = ?, quantity = ?
WHERE id = ?
`;
  db.query(query, [name, price, quantity, id], (err) => {
    if (err) throw err;
    res.json({
      id,
      name,
      price,
      quantity,
    });
  });
});

// Chạy server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
