const express = require("express");
const router = express.Router();
const controller = require("../controllers/controllers");

router.get("/add", (req, res) => {
    res.render("index", { body: {}, title: {}, url: {}, errorAuthentication: false });
});
router.get("/edit/:id", controller.loadLink);
router.get("/:title", controller.redirect);
router.get("/", controller.allLinks);

router.post("/", express.urlencoded({ extended: true }), controller.addLink);
router.post("/edit/:id", express.urlencoded({ extended: true }), controller.editLink);

router.delete("/:id", express.json(), controller.deleteLink);

module.exports = router;
