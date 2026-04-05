
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "./productCard";

const FilterCategories = () => {
    const { category } = useParams();
    const filteredProducts = products.filter((product) => product.category.toLowerCase() === category?.toLowerCase());

    return (
        <div className="container mt-5">
            <h2 className="mb-4">{category}</h2>
            <div className="row">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="col-md-4 mb-4">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterCategories;