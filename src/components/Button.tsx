import { ReactNode } from "react";

const Button = ({
    children,
    onClickEvent,
}: {
    children: ReactNode;
    onClickEvent: () => void;
}) => {
    return (
        <button
            onClick={onClickEvent}
            className="px-6 py-3 rounded bg-teal-700 font-semibold text-white"
        >
            {children}
        </button>
    );
};

export default Button;
