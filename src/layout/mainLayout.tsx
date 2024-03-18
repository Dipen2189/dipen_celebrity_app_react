/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
export default function MainLayout({ children }: any) {
    return (
        <>
            <div className="wrapper">
                <main>{children}</main>
            </div>
        </>
    );
}
