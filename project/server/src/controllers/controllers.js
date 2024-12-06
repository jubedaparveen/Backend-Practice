// **admin panel controllers**

// parent category

const {
    createParentCategory,
    readParentCategories,
    updateParentCategoryStatus,
    deleteParentCategory,
    deleteParentCategories,
    readParentCategory,
    updateParentCatergory,
    activeParentCategories
} = require("./admin-panel/parentCategoryControllers");

//product category
const {
    createProductCategory,
    readProductCategories,
    productCategoriesByParentCategory
} = require("./admin-panel/productCategoryControllers");

//admin
const {
    registerAdmin,
    adminLogin,
    genrateOtp,
    verifyOtp
} = require("./admin-panel/adminControllers");


const { createColor, activeColors } = require("./admin-panel/colorControllers");
const { createSize, activeSizes } = require("./admin-panel/sizeControllers");
const { createProduct } = require("./admin-panel/productControllers");


// **website controllers**

//user
const { genrateOtpWeb, registerUser, verifyJwt } = require("./website/userControllers");

module.exports = {
    createParentCategory,
    readParentCategories,
    updateParentCategoryStatus,
    deleteParentCategory,
    deleteParentCategories,
    readParentCategory,
    updateParentCatergory,
    activeParentCategories,
    createProductCategory,
    readProductCategories,
    registerAdmin,
    adminLogin,
    genrateOtp,
    verifyOtp,
    createColor,
    activeColors,
    createSize,
    activeSizes,
    productCategoriesByParentCategory,
    createProduct,
    genrateOtpWeb,
    registerUser,
    verifyJwt
}