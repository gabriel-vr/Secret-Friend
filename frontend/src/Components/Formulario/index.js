import { useEffect, useState } from "react";

export default function Formulario({
    pessoaAtualizar,
    onSend,
    titulo,
    onClickVoltar,
    tituloBotao
}) {
    const [pessoa, setPessoa] = useState({nome: "", email: ""});

    useEffect(() => {
        if(typeof pessoaAtualizar === 'object' && Object.keys(pessoaAtualizar).length > 0)
            setPessoa(pessoaAtualizar);
    }, [pessoaAtualizar]);

    return (
        <form className="p-2">
            <div>
                <h1>{titulo}</h1>
            </div>
            <div className="form-group">
                <label for="nome-pessoa-input">Nome</label>
                <input
                    id="nome-pessoa-input" 
                    type="text" 
                    value={pessoa.nome}
                    placeholder="Nome"
                    onChange={e => {
                        const obj = {...pessoa, nome: e.target.value}
                        setPessoa(obj)
                    }}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label for="email-pessoa-input">E-mail</label>
                <input 
                    id="email-pessoa-input"
                    type="text" 
                    value={pessoa.email}
                    placeholder="Email"
                    onChange={e => {
                        const obj = {...pessoa, email: e.target.value}
                        setPessoa(obj)
                    }}
                    className="form-control"
                />
            </div>

            <div className="row mt-2">
                <div className="col-md-1">
                    <button className="btn btn-sm btn-default" onClick={onClickVoltar}>Voltar</button>

                </div>
                <div className="col-md-1">
                    <button className="btn btn-sm btn-primary" onClick={e => {onSend(e, pessoa)}}>{tituloBotao}</button>
                </div>
            </div>
        </form>
    )
}