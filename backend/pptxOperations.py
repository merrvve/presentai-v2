""" 
Ref for slide types: 
0 ->  title and subtitle
1 ->  title and content
        2 ->  section header
        3 ->  two content
        4 ->  Comparison
        5 ->  Title only 
        6 ->  Blank
        7 ->  Content with caption
        8 ->  Pic with caption
"""

from pptx import Presentation	

def create_pptx(slides,filename):
    if not slides:
        return False
    if not filename:
        return False
    prs = Presentation()

    slide1 = prs.slides.add_slide(prs.slide_layouts[0])
    title = slide1.shapes.title
    subtitle = slide1.placeholders[1]

    title.text = "Slides"
    subtitle.text = "Created by Presentai"

    for slide in slides:        
        new_slide=prs.slides.add_slide(prs.slide_layouts[1])
        new_slide.shapes.title.text=slide['title']
        new_slide.placeholders[1].text=slide['content']

    prs.save(filename)
    return True