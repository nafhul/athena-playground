/** @type {import("@teambit/react.apps.react-app-types").ReactAppOptions} */
// /** @type {import("@teambit/cloud-providers.deployers.vercel").VercelOptions} */

// const { Vercel } = require('@teambit/cloud-providers.deployers.vercel');

// const vercelConfig = {
//   accessToken: process.env.VERCEL_AUTH_TOKEN,
//   teamId: 'my-team-id',
//   projectName: 'my-nextsjs-app',
//   // the deployer also supports vercel.json configuration, it can be an object or a path to a vercel.json file
//   vercelConfig: {
//     rewrites: [{ source: '/(.*)', destination: '/index.html' }],
//   },
// };

module.exports.default = {
  name: 'my-nextjs-app',
  // deploy: Vercel.deploy(vercelConfig),
};
