/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
export default function MainLayout({ children }: any) {
    return (
        <>
            {/* wrapper start */}
            <div className="wrapper">
                {/* header */}
                {/* main start */}
                <main>
                    {/* <div className="top-bar">
                            <Typography variant="h1">Dashboard</Typography>
                        </div>
                        <Card className="main">{children}</Card> */}
                    {children}
                </main>
            </div>
            {/* wrapper end */}
        </>
    );
}
