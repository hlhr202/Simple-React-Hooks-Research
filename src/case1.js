// Case 1, a wrong case for useEffect produce memory leak
import React from "react";

// produce steps:
// 1. click show
// 2. resize window

const Error = () => {
    const [state, setState] = React.useState(0);

    React.useEffect(() => {
        window.addEventListener("resize", () => {
            setState(window.innerWidth);
        });
    }, []);

    return <div>{state}</div>;
};

const Case1 = () => {
    const [showError, setShowError] = React.useState(1);
    return (
        <>
            <button onClick={() => setShowError(showError + 1)}>show</button>
            {showError === 1 && <Error />}
        </>
    );
};

export default Case1;
