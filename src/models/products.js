import { pool } from "@/config/postgres";

// CREATE TABLE IF NOT EXISTS products(product_id INT PRIMARY KEY,name varchar(30) NOT NULL,description varchar(200) NULL,imageurl varchar(300) NULL,price INT NOT NULL,user_id varchar(21) NOT NULL,FOREIGN KEY (user_id) REFERENCES user_data(user_id))

export async function getAllProducts() {
  const data = await pool.query("SELECT * from products");
  return data.rows;
}
