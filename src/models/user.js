import { pool } from "@/config/postgres"

// CREATE TABLE IF NOT EXISTS user_data(user_id varchar(21) PRIMARY KEY,name varchar(20) NOT NULL,email varchar(30) UNIQUE NOT NULL,imageURL varchar(300) NULL,balance INT NULL,rating INT NULL)

export async function createUserSignUp({ id, name, email, image }) {
  await pool.query(`INSERT INTO user_data(user_id,name,email,imageurl) values(${id},'${name}','${email}','${image}')`)
}

export async function checkUserSignIn({ email }) {
  const data = await pool.query(`SELECT * FROM user_data WHERE email = '${email}' `)
  return data.rows
}

export async function updateUserBalance({ balance, user_id }) {
  await pool.query(`UPDATE user_data SET balance = ${balance} WHERE user_id = ${user_id} `)
}