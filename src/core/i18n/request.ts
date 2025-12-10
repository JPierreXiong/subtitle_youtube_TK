// src/core/i18n/request.ts

import { getRequestConfig } from 'next-intl/server';

// 这里定义默认语言（你可以改成 zh 或其他）

// src/core/i18n/request.ts (请将旧代码替换为以下内容)

// 定义一个默认语言（如果你的项目主要使用中文，可以改为 'zh'）
const DEFAULT_LOCALE = 'en';

export default getRequestConfig(async ({ locale }) => {
  // 如果 next-intl 找不到当前的 locale（理论上不会，但以防万一），使用默认语言
  const currentLocale = locale || DEFAULT_LOCALE;

  return {
    // 明确返回当前的 locale
    locale: currentLocale, 
    
    // 根据当前的 locale 动态导入对应的语言包文件
    // 假设你的语言包文件结构是 `./messages/en.json`, `./messages/zh.json` 等
    messages: (await import(`./messages/${currentLocale}.json`)).default,
  };
});

