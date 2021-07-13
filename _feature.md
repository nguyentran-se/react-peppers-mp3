# new features

## scss

-  [data-theme](https://dev.to/wendell_adriel/working-with-multiple-css-themes-5aej)
-  [scss-structure](https://dev.to/gedalyakrycer/ohsnap-sass-folder-structure-for-react-483e)
-  install `node-sass` để import đc scss
-  partials scss `_partial.scss` để sass ko generated into a css file
-  add `SASS_PATH=./node_modules;./src` vào `.env` để import ko cần `~`

## jsconfig relative import

```json
{
   "compilerOptions": {
      "module": "commonjs",
      "target": "es6",
      "baseUrl": "./src"
   },
   "include": ["src/**/*"]
}
```

## routes file

## normalize

`@import "~@csstools/normalize.css";`
