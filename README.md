# Quill ImageResize Module

A module for Quill rich text editor to allow images to be resized. You can use it in Quill2.x or Quill1.3.7

Fork from [quill-image-resize-module](https://github.com/kensnyder/quill-image-resize-module). This module fix export problem. Your can use `import ImageResize from 'quill-image-resize-module-rebuild';` to your project.

Also add a default module `MinSize` and some options. Fix some display bug.

## Demo

[quill1.3.7](https://quill-modules.github.io/quill-image-resize-module/quill1.3.7/index.html)

[quill2.0.0](https://quill-modules.github.io/quill-image-resize-module/quill2.0.0/index.html)

## Usage

```sh
npm install quill-image-resize-module-rebuild
```

```javascript
import Quill from 'quill';
import ImageResize from 'quill-image-resize-module-rebuild';

const quill = new Quill(editor, {
  // ...
  modules: {
    // ...
    ImageResize: {
      modules: ['Resize', 'Toolbar', 'MinSize', 'DisplaySize'], // default
      // ...
    },
  },
});
```

If you want to pass the modules by youself. Please make sure `Resize` after `MinSize`, `DisplaySize` after `Resize` and `MinSize`. Otherwise, maybe have some wrong in display

#### `Resize` - Resize the image

Adds handles to the image's corners which can be dragged with the mouse to resize the image.

The look and feel can be controlled with options `handleStyles`

> `New option`

> When `freeAspectRatio` is true, the image is not limited by the original image scale.

```javascript
const quill = new Quill(editor, {
  // ...
  modules: {
    // ...
    ImageResize: {
      // ...
      handleStyles: {
        backgroundColor: 'black',
        border: 'none',
        color: white,
        // other camelCase styles for size display
      },
      freeAspectRatio: false, // default
    },
  },
});
```

> `New default module`

#### `MinSize` - The image min size

This module can handle the `Resize` module to change the size of the image, ensuring that the size is not less than option `minSize`

`minSize` option can be a number or an array of width and height. When `freeAspectRatio` is false, the min size will be calculated based on origin image aspect ratio and width of `minSize`

```javascript
const quill = new Quill(editor, {
  // ...
  modules: {
    // ...
    ImageResize: {
      // ...
      minSize: 48, // default. It is equal to minSize: [48, 48]
    },
  },
});
```

#### `Toolbar` - Image alignment tools

Displays a toolbar below the image, where the user can select an alignment for the image.

The look and feel can be controlled with options:

```javascript
const quill = new Quill(editor, {
  // ...
  modules: {
    // ...
    ImageResize: {
      // ...
      toolbarStyles: {
        backgroundColor: 'black',
        border: 'none',
        color: white,
        // other camelCase styles for size display
      },
      toolbarButtonStyles: {
        // ...
      },
      toolbarButtonSvgStyles: {
        // ...
      },
    },
  },
});
```

#### `DisplaySize` - Display pixel size

Shows the size of the image in pixels near the bottom right of the image.

Make sure `DisplaySize` import after `Resize`. Otherwise, the display size will be wrong.

The look and feel can be controlled with options:

```javascript
const quill = new Quill(editor, {
  // ...
  modules: {
    // ...
    ImageResize: {
      // ...
      displayStyles: {
        backgroundColor: 'black',
        border: 'none',
        color: white,
        // other camelCase styles for size display
      },
    },
  },
});
```

#### `BaseModule` - Include your own custom module

You can write your own module by extending the `BaseModule` class, and then including it in
the module setup.

For example,

```javascript
import { BaseModule, Resize } from 'quill-image-resize-module';

class MyModule extends BaseModule {
  // See src/modules/BaseModule.js for documentation on the various lifecycle callbacks
}

const quill = new Quill(editor, {
  // ...
  modules: {
    // ...
    ImageResize: {
      modules: [MyModule, Resize],
      // ...
    },
  },
});
```
