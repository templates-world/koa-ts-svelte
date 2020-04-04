# koa-ts-svelte

This is a project template for [Koa](https://koajs.com), [Typescript](https://www.typescriptlang.org) and [Svelte](https://svelte.dev) apps. It lives at https://github.com/Olyno/koa-ts-svelte.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit Olyno/koa-ts-svelte project-name
cd project-name
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*


## Get started

Install the dependencies...

```bash
cd project-name
npm install # Or use yarn
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

The url [localhost:3000](http://localhost:3000) will be automatically open in your browser. You should see your app running. Edit a file in `src`, save it, and see your changes in the browser.

The port of the website can be changed inside the ``.env`` file.


## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

Builds should support IE11 using [buble](https://github.com/bublejs/buble).


## Deploying to the web

### With [now](https://zeit.co/now)

Install `now` if you haven't already:

```bash
npm install -g now
```

Then, from within your project folder:

```bash
cd public
now deploy --name my-project
```

As an alternative, use the [Now desktop client](https://zeit.co/download) and simply drag the unzipped project folder to the taskbar icon.

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```
