import pandas as pd
import os
from kiwipiepy import Kiwi
from kiwipiepy.utils import Stopwords
import re


# 기존에 생성된 엑셀 파일 경로
existing_excel_path = "./doc/" + "title" + ".xlsx"

if os.path.exists(existing_excel_path):
    existing_data = pd.read_excel(existing_excel_path)
    existing_data.set_index("Unnamed: 0", inplace=True)

# print(existing_data)

kiwi = Kiwi()
stopwords = Stopwords()

stopwords.add([('안녕하세요','NNP')])
if(1):
    kiwi.add_user_word('킹받는','NNP')
    kiwi.add_user_word('서포터','NNP')
    kiwi.add_user_word('비아키스','NNP')
    kiwi.add_user_word('움짤','NNP')
    kiwi.add_user_word('피방','NNP')
    kiwi.add_user_word('0줄','NNP')
    kiwi.add_user_word('0빼기','NNP')
    kiwi.add_user_word('1등','NNP')
    kiwi.add_user_word('1화','NNP')
    kiwi.add_user_word('1관문','NNP')
    kiwi.add_user_word('1채','NNP')
    kiwi.add_user_word('D-1','NNP')
    kiwi.add_user_word('1편','NNP')
    kiwi.add_user_word('1분컷','NNP')
    kiwi.add_user_word('1시간','NNP')
    kiwi.add_user_word('1추','NNP')
    kiwi.add_user_word('1월','NNP')
    kiwi.add_user_word('top1','NNP')
    kiwi.add_user_word('1트','NNP')
    kiwi.add_user_word('1위','NNP')
    kiwi.add_user_word('1관','NNP')
    kiwi.add_user_word('병1신','NNP')
    kiwi.add_user_word('1넴','NNP')
    kiwi.add_user_word('1티어','NNP')
    kiwi.add_user_word('시1발련','NNP')
    kiwi.add_user_word('시1발','NNP')
    kiwi.add_user_word('T1','NNP')
    kiwi.add_user_word('t1','NNP')
    kiwi.add_user_word('1세트','NNP')
    kiwi.add_user_word('1원','NNP')
    kiwi.add_user_word('10만골','NNP')
    kiwi.add_user_word('10멸화','NNP')
    kiwi.add_user_word('10홍염','NNP')
    kiwi.add_user_word('10추','NNP')
    kiwi.add_user_word('10추글','NNP')
    kiwi.add_user_word('10멸','NNP')
    kiwi.add_user_word('10홍','NNP')
    kiwi.add_user_word('10멸홍','NNP')
    kiwi.add_user_word('10멸빵','NNP')
    kiwi.add_user_word('100일','NNP')
    kiwi.add_user_word('100시간','NNP')
    kiwi.add_user_word('100%','NNP')
    kiwi.add_user_word('100점','NNP')



db = []
for index,row in existing_data[1:].iterrows():
    title = row[0]
    date = row[1]

    pattern = re.compile(r'([^\w\s])((?:[가-힣a-zA-Z]))')
    normalized_sentence = re.sub(pattern, r'\1 \2', str(title))

    analysis = kiwi.tokenize(normalized_sentence, normalize_coda=True, stopwords=stopwords)
    for token in analysis:
        tmp = [token.form, token.tag, normalized_sentence, 1]
        db.append(tmp)

pdDB = pd.DataFrame(db)
pdDB.columns = ["형태소", "품사", "분류", "카운트"]

groupDB = pdDB.groupby(["형태소", "품사", "분류"])["카운트"].sum().reset_index()
groupDB.to_excel('형태소분석결과.xlsx', index=True)