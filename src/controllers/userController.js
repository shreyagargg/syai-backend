import { pool } from "../config/db.js";

const CreateUser = async (req, res) => {
const existingUser = await pool.query(
    'SELECT * FROM users WHERE email = $1 OR firebase_uid = $2',
    [email, firebase_uid]
);

if (existingUser.rowCount > 0) {
    const user = existingUser.rows[0];

    if (user.is_deleted) {
        // 🔥 restore user
        await pool.query(
            `UPDATE users 
             SET is_deleted = FALSE, deleted_at = NULL, updated_at = CURRENT_TIMESTAMP 
             WHERE firebase_uid = $1`,
            [firebase_uid]
        );

        return res.status(200).json({ message: "User restored successfully" });
    }

    return res.status(400).json({ message: "User already exists" });
}
}

const UpdateUser = async (req, res) => {
    const { email } = req.body;
    const firebase_uid = req.user.uid;
    try {
        const result = await pool.query(
          'SELECT * FROM users WHERE firebase_uid = $1 AND is_deleted = FALSE',
            [firebase_uid]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "User not found" })
        }

        await pool.query(
            'UPDATE users SET email = $1, updated_at = CURRENT_TIMESTAMP WHERE firebase_uid = $2',
            [email, firebase_uid]
        );

        res.status(200).json({ message: "User updated successfully" })

    }
    catch (err) {
        res.status(500).json({ message: `${err.message}` })
    }

}

const DeleteUser = async (req, res) => {
    const firebase_uid = req.user.uid;

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE firebase_uid = $1 AND is_deleted = FALSE',
            [firebase_uid]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        await pool.query(
            `UPDATE users 
             SET is_deleted = TRUE, deleted_at = CURRENT_TIMESTAMP 
             WHERE firebase_uid = $1`,
            [firebase_uid]
        );

        res.status(200).json({ message: "User deleted successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const GetUser = async (req, res) => {
    const firebase_uid = req.user.uid;
    try {
        const records = await pool.query(
            `SELECT * FROM users 
     WHERE firebase_uid = $1 AND is_deleted = FALSE`,
            [firebase_uid]
        );

        if (records.rowCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(records.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: `${err.message}` })
    }
}

// const User = (req, res) => {
// }
export { CreateUser, UpdateUser, DeleteUser, GetUser };