require("dotenv").config();

const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /^\S+@\S+\.\S+$/
    },

    age: {
        type: Number,
        required: true,
        min: 18,
        max: 65
    },

    department: {
        type: String,
        required: true,
        enum: ["IT", "HR", "Finance", "Sales", "Marketing"]
    },

    salary: {
        type: Number,
        required: true,
        min: 0
    }

});

const Employee = mongoose.model("Employee", employeeSchema);

async function main() {

    try {

        // Connect to MongoDB Atlas
        await mongoose.connect(
            process.env.EMPLOYEE_MONGODB_URI
        );

        console.log("MongoDB Atlas Connected Successfully!");

        await Employee.init();

        await Employee.deleteMany({});
        const employees = await Employee.insertMany([

            {
                name: "Aarav Sharma",
                email: "aarav@example.com",
                age: 25,
                department: "IT",
                salary: 60000
            },

            {
                name: "Diya Patel",
                email: "diya@example.com",
                age: 29,
                department: "HR",
                salary: 45000
            },

            {
                name: "Kabir Rao",
                email: "kabir@example.com",
                age: 32,
                department: "IT",
                salary: 80000
            },

            {
                name: "Meera Nair",
                email: "meera@example.com",
                age: 27,
                department: "Finance",
                salary: 55000
            },

            {
                name: "Ishaan Verma",
                email: "ishaan@example.com",
                age: 35,
                department: "Finance",
                salary: 70000
            }

        ]);

        console.log("\nInserted Five Employees Successfully!");

        const salaryLimit = 50000;

        const highSalaryEmployees = await Employee.find({

            salary: { $gt: salaryLimit }

        });

        console.log("\nEmployees Earning More Than 50000:");

        console.table(
            highSalaryEmployees.map(emp => ({
                name: emp.name,
                department: emp.department,
                salary: emp.salary
            }))
        );

        const page = 1;
        const limit = 2;

        const sortedEmployees = await Employee.find()

            .sort({ salary: -1 })

            .skip((page - 1) * limit)

            .limit(limit);

        console.log("\nTop 2 Highest Paid Employees:");

        console.table(
            sortedEmployees.map(emp => ({
                name: emp.name,
                salary: emp.salary
            }))
        );

        const result = await Employee.aggregate([

            {
                $group: {

                    _id: "$department",

                    averageSalary: {
                        $avg: "$salary"
                    },

                    employeeCount: {
                        $sum: 1
                    }

                }
            },

            {
                $sort: {
                    _id: 1
                }
            },

            {
                $project: {

                    _id: 0,

                    department: "$_id",

                    averageSalary: {
                        $round: ["$averageSalary", 2]
                    },

                    employeeCount: 1

                }
            }

        ]);

        console.log("\nDepartment-wise Average Salary:");

        console.table(result);

    }

    catch (error) {

        console.log("Error:", error.message);

    }

    finally {

        await mongoose.disconnect();

        console.log("\nMongoDB Connection Closed!");

    }

}

main();
