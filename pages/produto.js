import { useRouter } from 'next/router';
import PaginaProduto from '../components/PaginaProduto';

export default function produto() {
    const router = useRouter()
    const { id } = router.query

    return (
        <PaginaProduto id={id} />
    )
}