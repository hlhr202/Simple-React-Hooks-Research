// Case 2, why memo doent work
import React from "react";

// memo not working
const ShouldMemoized = React.memo(
    React.forwardRef(() => {
        const [state, setState] = React.useState(0);
        console.log("memo rendered");

        return (
            <div>
                <button onClick={() => setState(state + 1)}>click</button>
                {state}
            </div>
        );
    }),
    () => true
);

const Case2 = () => {
    const [count, setCount] = React.useState(1);
    const ref = React.useRef(null);
    console.log("wrapper rendered");

    return (
        <>
            <button onClick={() => setCount(count + 1)}>+</button>
            <div>{count}</div>
            {/* the following code has error, caused by non memoized legacy ref callback, which results in ShouldMemoized props change */}
            <ShouldMemoized ref={(div) => (ref.current = div)} />
        </>
    );
};

export default Case2;
