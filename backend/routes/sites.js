const express = require('express');
const router = express.Router();
const siteService = require('../services/sites-mongodb');

router.get('/', async(req, res, next) => {
  const data =  await siteService.getData();
  res.send(data);
});
router.get("/:id", async (req, res) => {
  const data =  await siteService.getDataById(req.params.id);
  res.send(data);
});

router.post("/", async (req, res) => {
  let result = await siteService.addData(req.body);
  res.send(result);
});

router.post("/:id/mail", async (req, res) => {
  let result = await siteService.sendMail(req.params.id);
  res.send(result);
});

router.put('/', async (req, res) =>{
  let result = await siteService.updateData(req.body)
  res.send(result);
});

router.delete('/:id', async (req, res) => {
  await siteService.deleteData(req.params.id);
  res.send({result:"success", msg:"Site deleted ok"});
});

module.exports = router;
