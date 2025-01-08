/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // 用于扫描 src 目录下的文件
    './docusaurus.config.js',
    './src/css/custom.css',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // 你可以调整这个颜色
          dark: '#2563EB', // 以及这个颜色
        },
      },
    },
  },
  corePlugins: {
    preflight: false, // 关闭 Tailwind 的全局样式重置
  },
  plugins: [],
}
