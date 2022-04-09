## React + TypeScript UI Components

[![Intel](https://img.shields.io/badge/Intel-Core_i5_9600K-0071C5?style=flat&logo=intel&logoColor=white)](https://www.intel.com/content/www/us/en/products/sku/134896/intel-core-i59600k-processor-9m-cache-up-to-4-60-ghz/specifications.html)
[![Asrock](https://img.shields.io/badge/Z390M--ITX/ac-000.svg?style=flat&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAUCAMAAABMHminAAAAjVBMVEUAAACGwiaFwiaGwyeGwyaFwSaDwiaFwyaGwiaFwiWEwiaEwiaEwyeFwiaFwiaFwiaFwyaFwiaFwiaFwiaGwiWEwiaFwiWFwiaLyySFwiaGwiWDwCWFwiaFwiWFwiaFwiaGwiWGwiaDwx6GwiWFwyaFwiWFwiaFwiWFwiaMximFwyWEwyWHwCaFwiaFwiaMZ9zAAAAALnRSTlMAqowzIpkTqWVcn7VV+/iId+/nf0xDOywD80gN4dvXyaVUCNK/r5J6cwaDbRrDyeGVrgAAAe1JREFUOMvtk+lyozAMgBXABlPucBVycIYcrd//8VYyLpvOBDqz+7ffTGIP0vizkIBf/pOPe7Mjaij27k5jCr1xJwvWyDB+Vbui+8GRyBkeyr9UxrINHrCCg1GbNvk13ZbYUiPka4n0i58klsg3HSYmvu9P+O/iccLU1Cg5R1HkksXBvM6scg4Llpm13lVLOs/z+JbkjQ5R/4OUJ1gw0ErrESMpWE1AtnM792KMJWFoCcnaDUeO8cNNSRj+9h6SWqWS9GEYjhSvW1IkPpVbAqfkJ0npYDTYqmTAvMdcT4G5moOHEo3/ZlFkyJ1qT9coP+npmBacO/Sq+3cajq1CMrphN0u6NJYL3iIZa8DGxDmeNdm4UfNx1Y3X+BlscMaMSHfmBlxEhIHn9Sg5NTgPuNSYNVAVR0fNB+Uukvjo00WLdUdKWfUi+eKCT+fGCzrhMuILpNQGH/pkk9XTCHMbl89VR9nTSwYtsTRmdcQ5miWqNQkJDGHfqwBFPKFOPOpFArcDrqulCErnWvIdoSWmJP2F3pU7YFknDnmi2pD051CPMIXFWiH0DYTwSsJASzqJmCAOkggYXYlfYvntO5nUiL7G3DWMfajttHvCNnKAljF1uTt+LBZeKIuMu+Bf1zOdKWTMY4w5NKO4ZvDLP/IHwbpgg9Ud2r0AAAAASUVORK5CYII=&labelColor=333&label=Asrock&color=green)](https://www.asrock.com/mb/Intel/Z390M-ITXac/index.asp)
[![AMD](https://img.shields.io/badge/AMD-Radeon_RX_5500XT-ED1C24?style=flat&logo=amd&logoColor=white)](https://www.amd.com/en/products/graphics/amd-radeon-rx-5500-xt)
[![Dell](https://img.shields.io/badge/Dell-P2415Q-007DB8?style=flat&logo=dell&logoColor=white)](https://www.dell.com)

[![macOS](https://img.shields.io/badge/macOS-000000?style=flat&logo=apple&logoColor=white&color=2e118a)](https://www.apple.com/macos)
[![WebStorm](https://img.shields.io/badge/webstorm-143?style=flat&logo=webstorm)](https://jb.gg/OpenSourceSupport)
[![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)](https://git-scm.com/)
[![Sourcetree](https://img.shields.io/badge/Sourcetree-0052CC?style=flat&logo=Sourcetree&logoColor=white)](https://sourcetreeapp.com)
[![PNPM](https://img.shields.io/badge/pnpm-f9ad01.svg?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSI3Ni41OSA0NCAxNjQuMDA4IDE2NCIgd2lkdGg9IjE2MC4wMSIgaGVpZ2h0PSIxNjAiPjxkZWZzPjxwYXRoIGQ9Ik0yMzcuNiA5NWgtNTBWNDVoNTB2NTB6IiBpZD0iYSIvPjxwYXRoIGQ9Ik0xODIuNTkgOTVoLTUwVjQ1aDUwdjUweiIgaWQ9ImIiLz48cGF0aCBkPSJNMTI3LjU5IDk1aC01MFY0NWg1MHY1MHoiIGlkPSJjIi8+PHBhdGggZD0iTTIzNy42IDE1MGgtNTB2LTUwaDUwdjUweiIgaWQ9ImQiLz48cGF0aCBkPSJNMTgyLjU5IDE1MGgtNTB2LTUwaDUwdjUweiIgaWQ9ImUiLz48cGF0aCBkPSJNMTgyLjU5IDIwNWgtNTB2LTUwaDUwdjUweiIgaWQ9ImYiLz48cGF0aCBkPSJNMjM3LjYgMjA1aC01MHYtNTBoNTB2NTB6IiBpZD0iZyIvPjxwYXRoIGQ9Ik0xMjcuNTkgMjA1aC01MHYtNTBoNTB2NTB6IiBpZD0iaCIvPjwvZGVmcz48dXNlIHhsaW5rOmhyZWY9IiNhIiBmaWxsPSIjZjlhZDAwIi8+PHVzZSB4bGluazpocmVmPSIjYiIgZmlsbD0iI2Y5YWQwMCIvPjx1c2UgeGxpbms6aHJlZj0iI2MiIGZpbGw9IiNmOWFkMDAiLz48dXNlIHhsaW5rOmhyZWY9IiNkIiBmaWxsPSIjZjlhZDAwIi8+PHVzZSB4bGluazpocmVmPSIjZSIgZmlsbD0iIzRlNGU0ZSIvPjx1c2UgeGxpbms6aHJlZj0iI2YiIGZpbGw9IiM0ZTRlNGUiLz48dXNlIHhsaW5rOmhyZWY9IiNnIiBmaWxsPSIjNGU0ZTRlIi8+PHVzZSB4bGluazpocmVmPSIjaCIgZmlsbD0iIzRlNGU0ZSIvPjwvc3ZnPg==&logoColor=white)](https://pnpm.io)

[![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=flat&logo=babel&logoColor=white)](https://babeljs.io/)
[![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=flat&logo=Webpack&logoColor=white)](https://webpack.js.org)
[![ESLint](https://img.shields.io/badge/ESLint-3A33D1?style=flat&logo=eslint&logoColor=white)](https://eslint.org)
[![Prettier](https://img.shields.io/badge/Prettier-1A2C34?style=flat&logo=prettier&logoColor=F7BA3E)](https://prettier.io)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest&logoColor=white)](https://jestjs.io/)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com)
[![GitHub license](https://img.shields.io/github/license/huijiewei/agile-ui)](https://github.com/huijiewei/agile-ui)
[![GitHub issues](https://img.shields.io/github/issues/huijiewei/agile-ui)](https://GitHub.com/huijiewei/agile-ui/issues)

### 特点

### 安装

```bash
pnpm install
```
