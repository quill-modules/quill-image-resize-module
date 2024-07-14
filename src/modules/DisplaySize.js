import { BaseModule } from './BaseModule';

export class DisplaySize extends BaseModule {
  onCreate = () => {
    // Create the container to hold the size display
    this.display = document.createElement('div');

    // Apply styles
    Object.assign(this.display.style, this.options.displayStyles);

    // Attach it
    this.overlay.appendChild(this.display);
  };

  onDestroy = () => {};

  onUpdate = () => {
    if (!this.display || !this.img) {
      return;
    }

    const size = this.getCurrentSize();
    this.display.innerHTML = size.join(' &times; ');
    if (size[0] > 120 && size[1] > 40) {
      // position on top of image
      Object.assign(this.display.style, {
        right: '4px',
        bottom: '4px',
        left: null,
        transform: null,
      });
    }
    else if (this.img.style.float === 'right') {
      // position off bottom left
      Object.assign(this.display.style, {
        right: null,
        bottom: null,
        transform: `translate(calc(-100% - 4px), ${this.img.height}px)`,
      });
    }
    else {
      // position off bottom right
      Object.assign(this.display.style, {
        left: null,
        bottom: null,
        transform: `translate(calc(100% + 4px), ${this.img.height}px)`,
      });
    }
  };

  getCurrentSize = () => [this.img.width, this.img.height];
}
