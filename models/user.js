const {Schema, model}=require('mongoose')


const userSchema= new Schema({
    email:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    cart:{
        items:[{
            count:{
                type: Number,
                required: true,
                default:1
            },
            courseID:{
                type: Schema.Types.ObjectId,
                required:true,
                ref:'Course1'
            }
        }]
    }
})

module.exports=  model('User', userSchema)