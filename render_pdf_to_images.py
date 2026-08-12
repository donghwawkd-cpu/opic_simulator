import fitz
import os

out_dir = r"c:\Users\SPPL_12\vibe_codinging\opic_simulator\pdf_images"
os.makedirs(out_dir, exist_ok=True)

pdf1 = r"c:\Users\SPPL_12\vibe_codinging\opic_simulator\엘리오픽.pdf"
pdf2 = r"c:\Users\SPPL_12\vibe_codinging\opic_simulator\오픽개념.pdf"

doc1 = fitz.open(pdf1)
print(f"Rendering {len(doc1)} pages of Elio OPIC...")
for i, page in enumerate(doc1):
    pix = page.get_pixmap(dpi=150)
    pix.save(os.path.join(out_dir, f"elio_p{i+1}.png"))

doc2 = fitz.open(pdf2)
print(f"Rendering {len(doc2)} pages of OPIC Concept...")
for i, page in enumerate(doc2):
    pix = page.get_pixmap(dpi=150)
    pix.save(os.path.join(out_dir, f"concept_p{i+1}.png"))

print("All pages rendered to PNG!")
