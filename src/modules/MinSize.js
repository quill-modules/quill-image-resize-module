import Quill from 'quill';
import { BaseModule } from './BaseModule';

export default class MinSize extends BaseModule {
  onCreate = () => {
    this.resolveOptions();
  };

  onUpdate = () => {
    const blot = Quill.find(this.img);
    if (blot) {
      let resize = false;
      if (this.img.width < this.options.minSize[0]) {
        this.img.width = this.options.minSize[0];
        this.overlay.style.width = `${this.img.width}px`;
        this.overlay.style.height = `${this.img.height}px`;
        resize = true;
      }
      if (this.img.height < this.options.minSize[1]) {
        this.img.height = this.options.minSize[1];
        this.overlay.style.width = `${this.img.width}px`;
        this.overlay.style.height = `${this.img.height}px`;
        resize = true;
      }
      resize && this.resizer.repositionElements();
    }
    else {
      this.resizer.hide();
    }
  };

  resolveOptions = () => {
    if (!this.options.minSize || Number.isNaN(this.options.minSize)) {
      this.options.minSize = 48;
    }
    if (!Array.isArray(this.options.minSize)) {
      this.options.minSize = [this.options.minSize, this.options.minSize];
    }
    // aspect ratio is calculated based on width
    if (!this.options.freeAspectRatio) {
      const aspectRatio = this.img.naturalWidth / this.img.naturalHeight;
      // const minWidth = this.options.minSize[1] / aspectRatio;
      const minHeight = this.options.minSize[0] / aspectRatio;

      this.options.minSize = [this.options.minSize[0], minHeight];
    }
  };
}
