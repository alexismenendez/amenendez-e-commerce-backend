const router = require('express').Router();
const { Category, Product } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [Product]
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { id: req.params.id },
      include: [Product]
    });

    if (!category) {
      res.status(404).json({ message: "No category found with this id!"});
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json({message: "Category created!", newCategory});
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updateCategory) {
      res.status(404).json({ message: "No category found with this id!"});
      return;
    }

    res.status(200).json({ message: "Category Updated!", updateCategory})
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: { id: req.params.id }
    });

    if (!deleteCategory) {
      res.status(404).json({ message: "No category found with this id!"});
      return;
    }

    res.status(200).json({message: "Category deleted!", deleteCategory});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
