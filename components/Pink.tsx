import React from 'react';

const Pink = () => {
    return (
        <div className="relative">
            <div className="absolute -left-4 top-1">
                <span className="flex size-[11px]">
                    <span className="inline-flex absolute h-full w-full rounded-full animate-ping bg-primary opacity-75"></span>
                    <span className="relative inline-flex size-[11px] rounded-full bg-primary"></span>
                </span>
            </div>
        </div>
    );
};

export default Pink;
