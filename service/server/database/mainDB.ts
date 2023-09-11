import sqlite3 from "sqlite3";

// Connect to the SQLite database when this module is imported
export const db = new sqlite3.Database('./service/database/database.db', (err: Error | null) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

/**
 * Run a query against the database asynchronously.
 * @param query - The SQL query to execute.
 * @param params - Optional parameters to bind to the query.
 * @returns A Promise that resolves to the result of the query.
 */
export const runQuery = async <T>(query: string, params: any[] = []): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
        // Execute the query using the database connection
        db.run(query, params, function (this: sqlite3.RunResult, err) {
            if (err) {
                // If an error occurs during query execution, reject the Promise with the error
                reject(err);
            } else {
                // If the query runs successfully, resolve the Promise with the last inserted ID
                resolve(this.lastID as unknown as T);
            }
        });
    });
};

/**
 * Executes a SQLite query to retrieve a single row.
 *
 * @param query - The SQL query to execute.
 * @param params - An array of parameters to bind to the query.
 * @returns A Promise that resolves to the retrieved row or null if no row is found.
 */
export const getQuery = async <T>(query: string, params: any[] = []): Promise<T | null> => {
    return new Promise<T | null>((resolve, reject) => {
        // Execute the query using the database connection
        db.get(query, params, function (err: Error | null, row: T) {
            if (err) {
                // If an error occurs during query execution, reject the Promise with the error
                reject(err);
            } else {
                // If the query runs successfully and a row is retrieved, resolve the Promise with the retrieved row
                // If no row is found, resolve with null
                resolve(row ? (row as unknown as T) : null);
            }
        });
    });
};

/**
 * Executes a SQL query to retrieve multiple rows of data from the database.
 * @param query - The SQL query to execute.
 * @param params - Optional array of parameters to be substituted into the query.
 * @returns A Promise that resolves to an array of retrieved rows of type T.
 */
export const getAllQuery = async <T>(query: string, params: any[] = []): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
        // Execute the query using the database connection
        db.all(query, params, function (this: sqlite3.Database, err, rows) {
            if (err) {
                // If an error occurs during query execution, reject the Promise with the error
                reject(err);
            } else {
                // If the query runs successfully, resolve the Promise with the retrieved rows
                resolve(rows as unknown as T);
            }
        });
    });
};
