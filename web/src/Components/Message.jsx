import React, { useState } from "react";
import { useSpring, useTransition, animated } from "react-spring";

export function Message({ message, onClick }) {
    const [toggle, setToggle] = useState(false);
    const [box, setBox] = useSpring(() => ({
        opacity: 1,
    }));
    const transitions = useTransition(toggle, null, {
        from: {
            position: "absolute",
            bottom: -1,
            left: -1,
            height: 5,
            width: 0,
            background: "var(--lightgreen)",
        },
        enter: { width: 0 },
        leave: { width: 300 },
    });

    function handleHover() {
        setBox({ scale: 1.1, shadow: 15 });
        setToggle(true);
        setTimeout(() => setBox({ opacity: 0 }), 1000);
    }

    return (
        <animated.div
            className="Message"
            style={box}
            onClick={onClick}
            onMouseEnter={handleHover}
        >
            {message}
            {transitions.map(({ key, item, props }) => (
                <animated.div style={props} />
            ))}
        </animated.div>
    );
}
