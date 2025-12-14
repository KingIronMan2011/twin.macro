<p align="center">
  <a href="https://github.com/KingIronMan2011/twin.macro#gh-light-mode-only" target="_blank">
    <img src="./.github/logo-light.svg" alt="Twin examples" width="199" height="70">
  </a>
  <a href="https://github.com/KingIronMan2011/twin.macro#gh-dark-mode-only" target="_blank">
    <img src="./.github/logo-dark.svg" alt="Twin examples" width="199" height="70">
  </a>
</p>

<p align="center">
    The <em>magic</em> of Tailwind with the <em>flexibility</em> of css-in-js.<br><br>
    <a href="https://www.npmjs.com/package/@kingironman2011/twin.marco"><img src="https://img.shields.io/npm/dt/@kingironman2011/twin.marco.svg" alt="Total Downloads"></a>
    <a href="https://www.npmjs.com/package/@kingironman2011/twin.marco"><img src="https://img.shields.io/npm/v/@kingironman2011/twin.marco.svg" alt="Latest Release"></a>
    <a href="https://discord.gg/Xj6x9z7"><img src="https://img.shields.io/discord/705884695400939552?label=discord&logo=discord" alt="Discord"></a>
    <br>
    <br>
    <a href="https://stackblitz.com/github/ben-rogerson/twin.examples/tree/master/vite-styled-components-typescript?file=src/App.tsx">
      <img
        alt="Open in StackBlitz"
        src="https://developer.stackblitz.com/img/open_in_stackblitz_small.svg"
      />
    </a>
</p>

