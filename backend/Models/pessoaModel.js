import mongoose from "mongoose";

const {Schema} = mongoose;


const pessoaSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },

})

const Pessoa = mongoose.model("Pessoa", pessoaSchema);

export default Pessoa