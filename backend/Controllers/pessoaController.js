import mongoose from "mongoose";
import Pessoa from "../Models/pessoaModel.js";
import { enviarEmail } from "../Services/email.js";

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const getPessoas = async (req, res) => {
    try {
        const pessoas = await Pessoa.find();
        res.status(200).send(pessoas);
        return;
    } catch(err) {
        res.status(400).send("Um erro ocorreu ao obter as informações.");
        return;
    }
}

const postPessoa = async (req, res) => {
    try {
        const pessoa = new Pessoa(req.body);
        await pessoa.save();
        res.status(201).send(pessoa);
        return;
    } catch(err) {
        res.status(400).send("Um erro ocorreu ao criar a pessoa");
        return;
    }
}

const putPessoa = async (req, res) => {
    try {
        const id = req.params.id;
        await Pessoa.findOneAndUpdate({id},{$set: req.body});
        res.status(204).end();
        return;
    } catch(err) {
        res.status(400).send("Um erro ocorreu ao atualizar a pessoa.");
        return;
    }
}

const deletePessoa = async (req, res) => {
    try {
        const id = req.params.id;
        await Pessoa.findByIdAndRemove(id);
        res.status(204).end();
        return;
    } catch(err) {
        res.status(400).send("Um erro ocorreu ao deletar a pessoa.");
        return;
    }
}

const getAmigoSecreto = async (req, res) => {
    try {
        const pessoas = await Pessoa.find();
        if(pessoas.length % 2 !== 0)
            return res.status(400).send("É preciso um número par de pessoas.");

        shuffleArray(pessoas);
        const pares = [];
        for(let i = 0; i < pessoas.length; i++) {
            pares.push({entrega: pessoas[i], 
                recebe: pessoas[(i+1)%pessoas.length]});
        }

        pares.forEach(par => {
            enviarEmail(par.entrega, par.recebe);
        })

        return res.status(200).send(pares);
    } catch(err) {
        res.status(400).send("Um erro ocorreu ao criar a lista de amigos secretos.");
        return;
    }
}
export default {
    getPessoas,
    postPessoa,
    putPessoa,
    deletePessoa,
    getAmigoSecreto
}
