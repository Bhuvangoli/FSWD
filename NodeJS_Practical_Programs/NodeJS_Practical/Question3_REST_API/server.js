require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Product schema and validation
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [2, "Name must contain at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"]
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: ""
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0.01, "Price must be greater than zero"]
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Electronics", "Books", "Clothing", "Home", "Other"]
    },
    stock: {
      type: Number,
      min: [0, "Stock cannot be negative"],
      default: 0
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

// Async wrapper forwards rejected promises to centralized error middleware.
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Basic health route
app.get("/", (req, res) => {
  res.json({ message: "Product API is running" });
});

// GET /api/v1/products?minPrice=100&maxPrice=1000&sort=price&page=1&limit=5
app.get("/api/v1/products", asyncHandler(async (req, res) => {
  const {
    minPrice,
    maxPrice,
    sort = "createdAt",
    page = "1",
    limit = "10"
  } = req.query;

  const min = minPrice === undefined ? undefined : Number(minPrice);
  const max = maxPrice === undefined ? undefined : Number(maxPrice);
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  if ((min !== undefined && (!Number.isFinite(min) || min < 0)) ||
      (max !== undefined && (!Number.isFinite(max) || max < 0))) {
    return res.status(400).json({ message: "minPrice and maxPrice must be valid non-negative numbers" });
  }
  if (min !== undefined && max !== undefined && min > max) {
    return res.status(400).json({ message: "minPrice cannot be greater than maxPrice" });
  }
  if (!Number.isInteger(pageNumber) || pageNumber < 1 ||
      !Number.isInteger(limitNumber) || limitNumber < 1 || limitNumber > 100) {
    return res.status(400).json({ message: "page must be >= 1 and limit must be between 1 and 100" });
  }

  const allowedSortFields = ["name", "price", "createdAt"];
  if (!allowedSortFields.includes(sort)) {
    return res.status(400).json({ message: `sort must be one of: ${allowedSortFields.join(", ")}` });
  }

  const filter = {};
  if (min !== undefined || max !== undefined) {
    filter.price = {};
    if (min !== undefined) filter.price.$gte = min;
    if (max !== undefined) filter.price.$lte = max;
  }

  const [products, total] = await Promise.all([
    Product.find(filter)
      .sort({ [sort]: 1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber),
    Product.countDocuments(filter)
  ]);

  res.json({
    page: pageNumber,
    limit: limitNumber,
    total,
    totalPages: Math.ceil(total / limitNumber),
    products
  });
}));

// GET one product by MongoDB ID
app.get("/api/v1/products/:id", asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  res.json(product);
}));

// POST /api/v1/products
app.post("/api/v1/products", asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    message: "Product created successfully",
    product
  });
}));

// PUT: replace/update the supplied product fields with validation
app.put("/api/v1/products/:id", asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true, overwrite: false }
  );

  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product updated successfully", product });
}));

// DELETE a product
app.delete("/api/v1/products/:id", asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  res.json({ message: "Product deleted successfully", product });
}));

// Unknown route handler
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Centralized error-handling middleware (must be registered last)
app.use((err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: Object.values(err.errors).map(item => item.message)
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid value supplied" });
  }

  if (err.code === 11000) {
    return res.status(409).json({ message: "A record with this unique value already exists" });
  }

  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in the .env file");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Could not start server:", error.message);
    process.exit(1);
  }
}

startServer();
