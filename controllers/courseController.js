const Course = require("../models/Course");

// Create Course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, instructor, price, category } = req.body;

    if (
      !title ||
      !description ||
      !instructor ||
      price === undefined ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All course fields are required",
      });
    }

    const course = await Course.create({
      title: title,
      description: description,
      instructor: instructor,
      price: price,
      category: category,
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    console.error("Create Course Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

// Get All Courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("category");

    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    console.error("Get Courses Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
};

// Get Single Course
exports.getCourseById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(404).json({
        success: false,
        message: "Invalid course ID",
      });
    }

    const course = await Course.findById(id).populate("category");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error("Get Course Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch course",
    });
  }
};

// Update Course
exports.updateCourse = async (req, res) => {
  try {
    const { title, description, instructor, price, category } = req.body;
    const id = req.params.id;

    if (
      !title ||
      !description ||
      !instructor ||
      price === undefined ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All course fields are required",
      });
    }

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(404).json({
        success: false,
        message: "Invalid course ID",
      });
    }

    const course = await Course.findByIdAndUpdate(
      id,
      { title, description, instructor, price, category },
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    console.error("Update Course Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to update course",
    });
  }
};

// Delete Course
exports.deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(404).json({
        success: false,
        message: "Invalid course ID",
      });
    }

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Delete Course Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to delete course",
    });
  }
};