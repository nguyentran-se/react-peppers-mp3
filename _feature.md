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

## camelize

access_token -> accessToken

## case lạ

-  lazy load làm thay đổi thứ tự của useEffect
-  ví dụ:

```js
//Home.jsx
return <child />;
//bình thường thì child sẽ useEffect trước. nếu có lazy thì Home sẽ useEffect trước
```

## User change link nhanh khi đang call api

-  lúc này đag call api mà user change link thì component unmounted dẫn tới việc ngắt call api -> memory leak
-  giải quyết case này bằng cách `mountedRef=useRef(true)`, trong clean useEffect nếu unmounted thì set `mountedRef.current = false` để ngắt việc setState khi unmounted

## some hooks and cases in react-router

-  params: `/:id`
-  case: path: a/b/c/:slug
   -  location.pathname: a/b/c/someslug
   -  match.path: path in router
   -  match.url: = match.path. useful for

## lỗi findDomNode của CSSTransition

-  fix bằng cách gắn ref cho csstransition và cho first-child của nó. Việc này giúp nó tìm dom(findDom) nhanh hơn. ko bị predecated
-  ví dụ:
   `<CSSTransition noderef={someref}><FirstChild ref={someref}/></CSSTransition>`
-  [about-issue](https://github.com/reactjs/react-transition-group/issues/668)

## có nên bỏ layout trong routes files ?

-  Không. vì khi change route thì sẽ render lại layout luôn @@. ví như: header, sidebar

## flow make back - forward

-  `history.listen`: listen change url của browser
   -  `location.key`: unique key of element in stack url;
   -  `action`: PUSH: user click navigation, POP: user click back - forward
-  when action-push: disabled forward, enable back, save stack of locationKeys
-  when action-pop:
   if location.key === undefined. disable back
   if(locationKeys[lastItem] === presentKeyOfPage) disabled forward

## QUESTION: Case lạ về re-render

-  các child <Component> đều re-render. Thằng `{prop.children}` thì ko re-render???
-  Như trong case Home hay Cate đều ko re-render
