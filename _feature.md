# new features

## scss

-  [data-theme](https://dev.to/wendell_adriel/working-with-multiple-css-themes-5aej)
-  [scss-structure](https://dev.to/gedalyakrycer/ohsnap-sass-folder-structure-for-react-483e)
-  install `node-sass` để import đc scss
-  partials scss `_partial.scss` để sass ko generated into a css file.
-  Khi add partial vào `index.scss` thì các file scss khác đc dùng ngoại trừ `variable - mixins` chỉ có partial đc dùng(với điều kiện là các file này phải nằm trên nha). file scss khác dùng phải import
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

## normalize

`@import "~@csstools/normalize.css";`

## routes file. Thường đi với 2 files: PublicLayout, PublicRoute

-  PublicLayout: chứa layout
-  PublicRoute: bọc layout với route
-  PublicRoute(C) bọc PublicLayout(C) bọc C

```js
const routes = [
   {
      path: "/",
      exact: true,
      layout: PublicLayout,
      component: Home,
   },...
];
```

## padding hack

> dựa vào nếu cha và con ko có position gì hết. thì sẽ là quan hệ cha con bình thường nên khi set `cha height: 0px -> con height: 0px`. Khi có position(relative - absolute) thì con sẽ dựa vào `height thực của cha`(tức là có thể là padding) -> Rút ra được 1 trick (parent-child vs relative-absolute)

-  padding theo công thức `ratio = height / width * 100%`

-  [padding-bottom-hack](https://www.smashingmagazine.com/2013/09/responsive-images-performance-problem-case-study/#the-padding-bottom-hack)
-  [ratio](https://css-tricks.com/aspect-ratio-boxes/)

## postion fixed must with height 100%

## lấy relative bọc fixed để không phải margin.

-  ví dụ như sidebar fixed, main ko cần phải `margin-left: $width-sidebar`
-  Giúp content flexible hơn
