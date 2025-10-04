const express=require('express')

const router=express.Router()
const {getitem,postitem,updateitem,delateitem}=require('../controller/item')

router.post('/postitem',  postitem)
router.get('/getitem',  getitem)
router.put('/postitem/:id',  updateitem)
router.delete('/delateitem/:id',  delateitem)


module.exports=router