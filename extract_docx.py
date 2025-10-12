import io
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import sys

try:
    import docx
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "python-docx"])
    import docx

from docx import Document

doc = Document('Team PlusTwo 18ISC_Submission.docx')

full_text = []
for para in doc.paragraphs:
    full_text.append(para.text)

print('\n'.join(full_text))