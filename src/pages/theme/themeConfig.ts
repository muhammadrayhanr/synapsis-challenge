// theme/themeConfig.ts
import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: '#000',
  },
  components: {
    Menu: {
      itemHoverBg: "#E5E5E5",
      itemSelectedBg: "#E5E5E5",
      itemSelectedColor: "#000",
      itemActiveBg: "#E5E5E5",
    },
  },
};

export default theme;
