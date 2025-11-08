import { useState } from "react";
import { faker } from "@faker-js/faker";
import "./otherLearning/styles.css";

// ye example react me render props ke bare me dekha :
// Render Props ek tariqa hai components ke beech logic share karne ka, jahan ek function-type prop use hoti hai jo batati hai UI kaunsa render hoga.
// ab use nhi hota eske jagah custom hook use hota (sath hi useState aur useEffect)

// ---------- faker api se rendom data aa rha h ------------------
const products = Array.from({ length: 20 }, () => {
  return {
    productName: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
  };
});

const companies = Array.from({ length: 15 }, () => {
  return {
    companyName: faker.company.name(),
    phrase: faker.company.catchPhrase(),
  };
});

// --------------------- App component -------------------------------------
function AppForOtherLearn() {
  return (
    <div>
      <h1>Render Props Demo</h1>

      <div className="col-2">
        {/* render props ka use kiya ja rha h  list component ke throw 
          ye purane react me use hota tha jab hook available nhi the
        */}
        <List
          title="Products"
          items={products}
          render={(product) => (
            <ProductItem key={product.productName} product={product} />
          )}
        />

        <List
          title="Company"
          items={companies}
          render={(company) => (
            <CompanyItem
              key={company.productName}
              company={company}
              defaultVisibility={false}
            />
          )}
        />
      </div>
    </div>
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
// --------------------- CompanyItem component -------------------------------------
function CompanyItem({ company, defaultVisibility }) {
  const [isVisible, setIsVisisble] = useState(defaultVisibility);

  return (
    <li
      className="company"
      onMouseEnter={() => setIsVisisble(true)}
      onMouseLeave={() => setIsVisisble(false)}>
      <p className="company-name">{company.companyName}</p>
      {isVisible && (
        <p className="company-phrase">
          <strong>About:</strong> {company.phrase}
        </p>
      )}
    </li>
  );
}

// --------------------- List component -------------------------------------

function List({ title, items, render }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const displayItems = isCollapsed ? items.slice(0, 3) : items;

  function toggleOpen() {
    setIsOpen((isOpen) => !isOpen);
    setIsCollapsed(false);
  }

  return (
    <div className="list-container">
      <div className="heading">
        <h2>{title}</h2>
        <button onClick={toggleOpen}>
          {isOpen ? <span>&or;</span> : <span>&and;</span>}
        </button>
      </div>
      {isOpen && <ul className="list">{displayItems.map(render)}</ul>}

      <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
        {isCollapsed ? `Show all ${items.length}` : "Show less"}
      </button>
    </div>
  );
}

export default AppForOtherLearn;
