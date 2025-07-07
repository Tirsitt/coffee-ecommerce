import { mockProducts } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Welcome to Coffee</h1>
      <div className="row">
        {mockProducts.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}