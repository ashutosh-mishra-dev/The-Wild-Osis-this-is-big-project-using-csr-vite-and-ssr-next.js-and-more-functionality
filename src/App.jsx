import styled from "styled-components";

const Mystyle = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
`;

const Button = styled.button`
  background-color: #640287;
  color: white;
  font-weight: 500;
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  border: none;
  border-radius: 7px;
  margin: 10px;
  cursor: pointer;
`;

function App() {
  return (
    <div>
      <H1>The Wild Oasis</H1>
      <Button onClick={() => alert("hi")}>Check In</Button>
      <Button onClick={() => alert("hellow")}>Check Out</Button>
    </div>
  );
}

export default App;
