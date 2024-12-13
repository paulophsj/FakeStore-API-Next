import { useEffect, useState } from "react";
import Card from "./Card";
import 'bootstrap/dist/css/bootstrap.min.css';
import Toast from "./Toast";
import '../styles/Loading.css'

export default function Elements() {
    const [element, setElement] = useState([])
    const [mensagem, setMessage] = useState(null)
    const [messageState, setMessageState] = useState(false)
    const [loading, setLoading] = useState(false)

    async function findProducts(quantidadeBusca) {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${quantidadeBusca}`);
            const data = await response.json();
            
            return {
                id: data.id,
                titulo: data.title,
                preco: data.price,
                descricao: data.description,
                imagem: data.image,
                nota: data.rating.rate,
                quantidadeAvaliacoes: data.rating.count
            };
        } catch (err) {
            return null;
        }
    }

    useEffect(() => {

        const novoProduto = []

        for (let i = 0; i <= 15; i++) {
            novoProduto.push(findProducts(i));
        }

        Promise.all(novoProduto)
        .then((results) => {
            setElement(results.filter(item => item !== null)); //Se tiver null, retira o produto
            setMessage('Produtos carregados com sucesso!')
            setMessageState(true)
        })
        .catch((err) => {
            setMessage('Erro ao carregar todos os produtos.');
            setMessageState(false)
        });

    }, []); //Isso sera executado apenas uma vez 

    useEffect(() => {
        if (loading) {
            return setLoading(false)
        }
        setLoading(true)
    }, [element])

    return (
        <div className="container d-flex flex-wrap align-items-center justify-content-center">
            <Toast message={mensagem} state={messageState}/>
            {
                loading && (
                    <div style={{
                        position: 'absolute',
                        top: '50%'
                    }}>
                        <div className="d-flex gap-1 align-items-center justify-content-center">
                        <div className="loading"></div>
                        <p className="m-0" style={{color: '#f82e56'}}>Buscando produtos...</p>
                        </div>
                    </div>
                )
            }
            {
                element.map((item) => (<Card dataCards={item}/>))
            }
        </div>
    )
}