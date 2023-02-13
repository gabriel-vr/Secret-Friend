import { useDebugValue, useEffect, useRef, useState } from "react"
import { getAmigoSecreto } from "../../Services/pessoaService";

export default function AmigoSecretoLista ({
    onClickVoltar
}) {
    const [lista, setLista] = useState([]);
    const dadosBuscados = useRef(false);
    const obterLista = async () => {
        const resultado = await getAmigoSecreto();
        setLista(resultado);
    }
    useEffect(() => {
        if(dadosBuscados.current) return;
        dadosBuscados.current = true;
        obterLista();
    }, []);
    return (
        <div className="p-3">
            <div>
                <button className="btn btn-sm btn-default" onClick={onClickVoltar}>Voltar</button>
            </div>
            <hr/>
            <table className="table">
                <thead>
                    <tr>
                        <th>Entrega</th>
                        <th></th>
                        <th>Recebe</th>
                    </tr>
                </thead>
                <tbody> 
                    {
                        lista.map (par => (
                            <tr key={par.entrega._id}>
                                <td>{par.entrega.nome}</td>
                                <td>{`--->`}</td>
                                <td>{par.recebe.nome}</td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}