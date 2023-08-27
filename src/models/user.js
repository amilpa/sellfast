import { pool } from "@/config/postgres";

// with varchar pk
// CREATE TABLE IF NOT EXISTS user_data(user_id char(21) PRIMARY KEY,name varchar(20) NOT NULL,email varchar(30) UNIQUE NOT NULL,imageURL varchar(300) NULL,balance INT DEFAULT 0,rating DECIMAL(3,2) NULL)

export async function createUserSignUp({ id, name, email, image }) {
  const data = await pool.query(
    "INSERT INTO user_data(user_id,name,email,imageURL,balance,rating) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
    [id, name, email, image, 0, 0]
  );
  return data.rows[0];
}

export async function getUser({ id }) {
  const data = await pool.query(
    `SELECT * from user_data WHERE user_id='${id}'`
  );
  return data.rows[0];
}

export async function checkUserRegister({ email }) {
  const data = await pool.query(
    `SELECT * FROM user_data WHERE email = '${email}' `
  );
  if (data.rows.length === 0) {
    return false;
  } else {
    return true;
  }
}

export async function updateUserBalance({ balance, user_id }) {
  await pool.query(
    `UPDATE user_data SET balance = ${balance} WHERE user_id = '${user_id}'`
  );
}

export async function updateUserRating({ rating, user_id }) {
  await pool.query(
    `UPDATE user_data SET rating = ${rating} WHERE user_id = '${user_id}'`
  );
}
