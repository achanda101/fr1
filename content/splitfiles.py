import pandas as pd
import os
from os import listdir
from os.path import isfile, join
mypath = "C:\\Users\\nipun\\Desktop\\fr1-old\\fr1\\content\\raw\\hindi\\"
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]


for file in onlyfiles:
    xl = pd.ExcelFile(mypath+file)
    print(mypath+file)
    print(os.path.splitext(mypath+file)[0])
    print(xl.sheet_names)
    for sheet in xl.sheet_names:
         df = pd.read_excel(xl,sheet_name=sheet)
         if sheet == "Information cards":
            df.to_excel((os.path.splitext(mypath+file)[0])+'-ic'+'.xlsx',index=False)
         elif sheet == "Timeline":
            df.to_excel((os.path.splitext(mypath+file)[0])+'-tl'+'.xlsx',index=False)
         elif sheet == "Introduction":
            df.to_excel((os.path.splitext(mypath+file)[0])+'-intro'+'.xlsx',index=False)
