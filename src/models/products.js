import { pool } from "@/config/postgres";
import { v4 as uuidv4 } from "uuid";

// with foreign key and varchar
// CREATE TABLE IF NOT EXISTS products(product_id char(36) PRIMARY KEY,name varchar(30) NOT NULL,description varchar(200) NOT NULL,quantity INT NOT NULL,rating DECIMAL(3,2) NULL,imageurl varchar(300) NOT NULL,price INT NOT NULL,soldby varchar(21) NOT NULL,FOREIGN KEY (soldby) REFERENCES user_data(user_id))

// transactions
// CREATE TABLE IF NOT EXISTS transaction(transaction_id char(36) PRIMARY KEY,product_id char(36) NOT NULL,amount_transferred INT NOT NULL,buyer varchar(21) NOT NULL,FOREIGN KEY (product_id) REFERENCES products(product_id),FOREIGN KEY (buyer) REFERENCES user_data(user_id))

//get all products not sold out
export async function getAllProducts() {
  const data = await pool.query("SELECT * FROM PRODUCTS WHERE quantity > 0");
  return data.rows;
}

//get products by name
export async function getProductsByName(name) {
  const data = await pool.query(
    "SELECT * from products WHERE LOWER(name) LIKE $1 AND quantity > 0",
    ["%" + name.toLowerCase() + "%"]
  );
  return data.rows;
}

//add product
export async function addProduct(product) {
  const data = await pool.query(
    "INSERT INTO products(product_id,name,description,quantity,imageurl,price,soldBy) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
    [
      product.product_id,
      product.name,
      product.description,
      product.quantity,
      product.imageurl,
      product.price,
      product.soldBy,
    ]
  );
  return data.rows[0];
}

//get product by id
export async function getProductById(id) {
  const data = await pool.query("SELECT * from products WHERE product_id=$1", [
    id,
  ]);
  return data.rows[0];
}

//get products by buyer
export async function getBoughtProducts(buyer) {
  const data = await pool.query(
    "SELECT products.* FROM products JOIN transaction ON products.product_id = transaction.product_id WHERE transaction.buyer=$1",
    [buyer]
  );
  return data.rows;
}

//get products by seller
export async function getProductsBySeller(seller) {
  const data = await pool.query("SELECT * from products WHERE soldBy=$1", [
    seller,
  ]);
  return data.rows;
}

//add new transaction
export async function addNewTransaction({ id, buyer, amount }) {
  const data = await pool.query("INSERT INTO transaction values($1,$2,$3,$4)", [
    uuidv4(),
    id,
    amount,
    buyer,
  ]);
  return data.rows[0];
}

//get transaction by buyer id and product id
export async function getTransactionByBuyerAndProduct(buyer, product) {
  const data = await pool.query(
    "SELECT * from transaction WHERE buyer=$1 AND product_id=$2",
    [buyer, product]
  );
  return data.rows[0];
}

// update product quantity
export async function updateProductQuantity({ quantity, product_id }) {
  const data = await pool.query(
    "UPDATE products SET quantity=$1 WHERE product_id=$2",
    [quantity, product_id]
  );
  return data.rows[0];
}

// update product rating
export async function updateProductRating({ rating, product_id }) {
  const data = await pool.query(
    "UPDATE products SET rating=$1 WHERE product_id=$2",
    [rating, product_id]
  );
  return data.rows[0];
}
