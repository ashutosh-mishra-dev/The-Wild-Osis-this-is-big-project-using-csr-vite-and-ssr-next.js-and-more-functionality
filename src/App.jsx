import styled from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";

const Mystyle = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as="h1">The Wild Oasis</Heading>
        <Heading as="h2">Check in and out</Heading>
        <Button onClick={() => alert("hi")}>Check In</Button>
        <Button onClick={() => alert("hellow")}>Check Out</Button>

        <Heading as="h3">Form</Heading>
        <Input placeholder="number of guests" />
        <Input placeholder="number of guests" />
      </StyledApp>
    </>
  );
}

export default App;
