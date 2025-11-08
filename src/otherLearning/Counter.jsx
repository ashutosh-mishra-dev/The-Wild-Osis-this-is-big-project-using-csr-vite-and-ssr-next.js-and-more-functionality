// React me Compound Component ek design pattern hai — jisme multiple components ek sath milkar ek hi logical unit (parent component) ke tarah kaam karte hain.

// 👉 Simple definition:

// Compound Components aise related components hote hain jo ek parent component ke under milkar kaam karte hain, taaki user apni marzi se unka structure aur behavior customize kar sake.

import { createContext, useContext, useState } from "react";

// 1. create context
const CounterContex = createContext();

// 2. create parent component
function Counter({ children }) {
  const [count, setCount] = useState(0);
  const increase = () => setCount((c) => c + 1);
  const decrease = () => setCount((c) => c - 1);
  return (
    <CounterContex.Provider value={{ count, increase, decrease }}>
      <span>{children}</span>
    </CounterContex.Provider>
  );
}

// 3. create children component to implementing the comman task
function Count() {
  const { count } = useContext(CounterContex);
  return <span>{count}</span>;
}

function Label({ children }) {
  return <span>{children}</span>;
}

function Increase({ icon }) {
  const { increase } = useContext(CounterContex);
  return <button onClick={increase}>{icon}</button>;
}

function Decrease({ icon }) {
  const { decrease } = useContext(CounterContex);
  return <button onClick={decrease}>{icon}</button>;
}

// 4. add child components as properties to parent component

Counter.Count = Count;
Counter.Label = Label;
Counter.Increase = Increase;
Counter.Decrease = Decrease;

export default Counter;
