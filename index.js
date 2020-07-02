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
const User= require('./models/user')
const { getMaxListeners } = require('./models/user')
    app.engine('hbs',hbs.engine)
    app.set('view engine', 'hbs')
    app.set('views', 'views')
    app.use(async (req,res, next) =>{
        try{
            const user= await User.findById("5efca2b4061bdd17128aa9f6")
            req.user= user
            next()
        } catch(e){
            console.log(e)
        }
        
    })
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
        await mongoose.connect(urlMongo,
            {useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true }
            
            )
        const newUser= await User.findOne() 
        if (!newUser){
            const user= new User({
                email: 'google@gmail.com',
                name: "Antorio",
                cart:{items:[]}
                
            })
            await user.save()
        }
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