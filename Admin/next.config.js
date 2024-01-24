/** @type {import('next').NextConfig} */
// module.exports = {
//   purge: {
//     content: [
//       './Components/**/*.{js,jsx,ts,tsx}', // Include your project files
//     ],
//     options: {
//       safelist: [
//         /Mui/, // Safelist MUI classes
//       ],
//     },
//   },
//   // Other Tailwind CSS configuration...
// };

const nextConfig = {};
module.exports = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.node = {
          fs: "empty",
        };
      }
  
      return config;
    },
    // Add other configurations from nextConfig if needed
  };
module.exports = nextConfig;
