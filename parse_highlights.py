import re

with open(r"c:\Users\SPPL_12\vibe_codinging\opic_simulator\opic_concept.txt", "r", encoding="utf-8") as f:
    text_concept = f.read()

with open(r"c:\Users\SPPL_12\vibe_codinging\opic_simulator\elio_opic.txt", "r", encoding="utf-8") as f:
    text_elio = f.read()

print("--- CONCEPT PDF HIGHLIGHTS ---")
print(text_concept[:3000])

print("\n--- ELIO OPIC HIGHLIGHTS ---")
print(text_elio[:3000])
