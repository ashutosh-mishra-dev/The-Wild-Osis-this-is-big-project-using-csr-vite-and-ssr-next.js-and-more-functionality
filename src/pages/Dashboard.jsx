import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Dashboard() {
  console.log("dashboard");
  const product = Array.from({ length: 20 }, () => {
    return "ram";
  });

  console.log(product);

  return (
    <Row type="horizontal">
      <Heading as="h1">Dashboard</Heading>
      <p>TEST</p>
    </Row>
  );
}

export default Dashboard;
