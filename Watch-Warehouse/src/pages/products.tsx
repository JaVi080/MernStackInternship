import { Navbar } from "react-bootstrap";
import CategoryBarWithStyles from "../Components/CategoryBar";
import ProductList from "../Components/productList";
import Footer from "../Components/footer";

const ProductPage = () => {
  return (
    <>
      <Navbar />
      <CategoryBarWithStyles />
      <ProductList />
      <Footer />
    </>
  );
};

export default ProductPage;