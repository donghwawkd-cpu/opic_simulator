import pypdf
import os

pdf1 = r"c:\Users\SPPL_12\vibe_codinging\opic_simulator\엘리오픽.pdf"
pdf2 = r"c:\Users\SPPL_12\vibe_codinging\opic_simulator\오픽개념.pdf"

print("--- Reading PDF 1: 엘리오픽.pdf ---")
reader1 = pypdf.PdfReader(pdf1)
print("Total pages in PDF 1:", len(reader1.pages))
text1 = ""
for i, page in enumerate(reader1.pages[:20]): # read first 20 pages
    text1 += f"=== Page {i+1} ===\n" + page.extract_text() + "\n"

with open(r"c:\Users\SPPL_12\vibe_codinging\opic_simulator\pdf1_text.txt", "w", encoding="utf-8") as f:
    f.write(text1)

print("--- Reading PDF 2: 오픽개념.pdf ---")
reader2 = pypdf.PdfReader(pdf2)
print("Total pages in PDF 2:", len(reader2.pages))
text2 = ""
for i, page in enumerate(reader2.pages[:20]): # read first 20 pages
    text2 += f"=== Page {i+1} ===\n" + page.extract_text() + "\n"

with open(r"c:\Users\SPPL_12\vibe_codinging\opic_simulator\pdf2_text.txt", "w", encoding="utf-8") as f:
    f.write(text2)

print("PDF extraction done!")
