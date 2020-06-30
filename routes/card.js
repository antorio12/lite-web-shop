const {Router, response}=require('express')
const router= Router()
const Card=require('../models/card')
const Course=require('../models/courses')

router.post('/add', async (req, res) => {
    const course = await Course.getById(req.body.id)
    await Card.add(course)
    res.redirect('/card')
  })
  router.delete('/remove/:id', async (req, res) => {
        const card=await Card.remove(req.params.id)
        res.status(200).json(card)
  })
router.get('/', async (request, response) => {
    const card= await Card.fetch()
    response.render('card', {
        title: 'Корзина', 
        isCard:true,
        courses:card.courses,
        price: card.price
    })
})




module.exports= router