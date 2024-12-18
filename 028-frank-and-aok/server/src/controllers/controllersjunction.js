// Admin Panal Controllers
// Admin Login
const {
  registerAdmin, 
  adminLoginController,
  genrateOtpController,
  verifyOtpEmailUpdateController
} = require("./admin-panel/adminLoginController");

// Forget Password
const { 
  forgetPasswordGenrateOtpController, 
} = require("./admin-panel/ForgetPasswordController");

//Sizes Add
const {
  addSizesController,
  readSizeController,
  UpdateSizeStatusController,
  singleDeleteSizeController,
  activeSizesController,
} = require("./admin-panel/SizesController");

//Color Add
const {
  addColorController,
   readColorController,
   singleDeleteColorController,
   activeColorsController
  } = require("./admin-panel/ColorController");

//Parent-Category
const { 
  ParentCategoryController, 
  readParentCategoryController,  
  UpdateParentCategoryStatusController, 
  singleDeleteParentCategoryController,
  multiDeleteParentCategoryController,
  editReadParentCategoryController,
  editupdataParentCategoryController,
  activeParentCategories
} = require("./admin-panel/ParentCategoryController");

//Product-Category
const { 
  createProductCategoryController,
  readProductCategoryController,
  StatusUpdateProductCategoryController, 
  singleDeleteProductCategoryController,
  multiDeleteProductCategoryController,
  editReadProductCategoryController,
  editupdataProductCategoryController,
  productCategoriesByParentCategory,
  
} = require('./admin-panel/ProductCategoryController');

const { 
  createProductController 
} = require("./admin-panel/ProductController");

// Add Product
//Add Story
//Order List
//Slider


//Website Controllers

module.exports ={
  // Admin Login
    registerAdmin,
    adminLoginController,
    genrateOtpController,
    verifyOtpEmailUpdateController,

  //Forget Password
    forgetPasswordGenrateOtpController,

  //Sizes Category
    addSizesController,
    readSizeController,
    singleDeleteSizeController,
    UpdateSizeStatusController,
    activeSizesController,

  // Color Category
    addColorController,
    readColorController,
    singleDeleteColorController,
    activeColorsController,

  //Parent - Category
    ParentCategoryController,
    readParentCategoryController,
    UpdateParentCategoryStatusController,
    singleDeleteParentCategoryController,
    multiDeleteParentCategoryController,
    editReadParentCategoryController,
    editupdataParentCategoryController,
    activeParentCategories, 

  //Product - Category
    createProductCategoryController,
    readProductCategoryController,
    StatusUpdateProductCategoryController,
    singleDeleteProductCategoryController,
    editReadProductCategoryController,
    editupdataProductCategoryController,
    multiDeleteProductCategoryController,
    productCategoriesByParentCategory,

  // Add Product
  createProductController,

  //Add Story
  //Order List
  //Slider

  //Website Controllers
}