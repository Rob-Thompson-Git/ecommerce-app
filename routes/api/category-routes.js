const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {// find all categories
    const categoryData = await Category.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
      include: [Product],
    })
    .then((category) => res.status(200).json(category))
    .catch((err) => res.status(400).json(err));
      // be sure to include its associated Products
    
});

router.post('/', async (req, res) => {
  try {// create a new category
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', (req, res) => {
  Category.destroy({
      where: {
        id: req.params.id,
      }
    })
    .then((deletedCategory) => {
      res.status(200).json(deletedCategory);
    })
    .catch((err) => res.json(err));  
});

router.put('/:id', async (req, res) => {
  try {// update a category by its `id` value
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if(!categoryData[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