> **Note**: This is a fork of [twin.macro](https://github.com/ben-rogerson/twin.macro) maintained by @KingIronMan2011. The package name is `@kingironman2011/twin.marco` and supports Tailwind CSS v3.3+ with v4 compatibility planned for a future release.

---

Style jsx elements using Tailwind classes:

```js
import '@kingironman2011/twin.marco'

const Input = () => <input tw="border hover:border-black" />
```

Nest Twin’s `tw` import within a css prop to add conditional styles:

```js
import tw from '@kingironman2011/twin.marco'

const Input = ({ hasHover }) => (
  <input css={[tw`border`, hasHover && tw`hover:border-black`]} />
)
```

Or mix sass styles with the css import:

```js
import tw, { css } from '@kingironman2011/twin.marco'

const hoverStyles = css`
  &:hover {
    border-color: black;
    ${tw`text-black`}
  }
`
const Input = ({ hasHover }) => (
  <input css={[tw`border`, hasHover && hoverStyles]} />
)
```

### Styled Components

You can also use the tw import to create and style new components:

```js
import tw from '@kingironman2011/twin.marco'

const Input = tw.input`border hover:border-black`
```

And clone and style existing components:

```js
const PurpleInput = tw(Input)`border-purple-500`
```

Switch to the styled import to add conditional styling:

```js
import tw, { styled } from '@kingironman2011/twin.marco'

const StyledInput = styled.input(({ hasBorder }) => [
  `color: black;`,
  hasBorder && tw`border-purple-500`,
])
const Input = () => <StyledInput hasBorder />
```

Or use backticks to mix with sass styles:

```js
import tw, { styled } from '@kingironman2011/twin.marco'

const StyledInput = styled.input`
  color: black;
  ${({ hasBorder }) => hasBorder && tw`border-purple-500`}
`
const Input = () => <StyledInput hasBorder />
```

## How it works

When babel runs over your javascript or typescript files at compile time, twin grabs your classes and converts them into css objects.
These css objects are then passed into your chosen css-in-js library without the need for an extra client-side bundle:

```js
import tw from '@kingironman2011/twin.marco'

tw`text-sm md:text-lg`

// ↓ ↓ ↓ ↓ ↓ ↓

{
  fontSize: '0.875rem',
  '@media (min-width: 768px)': {
    fontSize: '1.125rem',
  },
}
```

## Features

**👌 Simple imports** - Twin collapses imports from common styling libraries into a single import:

```diff
- import styled from '@emotion/styled'
- import css from '@emotion/react'
+ import { styled, css } from '@kingironman2011/twin.marco'
```

**🐹 Adds no size to your build** - Twin converts the classes you’ve used into css objects using Babel and then compiles away, leaving no runtime code

**🍱 Apply variants to multiple classes at once with variant groups**

```js
import '@kingironman2011/twin.marco'

const interactionStyles = () => (
  <div tw="hover:(text-black underline) focus:(text-blue-500 underline)" />
)

const mediaStyles = () => <div tw="sm:(w-4 mt-3) lg:(w-8 mt-6)" />

const pseudoElementStyles = () => <div tw="before:(block w-10 h-10 bg-black)" />

const stackedVariants = () => <div tw="sm:hover:(bg-black text-white)" />

const groupsInGroups = () => <div tw="sm:(bg-black hover:(bg-white w-10))" />
```

**🛎 Helpful suggestions for mistypings** - Twin chimes in with class and variant values from your Tailwind config:

```bash
✕ ml-1.25 was not found

Try one of these classes:

- ml-1.5 > 0.375rem
- ml-1 > 0.25rem
- ml-10 > 2.5rem
```

**🖌️ Use the theme import to add values from your tailwind config**

```js
import { css, theme } from '@kingironman2011/twin.marco'

const Input = () => <input css={css({ color: theme`colors.purple.500` })} />
```

See more examples [using the theme import →](https://github.com/ben-rogerson/twin.macro/pull/106)

**💡 Works with the official tailwind vscode plugin** - Avoid having to look up your classes with auto-completions straight from your Tailwind config - [setup instructions →](https://github.com/ben-rogerson/twin.macro/discussions/227)

**💥 Add !important to any class with a trailing or leading bang!**

```js
<div tw="hidden!" /> || <div tw="!hidden" />
// ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
<div css={{ "display": "none !important" }} />
```

Add !important to multiple classes with bracket groups:

```js
<div tw="(hidden ml-auto)!" />
// ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
<div css={{ "display": "none !important", "marginLeft": "auto !important" }} />
```

## Get started

Twin works with many modern stacks - take a look at these examples to get started:

### App build tools and libraries

- **Parcel**<br/>[styled-components](https://github.com/ben-rogerson/twin.examples/tree/master/react-styled-components) / [emotion](https://github.com/ben-rogerson/twin.examples/tree/master/react-emotion) / [emotion (ts)](https://github.com/ben-rogerson/twin.examples/tree/master/react-emotion-typescript)
- **Webpack**<br/>[styled-components (ts)](https://github.com/ben-rogerson/twin.examples/tree/master/webpack-styled-components-typescript) / [emotion (ts)](https://github.com/ben-rogerson/twin.examples/tree/master/webpack-emotion-typescript)
- **Preact**<br/>[styled-components](https://github.com/ben-rogerson/twin.examples/tree/master/preact-styled-components) / [emotion](https://github.com/ben-rogerson/twin.examples/tree/master/preact-emotion) / [goober](https://github.com/ben-rogerson/twin.examples/tree/master/preact-goober)
- **Create React App**<br/>[styled-components](https://github.com/ben-rogerson/twin.examples/tree/master/cra-styled-components) / [emotion](https://github.com/ben-rogerson/twin.examples/tree/master/cra-emotion)
- **Vite**<br/>[styled-components (ts)](https://github.com/ben-rogerson/twin.examples/tree/master/vite-styled-components-typescript) / [emotion (ts)](https://github.com/ben-rogerson/twin.examples/tree/master/vite-emotion-typescript) / [solid (ts)](https://github.com/ben-rogerson/twin.examples/tree/master/vite-solid-typescript)
- **Jest / React Testing Library**<br/>[styled-components (ts) / emotion (ts)](https://github.com/ben-rogerson/twin.examples/tree/master/jest-testing-typescript)

### Advanced frameworks

- **Next.js**<br/>[styled-components](https://github.com/ben-rogerson/twin.examples/tree/master/next-styled-components) / [styled-components (ts)](https://github.com/ben-rogerson/twin.examples/tree/master/next-styled-components-typescript) / [emotion](https://github.com/ben-rogerson/twin.examples/tree/master/next-emotion) / [emotion (ts)](https://github.com/ben-rogerson/twin.examples/tree/master/next-emotion-typescript) / [stitches (ts)](https://github.com/ben-rogerson/twin.examples/tree/master/next-stitches-typescript)
- **T3 App**<br/>[styled-components (ts)](https://github.com/ben-rogerson/twin.examples/tree/master/t3-styled-components-typescript) /
  [emotion (ts)](https://github.com/ben-rogerson/twin.examples/tree/master/t3-emotion-typescript)
- **Blitz.js**<br/>[emotion (ts)](https://github.com/ben-rogerson/twin.examples/tree/master/blitz-emotion-typescript)
- **Gatsby**<br/>[styled-components](https://github.com/ben-rogerson/twin.examples/tree/master/gatsby-styled-components) / [emotion](https://github.com/ben-rogerson/twin.examples/tree/master/gatsby-emotion)

### Component libraries

- **Storybook**<br/>[styled-components (ts)](https://github.com/ben-rogerson/twin.examples/tree/master/storybook-styled-components-typescript) / [emotion](https://github.com/ben-rogerson/twin.examples/tree/master/storybook-emotion) / [emotion (ts)](https://github.com/ben-rogerson/twin.examples/tree/master/storybook-emotion-typescript)
- **yarn/npm workspaces + Next.js + shared ui components**<br/>[styled-components](https://github.com/ben-rogerson/twin.examples/tree/master/component-library-styled-components)
- **Yarn workspaces + Rollup**<br/>[emotion](https://github.com/ben-rogerson/twin.examples/tree/master/component-library-emotion)
- [**HeadlessUI** (ts)](https://github.com/ben-rogerson/twin.examples/tree/master/headlessui-typescript)

## Community

[Drop into our Discord server](https://discord.gg/Xj6x9z7) for announcements, help and styling chat.

<a href="https://discord.gg/Xj6x9z7"><img src="https://img.shields.io/discord/705884695400939552?label=discord&logo=discord" alt="Discord"></a>

## Resources

- 🔥 [Docs: The prop styling guide](https://github.com/ben-rogerson/twin.macro/blob/master/docs/prop-styling-guide.md) - A must-read guide to level up on prop styling
- 🔥 [Docs: The styled component guide](https://github.com/ben-rogerson/twin.macro/blob/master/docs/styled-component-guide.md) - A must-read guide on getting productive with styled components
- [Docs: Options](https://github.com/ben-rogerson/twin.macro/blob/master/docs/options.md) - Learn about the features you can tweak via the twin config
- [Plugin: babel-plugin-twin](https://github.com/ben-rogerson/babel-plugin-twin) - Use the tw and css props without adding an import
- [Example: Advanced theming](https://github.com/ben-rogerson/twin.macro/blob/master/docs/advanced-theming.md) - Add custom theming the right way using css variables
- [Example: React + Tailwind breakpoint syncing](https://gist.github.com/ben-rogerson/b4b406dffcc18ae02f8a6c8c97bb58a8) - Sync your tailwind.config.js breakpoints with react
- [Helpers: Twin VSCode snippets](https://gist.github.com/ben-rogerson/c6b62508e63b3e3146350f685df2ddc9) - For devs who want to type less
- [Plugins: VSCode plugins](https://github.com/ben-rogerson/twin.macro/discussions/227) - VScode plugins that work with twin
- [Article: "Why I Love Tailwind" by Max Stoiber](https://mxstbr.com/thoughts/tailwind) - Max (inventor of styled-components) shares his thoughts on twin

## Special thanks

This project stemmed from [babel-plugin-tailwind-components](https://github.com/bradlc/babel-plugin-tailwind-components) so a big shout out goes to [Brad Cornes](https://github.com/bradlc) for the amazing work he produced. Styling with tailwind.macro has been such a pleasure.

---

[Consider donating some 🍕 if you enjoy!](https://www.buymeacoffee.com/benrogerson)
