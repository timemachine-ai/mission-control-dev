/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: COOP/COEP headers will be added back when Remotion is integrated.
  // Currently disabled because Firefox doesn't support credentialless iframes,
  // which breaks Sandpack's connection to codesandbox.io bundler.
  // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1863531
};

export default nextConfig;
