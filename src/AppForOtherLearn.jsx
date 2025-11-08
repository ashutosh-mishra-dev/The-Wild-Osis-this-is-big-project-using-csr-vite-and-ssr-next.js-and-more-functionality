import Counter from "./Counter";
import "./styles.css";

export default function AppForOtherLearn() {
  return (
    <div>
      <h1>Compound Component Pattern</h1>
      {/* <Counter
        iconIncrease="+"
        iconDecrease="-"
        label="My NOT so flexible counter"
        hideLabel={false}
        hideIncrease={false}
        hideDecrease={false}
        positionalCount="top"
      /> */}

      <Counter>
        <Counter.Label>super flexible counter</Counter.Label>
        <div>
          <Counter.Decrease icon="-" />
          <Counter.Count />
          <Counter.Increase icon="+" />
        </div>
      </Counter>

      <Counter>
        <Counter.Label>other thinks</Counter.Label>
        <div>
          <Counter.Decrease icon="-" />
          <Counter.Count />
          <Counter.Increase icon="+" />
        </div>
      </Counter>
    </div>
  );
}
