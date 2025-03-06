const colors = {
    typography: '#000000',
    primary: '#1aba84',
    secondary: '#000',
    error: '#ff0000',
    background: '#ffffff',
    lightgrey: '#cccccc',
    lightprimary: (value: number = 0.1) => `rgba(26,186,132,${value})`
}
export const lightTheme = {
    colors,
    margins: {
        sm: 2,
        md: 4,
        lg: 8,
        xl: 12
    }
} as const

export const darkTheme = {
    colors: {
        ...colors,
        background: "#000000",

    },
    margins: {
        sm: 2,
        md: 4,
        lg: 8,
        xl: 12
    }
} as const

 // define other themes
