import React, { PropsWithChildren } from "react";

const ModalContent = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="text-2xl  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            {children}
        </div>
    );
};

export default ModalContent;
