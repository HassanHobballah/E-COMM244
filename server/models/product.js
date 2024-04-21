const db = require("../db/database");

class Product {
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM Products");
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query(
      "SELECT * FROM Products WHERE ProductID = ?",
      [id]
    );
    return rows[0];
  }

  static async create(data) {
    const { name, description, price, stockLevel, categoryID, imageURL } = data;
    const [result] = await db.query(
      "INSERT INTO Products (Name, Description, Price, StockLevel, CategoryID, ImageURL) VALUES (?, ?, ?, ?, ?, ?)",
      [name, description, price, stockLevel, categoryID, imageURL]
    );
    return { id: result.insertId };
  }

  static async update(id, data) {
    const { name, description, price, stockLevel, categoryID, imageURL } = data;
    await db.query(
      "UPDATE Products SET Name = ?, Description = ?, Price = ?, StockLevel = ?, CategoryID = ?, ImageURL = ? WHERE ProductID = ?",
      [name, description, price, stockLevel, categoryID, imageURL, id]
    );
  }

  static async delete(id) {
    await db.query("DELETE FROM Products WHERE ProductID = ?", [id]);
  }
}

module.exports = Product;
