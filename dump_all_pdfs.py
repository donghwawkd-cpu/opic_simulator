import pypdf

def dump_full_pdf(path, out_txt):
    reader = pypdf.PdfReader(path)
    full_text = ""
    for i, page in enumerate(reader.pages):
        full_text += f"\n================ PAGE {i+1} ================\n"
        full_text += page.extract_text() or ""
    with open(out_txt, "w", encoding="utf-8") as f:
        f.write(full_text)
    print(f"Saved {len(reader.pages)} pages to {out_txt}")

dump_full_pdf(r"c:\Users\SPPL_12\vibe_codinging\opic_simulator\엘리오픽.pdf", r"c:\Users\SPPL_12\vibe_codinging\opic_simulator\elio_opic.txt")
dump_full_pdf(r"c:\Users\SPPL_12\vibe_codinging\opic_simulator\오픽개념.pdf", r"c:\Users\SPPL_12\vibe_codinging\opic_simulator\opic_concept.txt")
