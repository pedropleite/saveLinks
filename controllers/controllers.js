const linkModel = require("../models/models");

const redirect = (req, res) => {
    let title = req.params.title;

    linkModel
        .findOneAndUpdate({ title }, { $inc: { views: 1 } })
        .then((doc) => {
            res.redirect(doc.url);
        })
        .catch((error) => {
            res.status(404).send(`Houve um erro, aqui está ele ${error}`);
        });
};

const addLink = async (req, res) => {
    const link = linkModel(req.body);
    if ((await checkLink(link)) == true) {
        link.save()
            .then(() => {
                res.redirect("/");
            })
            .catch(() =>
                res.render("index", {
                    body: req.body,
                    title: req.body.title,
                    url: req.body.url,
                })
            );
    } else {
        res.render("index", {
            errorAuthentication: true,
            title: req.body.title,
            url: req.body.url,
            body: req.body,
        });
    }
};

const deleteLink = (req, res) => {
    const id = req.params.id;

    linkModel.findByIdAndDelete(id).then(() => {
        res.send(`Deleted post with id: ${id}`);
    });
};

function allLinks(req, res) {
    var noMatch = undefined;
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), "gi");
        linkModel.find({ title: regex }).then((link) => {
            if (link.length < 1) {
                noMatch = "Não foi achado nenhum título com essa busca.";
            }
            res.render("all", { link, noMatch: noMatch });
        });
    } else {
        linkModel.find().then((link) => {
            res.render("all", { link, noMatch: noMatch });
        });
    }
}

async function checkLink(link) {
    let result = true;
    await linkModel.find().then((doc) => {
        doc.forEach((res) => {
            if (res.url == link.url) {
                result = false;
                return;
            }
        });
    });
    if (result == false) {
        return false;
    } else {
        return true;
    }
}

const loadLink = (req, res) => {
    let id = req.params.id;
    linkModel.findById(id).then((doc) => {
        let link = doc;
        res.render("edit", { body: link });
    });
};

const editLink = (req, res) => {
    let id = req.params.id;
    if (!id) {
        id = req.body.id;
    }
    let link = {};
    link.title = req.body.title;
    link.description = req.body.description;
    link.url = req.body.url;

    linkModel
        .findByIdAndUpdate(id, link)
        .then(() => {
            res.redirect("/");
        })
        .catch((error) => {
            res.render("edit", { body: req.body });
            res.status(404).body(error);
        });
};

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = {
    redirect,
    addLink,
    allLinks,
    deleteLink,
    loadLink,
    editLink,
};
