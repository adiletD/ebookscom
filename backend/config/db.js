import mongoose from 'mongoose'




// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://localhost:27017/test');
// }




const connectDB = async () => {

    try {

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            // useCreateIndex: true
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`)

    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }


}



export default connectDB