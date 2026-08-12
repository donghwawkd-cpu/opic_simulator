with open(r"c:\Users\SPPL_12\vibe_codinging\opic_simulator\elio_opic.txt", "r", encoding="utf-8") as f:
    text_elio = f.read()

# Let's find pages with questions or scripts
import re
print("Length of Elio OPIC text:", len(text_elio))
print("Sample pages 10-15:")
print(text_elio[5000:15000])
