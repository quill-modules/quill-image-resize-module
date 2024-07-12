Quill.register({ 'modules/imageResize': ImageResize.default }, true);

var quill = new Quill('#editor', {
  theme: 'snow',
  modules: {
    imageResize: {
      modules: ['Resize', 'Toolbar', 'MinSize', 'DisplaySize'],
      minSize: [48, 90],
    },
  },
});
