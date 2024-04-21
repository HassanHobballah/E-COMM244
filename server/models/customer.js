const db = require('../db/database');

class Customer {
    static async getAll() {
        try {
            const [rows] = await db.query("SELECT * FROM Customers");
            return rows;
        } catch (err) {
            throw err;
        }
    }

    static async getById(id) {
        try {
            const [rows] = await db.query("SELECT * FROM Customers WHERE CustomerID = ?", [id]);
            return rows[0];
        } catch (err) {
            throw err;
        }
    }

    static async create(data) {
        try {
            const { firstName, lastName, email, hashedPassword, phone, addressLine1, addressLine2, city, state, zipCode, country } = data;
            const [result] = await db.query("INSERT INTO Customers (FirstName, LastName, Email, HashedPassword, Phone, AddressLine1, AddressLine2, City, State, ZipCode, Country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [firstName, lastName, email, hashedPassword, phone, addressLine1, addressLine2, city, state, zipCode, country]);
            return { id: result.insertId };
        } catch (err) {
            throw err;
        }
    }

    static async update(id, data) {
        try {
            const { firstName, lastName, email, phone, addressLine1, addressLine2, city, state, zipCode, country } = data;
            await db.query("UPDATE Customers SET FirstName = ?, LastName = ?, Email = ?, Phone = ?, AddressLine1 = ?, AddressLine2 = ?, City = ?, State = ?, ZipCode = ?, Country = ? WHERE CustomerID = ?",
                [firstName, lastName, email, phone, addressLine1, addressLine2, city, state, zipCode, country, id]);
        } catch (err) {
            throw err;
        }
    }

    static async delete(id) {
        try {
            await db.query("DELETE FROM Customers WHERE CustomerID = ?", [id]);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Customer;
