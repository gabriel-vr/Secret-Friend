import express from 'express'
import pessoaController from '../Controllers/pessoaController.js';

const router=express.Router();
router.get('/', pessoaController.getPessoas);
router.post('/', pessoaController.postPessoa);
router.put('/:id', pessoaController.putPessoa);
router.delete('/:id', pessoaController.deletePessoa);
router.get('/amigoSecreto', pessoaController.getAmigoSecreto);


export default router;