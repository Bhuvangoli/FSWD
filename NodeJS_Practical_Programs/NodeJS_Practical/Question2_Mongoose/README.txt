QUESTION 2 - MONGOOSE EMPLOYEE DATABASE

1. Start MongoDB locally, or use a MongoDB Atlas connection string.
2. Open this folder in a terminal.
3. Run: npm install
4. Check .env and set MONGODB_URI to your MongoDB connection string.
5. Run: npm start

The program:
- Defines an Employee schema with required, min, max, enum and unique validations.
- Inserts five employees (deletes old demo records first).
- Finds employees whose salary is greater than 50000.
- Sorts by salary and demonstrates pagination (skip/limit).
- Uses aggregate() with $group and $avg for department-wise average salary.

NOTE: This demo clears all documents in the employee collection each time it runs.
Use a dedicated demo database only.
