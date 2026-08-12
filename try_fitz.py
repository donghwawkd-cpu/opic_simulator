import fitz # PyMuPDF

pdf1 = r"c:\Users\SPPL_12\vibe_codinging\opic_simulator\엘리오픽.pdf"
pdf2 = r"c:\Users\SPPL_12\vibe_codinging\opic_simulator\오픽개념.pdf"

print("--- Testing PyMuPDF on PDF 1 ---")
doc1 = fitz.open(pdf1)
print("Page count 1:", len(doc1))
text1 = ""
for page in doc1:
    text1 += page.get_text()

print("Text 1 length:", len(text1))

print("--- Testing PyMuPDF on PDF 2 ---")
doc2 = fitz.open(pdf2)
print("Page count 2:", len(doc2))
text2 = ""
for page in doc2:
    text2 += page.get_text()

print("Text 2 length:", len(text2))

with open(r"c:\Users\SPPL_12\vibe_codinging\opic_simulator\fitz_text1.txt", "w", encoding="utf-8") as f:
    f.write(text1)

with open(r"c:\Users\SPPL_12\vibe_codinging\opic_simulator\fitz_text2.txt", "w", encoding="utf-8") as f:
    f.write(text2)

print("PyMuPDF Extraction Completed!")
