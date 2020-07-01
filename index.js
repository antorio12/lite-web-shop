const express= require('express')
const path=require('path')
const app=express()
const mongoose=require('mongoose')
const exphbs=require('express-handlebars')

const hbs= exphbs.create({
    defaultLayout:'main',
    extname: 'hbs'
})
const homeRoutes=require('./routes/home.js')
const addRoutes=require('./routes/add.js')
const coursesRoutes=require('./routes/courses.js')
const cardRoutes=require('./routes/card') 
    app.engine('hbs',hbs.engine)
    app.set('view engine', 'hbs')
    app.set('views', 'views')
    app.use(express.static(path.join(__dirname,'public')))
    app.use(express.urlencoded({extended:true}))
    app.use('/', homeRoutes)
    app.use('/add', addRoutes)
    app.use('/courses', coursesRoutes)
    app.use('/card', cardRoutes)




app.get('/about', (request, response) =>{
    response.render('about')
})
 
async function start(){
    try{
        const urlMongo=`mongodb+srv://Antorio19:xf3AVaAgzm9ZOVJJ@cluster0.rwaea.mongodb.net/shop`
        await mongoose.connect(urlMongo,{useNewUrlParser: true})
        const PORT=process.env.PORT || 3000
    
        app.listen(PORT, () =>{
            console.log(`Server start at port ${PORT}`)
        })
    } catch(e){
        console.log(e)
    }
    
}
start()

const login='Antorio19'
const pass='xf3AVaAgzm9ZOVJJ'
const urlMongo='mongodb+srv://Antorio19:<xf3AVaAgzm9ZOVJJ>@cluster0.rwaea.mongodb.net/<dbname>?retryWrites=true&w=majority'