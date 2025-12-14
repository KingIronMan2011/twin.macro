# Changelog

## [4.0.0] - 2025-12-14

### Changed
- **BREAKING**: Package renamed from `twin.macro` to `@kingironman2011/twin.marco`
- Updated package metadata to reflect new maintainer (@KingIronMan2011)
- Updated peerDependencies to support Tailwind CSS v3.3+ and v4 (^3.3.1 || ^4.0.0)
- Updated all documentation and examples to use new package name

### Notes
- This is a fork of the original [twin.macro](https://github.com/ben-rogerson/twin.macro) project
- Currently fully compatible with Tailwind CSS v3.3+ 
- Tailwind CSS v4 compatibility is declared in peerDependencies but requires additional implementation work
  - v4 has a completely rewritten internal API that twin.macro currently depends on
  - Full v4 support will require refactoring core functionality to use the new `compile` and `__unstable__loadDesignSystem` APIs
- Some test snapshots may need updating due to Tailwind CSS v3.4 output changes (added gradient position variables, contain variables, and updated [hidden] selector)

### Migration Guide

To migrate from `twin.macro` to `@kingironman2011/twin.marco`:

1. Update your package.json:
```json
{
  "dependencies": {
    "@kingironman2011/twin.marco": "^4.0.0"
  }
}
```

2. Update your imports:
```js
// Before
import tw from 'twin.macro'

// After
import tw from '@kingironman2011/twin.marco'
```

3. Update your babel-plugin-macros configuration if using a custom twin config name (the configName remains 'twin').
