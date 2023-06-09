import { pool } from "@/config/postgres";

// CREATE TABLE IF NOT EXISTS products(product_id INT PRIMARY KEY,name varchar(30) NOT NULL,description varchar(200) NULL,imageurl varchar(300) NULL,price INT NOT NULL,user_id varchar(21) NOT NULL,FOREIGN KEY (user_id) REFERENCES user_data(user_id))

export async function getAllProducts() {
  const data = await pool.query("SELECT * from products");
  return data.rows;
}

//add product
export async function addProduct(product) {
  const data = await pool.query(
    "INSERT INTO products(product_id,name,description,imageurl,price,user_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
    [
      product.product_id,
      product.name,
      product.description,
      product.imageurl,
      product.price,
      product.user_id,
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
