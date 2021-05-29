const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data'
  try {
    const tagData = await Tag.findAll({
      include: [{all: true}],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{all: true}],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  /* req.body should look like:
    {
      tag_name: "string",
      productIds: [1, 2, 3, 4]
    }
  */
  Tag.create(req.body)
    .then((tag) => {
      if (req.body.productIds.length) {
        const tagProductIdsArr = req.body.productIds.map((product_id) => {
          return {
            tag_id: tag.id,
            product_id
          };
        });
        return ProductTag.bulkCreate(tagProductIdsArr);
      }
      res.status(200).json(tag);
    })
    .then((tagProductId) => res.status(200).json(tagProductId))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      return ProductTag.findAll({where: { tag_id: req.params.id }});
    })
    .then((productTags) => {
      const 
    })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
