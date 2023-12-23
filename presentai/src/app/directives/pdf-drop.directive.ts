import { Directive, HostListener, EventEmitter, Output, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPdfDrop]'
})
export class PdfDropDirective {
  @Output() fileDropped = new EventEmitter<File>();

  constructor(private el: ElementRef) {}

  @HostListener('dragover', ['$event']) public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.el.nativeElement.classList.add('drag-over');
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.el.nativeElement.classList.remove('drag-over');
  }

  @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.el.nativeElement.classList.remove('drag-over');
    
    const files = evt.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf') {
        this.fileDropped.emit(file);
      }
    }
  }

  @HostListener('change', ['$event.target.files']) public onChange(files: FileList) {
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf') {
        this.fileDropped.emit(file);
      }
    }
  }
}
