//-------------------------- Admin Panal Controllers-------------------
//==========================Imports==========================
//----------------- Admin Login
  const {
    registerAdmin, 
    adminLoginController,
    genrateOtpController,
    verifyOtpEmailUpdateController,
  } = require("./admin-panel/adminLoginController");
//------------------ Forget Password
  const { 
    forgetPasswordGenrateOtpController, 
    verifyOtpController, 
    PasswordUpdateController,
  } = require("./admin-panel/ForgetPasswordController");
//--------------------Sizes Add
  const {
    addSizesController,
    readSizeController,
    UpdateSizeStatusController,
    singleDeleteSizeController,
    activeSizesController,
    readEditSizeController,
    editUpdateSizeController,
    multiDeleteController,
  } = require("./admin-panel/SizesController");
//-------------------Color Add
  const {
    addColorController,
    readColorController,
    updateColorStatusController,
    singleDeleteColorController,
    activeColorsController,
    readEditColorController,
    multiDeleteColorController,
    updateEditColorController,
    } = require("./admin-panel/ColorController");
//--------------Parent-Category
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
//-------------------Product-Category
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
// ----------------Add Product
  const { 
    createProductController, 
    readProductController,
    updateStatusProductController,
    singleDeleteProductController,
    editReadProductController
  } = require("./admin-panel/ProductController");
//------------------Add Story
  const { 
    createStoryController, 
    readStoryController 
  } = require("./admin-panel/storyController");
//---------------------Order List
  const { 
    readOrderController 
  } = require("./admin-panel/OrderController");

//-------------------------Slider


//-----------------------------Website Controllers---------------------------------
  //-------------------UserRegistered 
  const { 
    userLoginController,
    genrateOtpWebsiteController, 
    registerUserController,
    verifyJwtController,
  } = require("./website-controllers/userRegisteredController");
  //-------------------activeParentCategoriesWebController
  const { 
    activeParentCategoriesWebController 
  } = require("./website-controllers/activeParentCategoeryComtroller");

  const { 
    activeProductCategoryWebController 
  } = require("./website-controllers/activeProductCategoryController");

  const { 
    activeProductsByParentCategory 
  } = require("./website-controllers/activeProductController");

  const { 
    createCartController, 
    readCartController, 
    deleteCartController, 
    updateCartQuantityController 
  } = require("./website-controllers/cartControllers");

  const { 
    createCheckoutController, 
    setPaymentStatusController 
  } = require("./website-controllers/PaymentController");




module.exports ={
  //--------------------------Admin Panel ------------------------
  //==========================Exports==========================
  //---------------- Admin Login
    registerAdmin,
    adminLoginController,
    genrateOtpController,
    verifyOtpEmailUpdateController,
  //-------------------Forget Password
    forgetPasswordGenrateOtpController,
    verifyOtpController,
    PasswordUpdateController,
  //--------------------Sizes Category
    addSizesController,
    readSizeController,
    singleDeleteSizeController,
    UpdateSizeStatusController,
    activeSizesController,
    readEditSizeController,
    editUpdateSizeController,
    multiDeleteController,
  //---------------------- Color Category
    addColorController,
    readColorController,
    updateColorStatusController,
    readEditColorController,
    singleDeleteColorController,
    activeColorsController,
    multiDeleteColorController,
    updateEditColorController,
  //--------------------Parent - Category
    ParentCategoryController,
    readParentCategoryController,
    UpdateParentCategoryStatusController,
    singleDeleteParentCategoryController,
    multiDeleteParentCategoryController,
    editReadParentCategoryController,
    editupdataParentCategoryController,
    activeParentCategories, 
  //---------------------------Product - Category
    createProductCategoryController,
    readProductCategoryController,
    StatusUpdateProductCategoryController,
    singleDeleteProductCategoryController,
    editReadProductCategoryController,
    editupdataProductCategoryController,
    multiDeleteProductCategoryController,
    productCategoriesByParentCategory,
  //--------------------------- Add Product
    createProductController,
    readProductController,
    updateStatusProductController,
    singleDeleteProductController,
    editReadProductController,
  //---------------------------Add Story
    createStoryController,
    readStoryController,
  //------------------------------Order List
    readOrderController,
  //----------------------Slider


  //----------------------------------Website Controllers----------------------------
  //==========================Exports==========================
    //-------------------UserRegistered 
    userLoginController,
    genrateOtpWebsiteController,
    registerUserController,
    verifyJwtController,
    //----------------activeParentCategoriesWebController
    activeParentCategoriesWebController,
    activeProductCategoryWebController,
    //----------------activeProductsByParentCategor
    activeProductsByParentCategory,
    //-------------------------Cart
    createCartController,
    readCartController,
    deleteCartController,
    updateCartQuantityController,
    //---------------------------Payment
    createCheckoutController,
    setPaymentStatusController
}