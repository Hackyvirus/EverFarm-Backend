import { Router } from "express";
import { userSignUp,userLogin, userLogOut, changeCurrentPassword,refreshAccessToken } from "../controlers/User.controlers.js"
import { Upload } from "../middleware/upload.moddleware.js";
import { verifyJWT } from "../middleware/auth-middleware.js";



const router = Router()


router.route("/signup").post(Upload.fields([{ name: "profilePhoto", maxCount: 1 }]), userSignUp)


router.route("/login").post(userLogin)
router.route("/refreshAccessToken").post(refreshAccessToken)

router.route("/logout").post(verifyJWT, userLogOut)
router.route("/changePassword").post(verifyJWT, changeCurrentPassword)

export default router


