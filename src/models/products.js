import { pool } from "@/config/postgres";

// with foreign key and varchar
// CREATE TABLE IF NOT EXISTS products(product_id INT PRIMARY KEY,name varchar(30) NOT NULL,description varchar(200) NULL,imageurl varchar(300) NULL,price INT NOT NULL,soldBy varchar(21) NOT NULL,boughtBy varchar(21) NULL,FOREIGN KEY (soldBy) REFERENCES user_data(user_id),FOREIGN KEY (boughtBy) REFERENCES user_data(user_id))

// with foreign key and INT
// CREATE TABLE IF NOT EXISTS products(product_id INT PRIMARY KEY,name varchar(30) NOT NULL,description varchar(200) NULL,imageurl varchar(300) NULL,price INT NOT NULL,soldBy INT NOT NULL,boughtBy INT NULL,FOREIGN KEY (soldBy) REFERENCES user_data(user_id),FOREIGN KEY (boughtBy) REFERENCES user_data(user_id))

// without foreign key and INT
// CREATE TABLE IF NOT EXISTS products(product_id INT PRIMARY KEY,name varchar(30) NOT NULL,description varchar(200) NULL,imageurl varchar(300) NULL,price INT NOT NULL,soldBy INT NOT NULL, boughtBy INT NULL,KEY soldBy_idx (soldBy),KEY boughtBy_idx (boughtBy))

//get all products not bought
export async function getAllProducts() {
  const data = await pool.query("SELECT * from products WHERE boughtBy IS NULL");
  return data.rows;
}

//get products by name 
export async function getProductsByName(name) {
  const data = await pool.query(
    "SELECT * from products WHERE LOWER(name) LIKE $1 AND boughtBy IS NULL",
    ["%" + name.toLowerCase() + "%"]
  );
  return data.rows;
}

//add product
export async function addProduct(product) {
  const data = await pool.query(
    "INSERT INTO products(product_id,name,description,imageurl,price,soldBy) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
    [
      product.product_id,
      product.name,
      product.description,
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
export async function getProductsByBuyer(buyer) {
  const data = await pool.query(
    "SELECT * from products WHERE boughtBy=$1",
    [buyer]
  );
  return data.rows[0];
}

//update product boughtBy field
export async function updateProductBoughtBy({ id, boughtBy }) {
  const data = await pool.query(
    "UPDATE products SET boughtBy=$1 WHERE product_id=$2 RETURNING *",
    [boughtBy, id]
  );
  return data.rows[0];
}
