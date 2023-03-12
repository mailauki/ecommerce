import ProductCard from "../components/ProductCard";

export default function Home() {
    return (
        <>
            <h1>Home</h1>

            <div className="grid">
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </>
    )
}
