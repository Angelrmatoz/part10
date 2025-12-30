import { Platform } from 'react-native';

const theme = {
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  colors: {
    primary: '#0366d6',
    textPrimary: '#24292e',
    mainBackground: '#e1e4e8',
  },
};

export default theme;