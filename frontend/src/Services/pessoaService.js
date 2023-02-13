import axios from 'axios';

const api = axios.create({
    "baseURL": "http://localhost:3001/"
})

export const getPessoas = async () => {
    try {
        const resposta = await api.get('pessoas/');
        return resposta.data;
    } catch(error) {
        if (error.response) {
            alert(error.response.data)
        } else if (error.request) {
        console.error(error.request);
        } else {
        console.error('Error', error.message);
        }
          console.error(error.config);
        return [];
    }
}

export const postPessoa = async (pessoa = {nome: "", email: ""}) => {
    try {
        const resposta = await api.post('pessoas/', pessoa);
        return resposta.data;
    } catch(error) {
        if (error.response) {
            alert(error.response.data)
        } else if (error.request) {
        console.error(error.request);
        } else {
        console.error('Error', error.message);
        }
          console.error(error.config);
        return null;
    }
}

export const putPessoa = async (id, pessoa = {nome: "", email: ""}) => {
    try {
        const resposta = await api.put(`pessoas/${id}`,pessoa);
        return resposta.status;
    } catch(error) {
        if (error.response) {
            alert(error.response.data)
        } else if (error.request) {
        console.error(error.request);
        } else {
        console.error('Error', error.message);
        }
          console.error(error.config);
        return null;
    }
}

export const deletePessoa = async (id) => {
    try {
        const resposta = await api.delete(`pessoas/${id}`);
        return resposta.status;
    } catch(error) {
        if (error.response) {
            alert(error.response.data)
        } else if (error.request) {
        console.error(error.request);
        } else {
        console.error('Error', error.message);
        }
          console.error(error.config);
        return null;
    }
}

export const getAmigoSecreto = async () => {
    try {
        const resposta = await api.get('pessoas/amigoSecreto');
        return resposta.data;
    } catch(error) {
        if (error.response) {
            alert(error.response.data)
        } else if (error.request) {
        console.error(error.request);
        } else {
        console.error('Error', error.message);
        }
          console.error(error.config);
        return [];
    }
}