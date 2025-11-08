import { faker } from "@faker-js/faker";
import "./otherLearning/styles.css";
import withToggles from "./otherLearning/HOC";

// ---------- faker api se rendom data aa rha h ------------------
const products = Array.from({ length: 20 }, () => {
  return {
    productName: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
  };
});

// const companies = Array.from({ length: 15 }, () => {
//   return {
//     companyName: faker.company.name(),
//     phrase: faker.company.catchPhrase(),
//   };
// });

// --------------------- App component -------------------------------------
export default function AppForOtherLearn() {
  // here we are using higher order component
  const ProductListWithToggles = withToggles(ProductList);
  console.log(ProductListWithToggles);
  return (
    <div>
      <h1>HOC Demo</h1>
      <div className="col-2">
        {/* <ProductList title="Product HOC" items={products} /> */}
        <ProductListWithToggles
          title="Product HOC"
          items={products}
          render={(product) => (
            <ProductItem key={product.productName} product={product} />
          )}
        />
      </div>
    </div>
  );
}

// --------------------- ProductItem component -------------------------------------
function ProductList({ title, items, render }) {
  return (
    <>
      <h1>{title}</h1>
      <ul className="list">{items.map(render)}</ul>
    </>
  );
}

// --------------------- ProductItem component -------------------------------------
function ProductItem({ product }) {
  return (
    <li className="product">
      <p className="product-name">{product.productName}</p>
      <p className="product-price">${product.price}</p>
      <p className="product-description">{product.description}</p>
    </li>
  );
}
