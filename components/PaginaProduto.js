import { faLongArrowLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Product.css'
import { useEffect, useState } from "react";
import Link from 'next/link';

export default function PaginaProduto({id}) {
    const [loading, setLoading] = useState(false)
    const [element, setElement] = useState([])

    async function findProduct(idProd) {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${idProd}`);
            const data = await response.json()

            console.log(data)

            const newProd = {
                titulo: data.title,
                preco: data.price,
                descricao: data.description,
                imagem: data.image,
                nota: data.rating.rate,
                categoria: data.category,
                quantidadeAvaliacoes: data.rating.count
            }
            setElement(newProd)
        }
        catch {
            return 'Ocorreu um erro ao buscar os produtos'
        }
    }

    useEffect(() => {
        if (id) {
            findProduct(id)
        }
    }, [id])

    useEffect(() => {
        if (loading) {
            return setLoading(false)
        }
        setLoading(true)
    }, [element])

    return (
        <div className="container d-flex flex-wrap align-items-center justify-content-center">
            {
                loading ? (
                    <div style={{
                        position: 'absolute',
                        top: '50%'
                    }}>
                        <div className="d-flex gap-1 align-items-center justify-content-center">
                            <div className="loading"></div>
                            <p className="m-0" style={{ color: '#f82e56' }}>Acessando produto...</p>
                        </div>
                    </div>
                ) : (
                    <div className="container mt-5 mb-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-10">
                                <div className="card">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="images p-3">
                                                <div className="text-center p-4">
                                                    <img id="main-image" src={element.imagem} width="250" alt="Main" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="product p-4 h-100">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <Link href={{ pathname: '/' }} className="d-flex align-items-center gap-1" style={{
                                                        textDecoration: 'none',
                                                        color: 'black'
                                                    }}>
                                                        <FontAwesomeIcon icon={faLongArrowLeft} />
                                                        <span className="ml-1">Back</span>
                                                    </Link>
                                                    <FontAwesomeIcon icon={faShoppingCart} />
                                                </div>
                                                <div className="mt-4 mb-3">
                                                    <span className="text-uppercase text-muted brand">Category: {element.categoria}</span>
                                                    <h5 className="text-uppercase">{element.titulo}</h5>
                                                    <div className="price d-flex flex-row align-items-center gap-2">
                                                        <span className="act-price">R$ {element.preco}</span>
                                                    </div>
                                                </div>
                                                <p className="about">
                                                    {element.descricao}
                                                </p>
                                                <div className="cart mt-4 align-items-center">
                                                    <button className="btn btn-danger text-uppercase mr-2 px-4">Add to cart</button>
                                                    <i className="fa fa-heart text-muted"></i>
                                                    <i className="fa fa-share-alt text-muted"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}