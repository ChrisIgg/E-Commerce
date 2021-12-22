const router = require("express").Router();
const { Category, Product, ProductTag } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get("/:id", async (req, res) => {
  try {
    const oneCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!oneCategory) {
      res.status(404).json({
        message: "There is no category with that ID.",
      });
      return;
    }
    res.status(200).json(oneCategory);
  } catch (err) {
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", async (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  // create a new category
});

router.put("/:id", async (req, res) => {
  Category.update(req.body, {
    where: { id: req.params.id },
  })
    .then((updateCategory) => {
      if (!updateCategory) {
        res.status(404).json({
          message: "There is no category with that ID.",
        });
        return;
      }
      res.json("Updated Category");
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  // update a category by its `id` value
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteCategory) {
      res.status(404).json({
        message: "There is no category with that ID.",
      });
      return;
    }
    res.status(200).json("Deleted Category");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
