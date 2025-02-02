// @ts-check
 /** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const devConfig = {
    output:'export',
    assetPrefix: undefined,
}

const proConfig = {
    output:'export',
    assetPrefix: '/InterdimensialCable/' ,
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
}

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
      ...devConfig
    }
  }
  return {
    /* config options for all phases except development here */
    ...proConfig
  }
}

