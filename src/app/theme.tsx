'use client'

import { Theme, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import React from "react";

export function ThemeWrapper(props: { children: React.ReactNode }) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {noSsr: true});
    
    const colorTheme = React.useMemo(
        () =>
        createTheme({
            palette: {
                mode: 'dark',//prefersDarkMode ? 'dark' : 'light',
            },
        }),
        [prefersDarkMode],
    );
        
    return (
        <ThemeProvider theme={colorTheme}>
        <div>
            {props.children}
        </div>
        </ThemeProvider>
    );
    
}
