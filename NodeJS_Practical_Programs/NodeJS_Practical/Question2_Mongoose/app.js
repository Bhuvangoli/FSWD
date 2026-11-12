require("dotenv").config();
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Employee name is required"],
      trim: true,
      minlength: [2, "Name must contain at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Enter a valid email address"]
    },
    age: {
      type: Number,
      required: true,
      min: [18, "Employee must be at least 18"],
      max: [65, "Age cannot exceed 65"]
    },
    department: {
      type: String,
      required: true,
      enum: ["IT", "HR", "Finance", "Sales", "Marketing"]
    },
    salary: {
      type: Number,
      required: true,
      min: [0, "Salary cannot be negative"]
    }
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

async function main() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in the .env file");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");

    // Ensure the unique email index is created before inserting.
    await Employee.init();

    // Clear previous demo records so this program can be run repeatedly.
    await Employee.deleteMany({});

    // Insert at least five employees.
    const employees = await Employee.insertMany([
      { name: "Aarav Sharma", email: "aarav@example.com", age: 25, department: "IT", salary: 60000 },
      { name: "Diya Patel", email: "diya@example.com", age: 29, department: "HR", salary: 45000 },
      { name: "Kabir Rao", email: "kabir@example.com", age: 32, department: "IT", salary: 80000 },
      { name: "Meera Nair", email: "meera@example.com", age: 27, department: "Finance", salary: 55000 },
      { name: "Ishaan Verma", email: "ishaan@example.com", age: 35, department: "Finance", salary: 70000 }
    ]);

    console.log(`\nInserted ${employees.length} employees.`);

    // Find employees whose salary is greater than the given value.
    const salaryLimit = 50000;
    const highEarners = await Employee.find({ salary: { $gt: salaryLimit } })
      .sort({ salary: -1 });

    console.log(`\nEmployees earning more than ${salaryLimit}:`);
    console.table(highEarners.map(e => ({
      name: e.name,
      department: e.department,
      salary: e.salary
    })));

    // Sorting and pagination: page 1, two employees per page, highest salary first.
    const page = 1;
    const limit = 2;
    const sortedPage = await Employee.find()
      .sort({ salary: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    console.log(`\nPage ${page} (limit ${limit}), sorted by salary descending:`);
    console.table(sortedPage.map(e => ({
      name: e.name,
      department: e.department,
      salary: e.salary
    })));

    // Aggregation: calculate average salary department-wise.
    const departmentAverages = await Employee.aggregate([
      {
        $group: {
          _id: "$department",
          averageSalary: { $avg: "$salary" },
          employeeCount: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          _id: 0,
          department: "$_id",
          averageSalary: { $round: ["$averageSalary", 2] },
          employeeCount: 1
        }
      }
    ]);

    console.log("\nDepartment-wise average salary:");
    console.table(departmentAverages);
  } catch (error) {
    console.error("\nError:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("\nMongoDB connection closed.");
  }
}

main();
