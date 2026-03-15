import { products, reviews } from '@/lib/data';
import ProductClient from './ProductClient';
import Link from 'next/link';

export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id.toString(),
    }));
}

export default async function ProductPage({ params }) {
    const { id } = await params;
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return (
            <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Product not found</h1>
                <Link href="/shop" className="btn btn-primary">Return to Shop</Link>
            </div>
        );
    }

    const matchedReviews = reviews.filter(r => r.product === product.name);
    const recommended = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

    return (
        <ProductClient 
            product={product} 
            matchedReviews={matchedReviews} 
            recommended={recommended} 
        />
    );
}
