import { BaseModule } from './BaseModule';
import Quill from 'quill';
const icons = Quill.import('ui/icons');
const IconAlignLeft = icons.align[''];
const IconAlignCenter = icons.align['center'];
const IconAlignRight = icons.align['right'];

const Parchment = Quill.imports.parchment;
const AttributeClass = Parchment.Attributor.Style ? Parchment.Attributor.Style : Parchment.StyleAttributor;
const FloatStyle = new AttributeClass('float', 'float');
const MarginStyle = new AttributeClass('margin', 'margin');
const DisplayStyle = new AttributeClass('display', 'display');

export class Toolbar extends BaseModule {
  onCreate = () => {
    // Setup Toolbar
    this.toolbar = document.createElement('div');
    Object.assign(this.toolbar.style, this.options.toolbarStyles);
    this.overlay.appendChild(this.toolbar);

    // Setup Buttons
    this._defineAlignments();
    this._addToolbarButtons();
    // make sure init align right img not out of editor
    this.updatePosition();
  };

  // The toolbar and its children will be destroyed when the overlay is removed
  onDestroy = () => {};

  onUpdate = () => {
    this.updatePosition();
  };

  // make sure icon inside editor
  updatePosition = () => {
    const alignment = this.alignments.find((alignment) => alignment.isApplied(this.img));
    if (alignment && this.img.width < this.toolbar.getBoundingClientRect().width) {
      Object.assign(this.toolbar.style, alignment.boxStyle);
    } else {
      Object.assign(this.toolbar.style, {
        left: '0',
        right: '0',
      });
    }
  };
  _defineAlignments = () => {
    this.alignments = [
      {
        icon: IconAlignLeft,
        apply: () => {
          DisplayStyle.add(this.img, 'inline');
          FloatStyle.add(this.img, 'left');
          MarginStyle.add(this.img, '0 1em 1em 0');
        },
        isApplied: () => FloatStyle.value(this.img) == 'left',
        boxStyle: {
          left: '0',
          right: '0',
        },
      },
      {
        icon: IconAlignCenter,
        apply: () => {
          DisplayStyle.add(this.img, 'block');
          FloatStyle.remove(this.img);
          MarginStyle.add(this.img, 'auto');
        },
        isApplied: () => MarginStyle.value(this.img) == 'auto',
        boxStyle: {
          left: '0',
          right: '0',
        },
      },
      {
        icon: IconAlignRight,
        apply: () => {
          DisplayStyle.add(this.img, 'inline');
          FloatStyle.add(this.img, 'right');
          MarginStyle.add(this.img, '0 0 1em 1em');
        },
        isApplied: () => FloatStyle.value(this.img) == 'right',
        boxStyle: {
          left: null,
          right: '0',
        },
      },
    ];
  };

  _addToolbarButtons = () => {
    const buttons = [];
    this.alignments.forEach((alignment, idx) => {
      const button = document.createElement('span');
      buttons.push(button);
      button.innerHTML = alignment.icon;
      button.addEventListener('click', () => {
        // deselect all buttons
        buttons.forEach((button) => (button.style.filter = ''));
        if (alignment.isApplied()) {
          // If applied, unapply
          FloatStyle.remove(this.img);
          MarginStyle.remove(this.img);
          DisplayStyle.remove(this.img);
        } else {
          // otherwise, select button and apply
          this._selectButton(button);
          alignment.apply();
        }
        // image may change position; redraw drag handles
        this.requestUpdate();
      });
      Object.assign(button.style, this.options.toolbarButtonStyles);
      if (idx > 0) {
        button.style.borderLeftWidth = '0';
      }
      Object.assign(button.children[0].style, this.options.toolbarButtonSvgStyles);
      if (alignment.isApplied()) {
        // select button if previously applied
        this._selectButton(button);
      }
      this.toolbar.appendChild(button);
    });
  };

  _selectButton = (button) => {
    button.style.filter = 'invert(20%)';
  };
}
