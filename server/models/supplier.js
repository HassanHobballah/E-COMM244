const db = require("../db/database");

class Supplier {
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM Suppliers");
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query(
      "SELECT * FROM Suppliers WHERE SupplierID = ?",
      [id]
    );
    return rows[0];
  }

  static async create(data) {
    const { companyName, contactName, contactEmail, contactPhone, address } =
      data;
    const [result] = await db.query(
      "INSERT INTO Suppliers (CompanyName, ContactName, ContactEmail, ContactPhone, Address) VALUES (?, ?, ?, ?, ?)",
      [companyName, contactName, contactEmail, contactPhone, address]
    );
    return { id: result.insertId };
  }

  static async update(id, data) {
    const { companyName, contactName, contactEmail, contactPhone, address } =
      data;
    await db.query(
      "UPDATE Suppliers SET CompanyName = ?, ContactName = ?, ContactEmail = ?, ContactPhone = ?, Address = ? WHERE SupplierID = ?",
      [companyName, contactName, contactEmail, contactPhone, address, id]
    );
  }

  static async delete(id) {
    await db.query("DELETE FROM Suppliers WHERE SupplierID = ?", [id]);
  }
}

module.exports = Supplier;
