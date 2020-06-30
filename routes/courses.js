const {Router}=require('express')
const router=Router()
const Course= require('../models/courses')


router.get('/', async (request, response) =>{
    const allCourses=await Course.getAll()
    
    response.render('courses',{
        title:"Курсы",
        isCourses:true,
        allCourses
    })
})
router.get('/:id', async (req, res) =>{
    const course= await Course.getById(req.params.id)
    res.render('course',{
        layout:'empty',
        title:`Курс по ${course.title}`,
        course
    })
})
router.get('/:id/edit', async (req, res) =>{
if (!req.query.allow){
    return res.redirect('/')
} 
const course= await Course.getById(req.params.id)
res.render('course-edit', {
    title:`Edit course ${course.title}`,
    course
})
})
router.post('/edit', async (req, res) =>{
    await Course.update(req.body)
    
    res.redirect('/courses')
})


module.exports= router