import { Router } from "express";
import { userSignUp, userLogin, userLogOut, updateAccount, updateProfile, changeCurrentPassword, refreshAccessToken } from "../controlers/User.controlers.js"
import { Upload } from "../middleware/upload.moddleware.js";
import { verifyJWT } from "../middleware/auth-middleware.js";

const router = Router()

router.route("/signup").post(Upload.fields([{ name: "profilePhoto", maxCount: 1 }]), userSignUp)
router.route("/login").post(userLogin)
router.route("/refreshAccessToken").post(refreshAccessToken)
router.route("/logout").post(verifyJWT, userLogOut)
router.route("/updateAccount").post(verifyJWT, updateAccount)
router.route("/changePassword").post(verifyJWT, changeCurrentPassword)
router.route("/updateProfile").post(verifyJWT, updateProfile)
router.route("/updateAccount").post(verifyJWT, updateAccount)

export default router


