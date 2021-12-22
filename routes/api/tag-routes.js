const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(singleTag);
  } catch (err) {
    res.status(404).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post("/", async (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  // create a new tag
});

router.put("/:id", async (req, res) => {
  Tags.update(req.body, {
    where: { id: req.params.id },
  })
    .then((updatedTag) => {
      if (!updatedTag) {
        res.status(404).json({
          message: "There is not tag with that ID.",
        });
        return;
      }
      res.json("Updated Tag");
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  // update a tag's name by its `id` value
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteTag) {
      res.status(404).json({
        message: "There is no tag at that ID.",
      });
      return;
    }
    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
