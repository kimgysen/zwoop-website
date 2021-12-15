
import { extendTheme } from "@chakra-ui/react";
import colors from './colors';
import styles from './styles';


const theme = extendTheme({
    initialColorMode: "light",
    useSystemColorMode: false,
    styles,
    colors,
    components: {
        Button: { baseStyle: { _focus: { boxShadow: 'none' } } }
    }
});

export default theme;
