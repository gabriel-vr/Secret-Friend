export default function Lista({
    pessoas,
    onClickAdicionar,
    onClickAtualizar,
    onClickAmigoSecreto,
    onClickDeletar
}) {
    return (
        <div className="border border-light rounded p-2">
            <div className="row">
                <div className="col-md-1">
                    <button className="btn btn-sm btn-default" onClick={onClickAdicionar}>
                        Adicionar pessoa
                    </button>

                </div>

                <div className="col-md-1">
                    <button className="btn btn-sm btn-default" onClick={onClickAmigoSecreto}>
                        Amigo Secretos
                    </button>
                </div>
            </div>
            
            <hr/>

            <table className="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pessoas.map(pessoa => (
                            <tr key={pessoa._id}>
                                <td>{pessoa.nome}</td>
                                <td>{pessoa.email}</td>
                                <td className="row">
                                    <div className="col-md-4">
                                        <button className="btn btn-sm btn-primary" onClick={e => {onClickAtualizar(pessoa)}}>Editar</button>
                                    </div>
                                    <div className="col-md-4 col-md-offset-4">
                                        <button className="btn btn-sm btn-danger" onClick={e => onClickDeletar(e, pessoa)}>Excluir</button>

                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    )
}