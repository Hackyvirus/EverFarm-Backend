import { Router } from "express";
import { Home, adminSignUp, addProduct, adminLogin, addBlogs, sendNotification, userReports } from "../controlers/Admin.controler.js";
import { Upload } from "../middleware/upload.moddleware.js";


const router = Router()


router.route("/").get(Home)
router.route("/admin-SignUp").post(Upload.fields([{ name: "profilePhoto", maxCount: 1 }]), adminSignUp)
router.route("/login").post(adminLogin)
router.route("/add-AIModel").post(addAIModel)
router.route("/add-Blogs").post(addBlogs)
router.route('/addProduct').post(Upload.fields([{ name: "Product Photo", maxCount: 1 }]), addProduct)
router.route("/send-notification").post(sendNotification)
router.route("/reports").get(userReports)
export default router