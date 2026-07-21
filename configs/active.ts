// The ONE line that changes per client repo. Everything else in the codebase
// imports `activeConfig` from here and never touches a specific config file
// directly — so cloning this repo for a new client is: copy _demo.config.ts
// to <new-client>.config.ts, fill it in, then change this one export.

export { sitesByEdConfig as activeConfig } from './sitesbyed.config'
