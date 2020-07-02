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
userSchema.methods.addToCart= function(course){
const items=[...this.cart.items]
    const indx = items.findIndex(c => {
        return c.courseID.toString() === course._id.toString()
    })
    if (items[indx]){
        items[indx].count++
    } else {
        items.push({
            courseID: course._id,
            count:1
        })

    }
    const newCart={items}
    this.cart= newCart
    return this.save( )
}

module.exports=  model('User', userSchema)