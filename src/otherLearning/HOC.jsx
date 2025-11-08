// React me Higher-Order Component (HOC) ek design pattern hai — jisme hum ek component ko argument ke roop me lete hain aur ek naya enhanced component return karte hain.

// 👉 Simple shabdon me:

// HOC ek function hai jo ek component ko input me leta hai aur ek naya component return karta hai, jisme kuch extra functionality hoti hai.

// ye bhi ab react 19 me use nhi hota eski jagah bhi custom hook ne le li h

import { useState } from "react";

export default function withToggles(WrappedComponent) {
  // List hi Ye inner component hai — actual HOC component.
  return function List(props) {
    const [isOpen, setIsOpen] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const displayItems = isCollapsed ? props.items.slice(0, 3) : props.items;
    console.log(displayItems);
    function toggleOpen() {
      setIsOpen((isOpen) => !isOpen);
      setIsCollapsed(false);
    }

    return (
      <div className="list-container">
        <div className="heading">
          <h2>{props.title}</h2>
          <button onClick={toggleOpen}>
            {isOpen ? <span>&or;</span> : <span>&and;</span>}
          </button>
        </div>
        {isOpen && <WrappedComponent {...props} items={displayItems} />}

        <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
          {isCollapsed ? `Show all ${props.items.length}` : "Show less"}
        </button>
      </div>
    );
  };
}
