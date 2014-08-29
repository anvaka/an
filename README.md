# Angular + npm

I think both angular and npm are two most amazing things created in javascript world. Since angular has decided to implement their own module system it reduced potential code reuse opportunities. Many angular factories/services are not specific to angular and can live on npm.

This is an attempt to show how to share angular modules on npm, and use npm modules from angular directives. It may look rough at edges, but I hope we can level it with your help.

# "Old" workflow

Let's say we need a typeahead control from angular-ui bootstrap. How do we start using it?

1. Go to http://angular-ui.github.io/bootstrap/
2. Click "Create Build" and choose "Typeahead"
3. Download the build, unpack the archive and put it into your project folder
4. Edit `*.html` file to include `ui-bootstrap-custom-tpls-*.js` file;
5. Edit `*.js` file to include 'ui.bootstrap' as a dependency of your main module.

Things get worse when you want to update typeahead directive, or decide that you need typeahead plus something else. Maybe I'm missing something and there is an easier way to get this done? Please let me know. 

# "New" workflow

Wouldn't it be nicer if we could do:

1. `npm install typeahead`
2. Use it.

This is the purpose of `an`. And here is a prove of concept: [address typeahead demo](http://anvaka.github.io/typeahead.demo/), where typeahead is actually an [npm package](https://github.com/anvaka/typeahead.an).

# How?

The idea is simple: avoid using `angular.module` in npm package, and delay directives registration up to the point when application is bootstrapped.

E.g. instead of doing:

``` js
  var myModule = angular.module(???, []);
  myModule.directive(???, function myDirective() {/* */});
```

Do:

``` js
  require('an').directive(function myDirective() {});
```

When you ready to bootstrap application, collect all directives and register them in your main application module:

``` js
  require('an').flush();
```


# Drawbacks

This approach is still not perfect and requires certain discipline to not forget register your directives via `an`. I can also see potential problems with names collision, versioning (especially when `an` itself is updated). This module is [really simple](https://github.com/anvaka/an/blob/master/index.js) at the moment, and maybe there is a better way of sharing angular directives on npm. Please let me know.

# install

With [npm](https://npmjs.org) do:

```
npm install an
```

# license

MIT
