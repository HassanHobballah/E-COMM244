const db = require("../db/database");

class Order {
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM Orders");
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query("SELECT * FROM Orders WHERE OrderID = ?", [
      id,
    ]);
    return rows[0];
  }

  static async create(data) {
    const { customerID, status, total, trackingNumber } = data;
    const [result] = await db.query(
      "INSERT INTO Orders (CustomerID, Status, Total, TrackingNumber) VALUES (?, ?, ?, ?)",
      [customerID, status, total, trackingNumber]
    );
    return { id: result.insertId };
  }

  static async update(id, data) {
    const { status, total, trackingNumber } = data;
    await db.query(
      "UPDATE Orders SET Status = ?, Total = ?, TrackingNumber = ? WHERE OrderID = ?",
      [status, total, trackingNumber, id]
    );
  }

  static async delete(id) {
    await db.query("DELETE FROM Orders WHERE OrderID = ?", [id]);
  }
}

module.exports = Order;
