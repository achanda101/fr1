#!/usr/bin/env python
# coding: utf-8

import pandas as pd
import re
import os
from os import listdir
from os.path import isfile, join
mypath = "C:\\Users\\nipun\\Desktop\\git-projects\\fr1\\content\\newcontent\\english\\"
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]

for file in onlyfiles:
    df = pd.read_excel(mypath+file)
    df.head(10)
    with open('C:\\Users\\nipun\\Desktop\\git-projects\\fr1\\content\\terms.txt') as filed:
        lines = filed.readlines()
        lines = [line.rstrip() for line in lines]


    def findTextAndReplace(term, string):
        if term in string:
            # print("========")
            string = re.sub(r"\b%s\b" % term, "<span class=\"idef\" data-idef=\"" +
                            term.lower()+"\">"+term.lower()+"</span>", string)
            return string
        elif term.lower() in string:
            string = re.sub(r"\b%s\b" % term.lower(), "<span class=\"idef\" data-idef=\"" +
                            term.lower()+"\">"+term.lower()+"</span>", string)
    #         string.replace(term, "<span class=\"idef\" data-idef=\""+term.capitalize()+"\">"+term.capitalize()+"</span>")
            return string
        elif term.capitalize() in string:
            string = re.sub(r"\b%s\b" % term.capitalize(), "<span class=\"idef\" data-idef=\"" +
                            term.lower()+"\">"+term.lower()+"</span>", string)
    #         string.replace(term.capitalize(), "<span class=\"idef\" data-idef=\""+term.capitalize()+"\">"+term.capitalize()+"</span>")
            return string
        else:
            return string


    def updateDf(df, listOfWords):
        for word in listOfWords:
            df['Description'] = df['Description'].apply(
                lambda x: findTextAndReplace(word, str(x)))
        return df


    df_new = updateDf(df, lines)
    df_new.to_excel(mypath+"\\testcontent\\"+file, sheet_name='Timeline', index=True)
