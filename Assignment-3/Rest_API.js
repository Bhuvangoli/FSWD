require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());


const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        trim: true
    },

    description: {
        type: String,
        default: ""
    },

    price: {
        type: Number,
        required: true,
        min: 0.01
    },

    category: {
        type: String,
        required: true,
        enum: ["Electronics", "Books", "Clothing", "Home", "Other"]
    },

    stock: {
        type: Number,
        default: 0,
        min: 0
    }

}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

app.get("/", (req, res) => {

    res.json({
        message: "Product API is running successfully!"
    });

});

app.get("/api/v1/products", asyncHandler(async (req, res) => {

    const {
        minPrice,
        maxPrice,
        sort = "createdAt",
        order = "asc",
        page = 1,
        limit = 10
    } = req.query;

    const min = minPrice === undefined ? undefined : Number(minPrice);
    const max = maxPrice === undefined ? undefined : Number(maxPrice);

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if (
        (min !== undefined && (!Number.isFinite(min) || min < 0)) ||
        (max !== undefined && (!Number.isFinite(max) || max < 0))
    ) {

        return res.status(400).json({
            message: "Invalid price filter"
        });

    }

    if (min !== undefined && max !== undefined && min > max) {

        return res.status(400).json({
            message: "Minimum price cannot exceed maximum price"
        });

    }

    if (
        !Number.isInteger(pageNumber) ||
        pageNumber < 1 ||
        !Number.isInteger(limitNumber) ||
        limitNumber < 1 ||
        limitNumber > 100
    ) {

        return res.status(400).json({
            message: "Invalid page or limit"
        });

    }
    const allowedSortFields = ["name", "price", "createdAt"];

    if (!allowedSortFields.includes(sort)) {

        return res.status(400).json({
            message: "Invalid sorting field"
        });

    }

    if (!["asc", "desc"].includes(order)) {

        return res.status(400).json({
            message: "Order must be asc or desc"
        });

    }

    const filter = {};

    if (min !== undefined || max !== undefined) {

        filter.price = {};

        if (min !== undefined) {
            filter.price.$gte = min;
        }

        if (max !== undefined) {
            filter.price.$lte = max;
        }

    }

    const sortOrder = order === "asc" ? 1 : -1;
    const [products, total] = await Promise.all([

        Product.find(filter)

            .sort({ [sort]: sortOrder })

            .skip((pageNumber - 1) * limitNumber)

            .limit(limitNumber),

        Product.countDocuments(filter)

    ]);

    res.json({

        page: pageNumber,

        limit: limitNumber,

        total: total,

        totalPages: Math.ceil(total / limitNumber),

        products: products

    });

}));

app.get("/api/v1/products/:id", asyncHandler(async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {

        return res.status(400).json({
            message: "Invalid product ID"
        });

    }

    const product = await Product.findById(req.params.id);

    if (!product) {

        return res.status(404).json({
            message: "Product not found"
        });

    }

    res.json(product);

}));


app.post("/api/v1/products", asyncHandler(async (req, res) => {

    const product = await Product.create(req.body);

    res.status(201).json({

        message: "Product added successfully",

        product: product

    });

}));


app.put("/api/v1/products/:id", asyncHandler(async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {

        return res.status(400).json({
            message: "Invalid product ID"
        });

    }

    const product = await Product.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
            new: true,
            runValidators: true
        }

    );

    if (!product) {

        return res.status(404).json({
            message: "Product not found"
        });

    }

    res.json({

        message: "Product updated successfully",

        product: product

    });

}));


app.delete("/api/v1/products/:id", asyncHandler(async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {

        return res.status(400).json({
            message: "Invalid product ID"
        });

    }

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {

        return res.status(404).json({
            message: "Product not found"
        });

    }

    res.json({

        message: "Product deleted successfully",

        product: product

    });

}));



app.use((req, res) => {

    res.status(404).json({

        message: "Requested route not found"

    });

});


app.use((err, req, res, next) => {

    console.error(err);

    if (err.name === "ValidationError") {

        return res.status(400).json({

            message: "Validation failed",

            errors: Object.values(err.errors).map(
                error => error.message
            )

        });

    }

    if (err.name === "CastError") {

        return res.status(400).json({

            message: "Invalid value supplied"

        });

    }

    if (err.code === 11000) {

        return res.status(409).json({

            message: "Duplicate record"

        });

    }

    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {

        return res.status(400).json({

            message: "Invalid JSON request body"

        });

    }

    res.status(500).json({

        message: "Internal Server Error"

    });

});


const PORT = process.env.PORT || 3000;

async function startServer() {

    try {

        await mongoose.connect(
            process.env.PRODUCT_MONGODB_URI
        );

        console.log("MongoDB Atlas Connected Successfully!");

        app.listen(PORT, () => {

            console.log(
                `Server running at http://localhost:${PORT}`
            );

        });

    }

    catch (error) {

        console.log("Server Error:", error.message);

        process.exit(1);

    }

}

startServer();
