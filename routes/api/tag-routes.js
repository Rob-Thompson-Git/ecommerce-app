const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try { // find all tags
    const tagData = await Tag.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try { // find a single tag by its `id`
    const tagData = await Tag.findOne(req.params.id, {
      include: [{model: Product}],
    });
      // be sure to include its associated Product data
    if(!tagData) {
      res.status(404).json({message: 'No tag found with this id'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try { // create a new tag
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', (req, res) => {
  try { // delete on tag by its `id` value
    const tagData = await Tag.destroy({
      where: {id: req.params.id}
    });
    if(!tagData) {
      res.status(404).json({message: "No tag with this id!"});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }  
});

router.put('/:id', async (req, res) => {
  try { // update a tag's name by its `id` value
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if(!tagData[0]) {
      res.status(404).json({ message: 'No tag with this id!'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
