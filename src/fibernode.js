// for more fibernode details, visit https://www.velotio.com/engineering-blog/react-fiber-algorithm

import React from "react";
import ReactDOM from "react-dom";

function getCurrentFiber() {
    // we're digging into dark places here.
    return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        .ReactCurrentOwner.current;
}

// any valid hooks (useState/useMemo/useCallback) will use ReactCurrentOwner to capture the current fiberNode in workloop (performUnitOfWork)
// then they will get the real mounted state/effects/memo...
const TestComp = ({ initial }) => {
    const [state, setState] = React.useState(initial);

    const handleChange = React.useCallback(() => {
        setState(state + 1);
    }, [state]);

    const fiber = getCurrentFiber();

    // we hacked the fiber in rendering progress
    // the TestComp function is binded to fiber.elementType
    console.log(fiber);

    return <div onClick={handleChange}>{state}</div>;
};

// equivalent js expression of jsx element
// createElement will not produce fiberNode, it will only create a structure that DOM render can understand
const instance = React.createElement(TestComp, { initial: 0 });

console.log(instance);

// To hack fiberNode, we need to create a global real DOM for mounting
window.testReactRoot = document.createElement("div");

// render scheduled from ReactDOM.render
// fiber root node will be created under window.testReactRoot._reactRootContainer
// the previous fiberNode is under window.testReactRoot._reactRootContainer._internalRoot.current.child
ReactDOM.render(instance, window.testReactRoot);
