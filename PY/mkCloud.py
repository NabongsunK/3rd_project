from wordcloud import WordCloud
import matplotlib.pyplot as plt
import pandas as pd
from konlpy.tag import Okt
import pandas as pd
from matplotlib import font_manager, rc
import nltk
from datetime import datetime, timedelta
from datetime import date


def add_days_to_date(date_text, days_to_add):
    # 입력된 날짜 텍스트를 날짜 객체로 변환
    date_object = datetime.strptime(date_text, '%m-%d')

    # 날짜에 지정된 일 수를 더함
    new_date = date_object + timedelta(days=days_to_add)

    # 새로운 날짜를 원하는 형식의 문자열로 변환하여 반환
    new_date_text = new_date.strftime('%m-%d')
    return new_date_text

font_path = "C:/Windows/Fonts/NGULIM.TTF"
font = font_manager.FontProperties(fname=font_path).get_name()
rc('font', family=font)

okt = Okt()

today = str(date.today()).replace(str(date.today().year) + "-", "")

# 엑셀 파일 불러오기
path = "htmlPr/"+today+".xlsx"
ex_datas = pd.read_excel(path, index_col=0).transpose().astype(str)


# 텍스트 데이터 결합

rep = ["코코","금강","추글","개발","간담","헌터","리아","토끼","이형","인숙",
				"상하","웃기","검사","가지","애니","겜안","슬링","바타","아크라","아스"
				,"키스","가가","베스","포피","기네","그레이스","더락","도아","로스","꼬우"
				,"미터","니나","지고","수아","도화","페스","비아","로아페","오레","스마"
				,"로스트","노티","규어","라이","망령","사사","주년","술사","이토","퍼스트",
				"가루"]
cha = ["모코코","금강선","10추글","개발자","간담회","상금헌터","일리아칸","토끼아바타","강선이형","제인숙",
				"상하탑","웃기네","검은사막","가지무침","애니츠","겜안분","건슬링어","아바타","아크라시아","아스몬"
				,"비아키스","도화가가","베스칼","포피셜","개사기네","에버그레이스","젠더락","도아가","로아","꼬우면"
				,"미터기","니나브","터지고","밤하늘수아","도화가","페스타","비아키스","로아페스타","오레하","스마게"
				,"로스트아크","노티드","피규어","라일라이","망령회","사사게","5주년","기상술사","이토게","더퍼스트"
				,"눈가루"]


for ex_i in ex_datas:
# ex_i = "07-01"
	tokens_ko = ex_datas[ex_i]
	ko = nltk.Text(tokens_ko)

	data = ko.vocab().most_common(40)
	tmp_data = dict(data)
	if('nan' in tmp_data):
		del tmp_data['nan']
	for i in range(len(rep)):
		if rep[i] in tmp_data:
			tmp_data[cha[i]] = tmp_data[rep[i]]
			del tmp_data[rep[i]]

	
	wordcloud= WordCloud(
			font_path = 'C:/Windows/Fonts/NGULIM.TTF',
			relative_scaling = 0.2,
			background_color = 'white').generate_from_frequencies(tmp_data)

	plt.figure(figsize=(10,8))
	plt.imshow(wordcloud)
	plt.title(ex_i+"~"+add_days_to_date(ex_i,4), fontsize=25)
	plt.axis("off")
	# savefig_default.png
	plt.savefig('img'+'1219'+'/'+ex_i+'.png')
	plt.close()

