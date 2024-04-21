const db = require("../db/database");

class Category {
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM Categories");
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query(
      "SELECT * FROM Categories WHERE CategoryID = ?",
      [id]
    );
    return rows[0];
  }

  static async create(data) {
    const { categoryName, description } = data;
    const [result] = await db.query(
      "INSERT INTO Categories (CategoryName, Description) VALUES (?, ?)",
      [categoryName, description]
    );
    return { id: result.insertId };
  }

  static async update(id, data) {
    const { categoryName, description } = data;
    await db.query(
      "UPDATE Categories SET CategoryName = ?, Description = ? WHERE CategoryID = ?",
      [categoryName, description, id]
    );
  }

  static async delete(id) {
    await db.query("DELETE FROM Categories WHERE CategoryID = ?", [id]);
  }
}

module.exports = Category;
