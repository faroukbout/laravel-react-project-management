import { forwardRef, useRef } from 'react';

export default forwardRef(function SelectInput(
    { className = '',children, ...props },
    ref,
) {
    const input = ref ? ref : useRef();

    return (
        <select
            {...props}
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ' +
                className
            }
            ref={input}
        >
            {children}
        </select>
    );
});
