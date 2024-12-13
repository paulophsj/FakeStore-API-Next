import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Card.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Icons do BootStrap
import { faShoppingBag, faHeart, faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function Card({ dataCards }) {
    const nota = parseInt(dataCards.nota)
    const notaQuantidade = []
    for (let i = 0; i <= nota; i++) {
        notaQuantidade.push((<FontAwesomeIcon icon={faStar} />))
    }
    return (
        <div className="col-md-3 col-sm-6 border m-1 tamanho">
            <div className="product-grid">
                <div className="product-image d-flex align-items-center justify-content-center">
                    <Link href={{pathname: '/produto', query:{id: dataCards.id}}} className="image d-flex align-items-center" style={{
                        width: '250px',
                        height: '450px'
                    }}>
                        <img style={{ width: `100%` }} src={dataCards.imagem} />
                    </Link>
                    <Link className="quick-view border" data-tip="Visualizar" href={{pathname: '/produto', query:{id: dataCards.id}}}>
                        <FontAwesomeIcon icon={faSearch} />Visualizar
                    </Link>
                    <ul className="product-links">
                        <li><a href="#" data-tip="Adicionar ao carrinho"><FontAwesomeIcon icon={faShoppingBag} /></a></li>
                        <li><a href="#" data-tip="Adicionar aos favoritos"><FontAwesomeIcon icon={faHeart} /></a></li>
                    </ul>
                </div>
                <div className="product-content">
                    <h3 className="title"><a href="#">{dataCards.titulo}</a></h3>
                    <ul className="rating">
                        <p>{notaQuantidade.map((item) => (item))}</p>
                        <p>{dataCards.quantidadeAvaliacoes} Avaliacoes</p>
                    </ul>
                    <div className="price">R${dataCards.preco}</div>
                </div>
            </div>
        </div>
    )
}

//fas fa-star - preenchido
//far fa-star - nao preenchido