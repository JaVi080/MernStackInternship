import { Navbar } from "react-bootstrap";
import CategoryBarWithStyles from "../Components/CategoryBar";
import ProductList from "../Components/productList";
import Footer from "../Components/footer";

const ProductPage = () => {
  return (
    <>
      <CategoryBarWithStyles />
      <ProductList />
    </>
  );
};

export default ProductPage;