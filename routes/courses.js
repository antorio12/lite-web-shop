const {Router}=require('express')
const router=Router()
const Course= require('../models/courses')


router.get('/', async (request, response) =>{
    const allCourses=await Course.find().lean()
    
    response.render('courses',{
        title:"Курсы",
        isCourses:true,
        allCourses
    })
})
router.get('/:_id', async (req, res) =>{
    console.log("!!!!!!!!!!!!!!!!")
    const course= await Course.findById(req.params._id).lean()
    res.render('course',{
        layout:'empty',
        title:`Курс по ${course.title}`,
        course
    })
})
router.get('/:_id/edit', async (req, res) =>{
if (!req.query.allow){
    return res.redirect('/')
} 
const course= await Course.findById(req.params._id)
res.render('course-edit', {
    title:`Edit course ${course.title}`,
    course
})
})
router.post('/edit', async (req, res) =>{
    await Course.findByIdAndUpdate(req.body._id, req.body)
    
    res.redirect('/courses')
})


module.exports= router