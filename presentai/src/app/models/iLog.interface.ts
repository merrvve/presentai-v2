/* clickId:
 * 1: share
 * 2: try
 * 3: submit
 * 4: view demo
 *
 * detailId:
 * 1: extractPdf
 * 2: text-to-pptx-1
 * 3: text-to-pptx-2
 * 4: text-to-pptx-3
 * 5: pubmed-abstracts
 * 6: bmac
 * 
 */

export interface iLog {
  clickId: number;
  detailId: number
  location: string;
}
