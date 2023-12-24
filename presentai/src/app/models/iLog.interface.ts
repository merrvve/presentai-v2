/* clickId:
 * 1: share
 * 2: try
 * 3: submit
 * 4: view demo
 *
 * detailId:
 * 1: text-to-pptx-1
 * 2: text-to-pptx-2
 * 3: text-to-pptx-3
 * 4: extractPdf
 * 
 * 5: pubmed-abstracts
 * 6: bmac
 * 
 */

export interface iLog {
  clickId: number;
  detailId: number
  location: string;
}
