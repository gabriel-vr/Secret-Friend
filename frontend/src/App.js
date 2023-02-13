import {useState, useEffect} from 'react'
import AmigoSecretoLista from './Components/AmigoSecreto';
import Formulario from './Components/Formulario';
import Lista from './Components/Lista';
import { deletePessoa, getPessoas, postPessoa, putPessoa } from './Services/pessoaService';

function App() {
  const [listagem, setListagem] = useState(true);
  const [criar, setCriar] = useState(false);
  const [atualizar, setatualizar] = useState(false);
  const [amigoSecreto, setAmigoSecreto] = useState(false);

  const [pessoas, setPessoas] = useState([]);
  const [pessoaAtualizar, setPessoaAtualizar] = useState({});

  const obterPessoas = async () => {
    const resposta = await getPessoas();
    setPessoas(resposta);
  }

  const onClickAdicionar  = () => {
    setCriar(true);
    setListagem(false);
  }
  const onClickAtualizar  = (pessoa) => {
    setatualizar(true);
    setListagem(false);
    setPessoaAtualizar(pessoa);
  }
  const onClickAmigoSecreto = () => {
    setAmigoSecreto(true);
    setListagem(false);
  }
  const onClickVoltar  = () => {
    setCriar(false);
    setatualizar(false);
    setAmigoSecreto(false);
    setListagem(true);
  }

  const onCreate = async (e, pessoa) => {
    e.preventDefault();
    const resultado = await postPessoa(pessoa);
    if(resultado) {
      setPessoas([...pessoas, resultado]);
      alert("Pessoa criada com sucesso!");
    }
    onClickVoltar();
  } 

  const onUpdate = async (e, pessoa) => {
    e.preventDefault();
    const resultado = await putPessoa(pessoa._id,pessoa);
    if(resultado === 204){
        setPessoas(oldValue => oldValue.map(value => value._id === pessoa._id ? pessoa : value));
        alert("Pessoa atualizada com sucesso!");
    }
    onClickVoltar();
  } 

  const onDelete = async (e, pessoa) => {
    e.preventDefault();
    if(window.confirm(`Deseja mesmo deletar o(a) ${pessoa.nome}`)) {
      const resultado = await deletePessoa(pessoa._id,pessoa);
      if(resultado === 204) {
        setPessoas(oldValue => oldValue.filter(value => value._id !== pessoa._id));
        alert("Pessoa deletada com sucesso!");
      }
      onClickVoltar();
    }
  } 

  useEffect(() => {
    obterPessoas();
  }, [])
  return (
    <div className="App container">
      {listagem ? 
      <Lista
        pessoas={pessoas}
        onClickAdicionar={onClickAdicionar}
        onClickAtualizar={onClickAtualizar}
        onClickVoltar={onClickVoltar}
        onClickAmigoSecreto={onClickAmigoSecreto}
        onClickDeletar={onDelete}
       /> : null}
      {criar ? 
      <Formulario 
        onClickVoltar={onClickVoltar}
        onSend={onCreate}
        titulo="Criar Pessoa"
        tituloBotao="Enviar"

      /> : null}
      {atualizar ? 
      <Formulario 
        onClickVoltar={onClickVoltar}
        onSend={onUpdate}
        titulo="Atualizar Pessoa"
        tituloBotao="Enviar"
        pessoaAtualizar={pessoaAtualizar}
      /> : null}
      {amigoSecreto ? <AmigoSecretoLista onClickVoltar={onClickVoltar}/> : null}
    </div>
  );
}

export default App;
