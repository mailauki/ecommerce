import ProductCard from "../components/ProductCard";

export default function Home() {
    return (
        <>
            <h1>Home</h1>

            <div className="grid">
                <ProductCard id={1} />
                <ProductCard id={2} />
                <ProductCard id={3} />
            </div>
        </>
    )
}
