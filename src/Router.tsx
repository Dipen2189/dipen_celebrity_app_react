/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layout/mainLayout';
import CelebrityViewComponent from './pages/CelebrityView/CelebrityView';

export default function Router() {
    return (
        <Routes>
            <Route
                path="/*"
                element={
                    <MainLayout>
                        <CelebrityViewComponent />
                    </MainLayout>
                }
            />
        </Routes>
    );
}
