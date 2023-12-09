import { Injectable } from '@angular/core';
import { iTool } from '../models/iTool.interface';

@Injectable({
  providedIn: 'root'
})
export class ToolsServiceService {
  public tools: iTool[] = [
    { id: 1, title: 'PDF Text and Image Extraction Tool', description: 'Extract text and images from PDF files easily, fast and free.', limits: 'Max 10 Mb file size', usage:'Free', link:'extract-pdf' },
    { id: 2, title: 'Text to .pptx Convertion Tool', description: 'We include three types of text to .pptx convertion tools.', limits: 'Max 20 Mb file size', usage: 'Free, Paid (Automated version with ChatGPT)', link: 'text-to-pptx' },
    { id: 3, title: 'Pubmed Batch Abstract Tool', description: 'Download article abstracts from Pubmed in a structured table.', limits: 'Max 20 Mb file size', usage: 'Free', link: 'pubmed-abstracts' },
    { id: 4, title: 'Coming Soon', description: '', limits: '', usage: '', link: '' },
    { id: 4, title: 'Coming Soon', description: '', limits: '', usage: '', link: '' },
    { id: 4, title: 'Coming Soon', description: '', limits: '', usage: '', link: '' },
    { id: 4, title: 'Coming Soon', description: '', limits: '', usage: '', link: '' },
  ]
  constructor() { }
}
