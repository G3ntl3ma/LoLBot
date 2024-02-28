import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const serverConfigSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },  //ServerID
    out: {
        type: String,
        required: false
    }, //Output Channel
    teamSubs: [{
        code: {
            type:String,
            required: true
        }
    }],//Array of all teams that the Server is subscribed to
    leagueSubs : [{
        code: {
            type:String,
            required:true
        }
    }], //Array of all Leagues the Person is subscribed to
})
const LoLConfig = mongoose.model("users", serverConfigSchema);
export default LoLConfig