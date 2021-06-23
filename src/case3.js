// Case 3, how to create an array of refs

import React from "react";

const Inner = React.forwardRef((props, ref) => {
    const [count, setCount] = React.useState(0);

    React.useImperativeHandle(
        ref,
        () => ({
            increment: () => setCount(count + 1),
        }),
        [count]
    );
    return <div>{count}</div>;
});

const Wrapper = () => {
    const ref = React.useRef();

    return (
        <>
            <Inner ref={ref} />
            <button onClick={() => ref.current.increment()}>click</button>
        </>
    );
};

export default Wrapper;
