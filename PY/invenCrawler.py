from bs4 import BeautifulSoup as bs
import requests
import datetime
import pandas as pd
import os


today = datetime.date.today()
cur_year = today.year
cur_time = datetime.datetime.now().time()

isYesterday = False

# 기존에 생성된 엑셀 파일 경로
existing_excel_path = "./doc/" + "title" + ".xlsx"

# 만약 파일이 존재한다면, 가장 최근의 날짜를 확인
if os.path.exists(existing_excel_path):
    existing_data = pd.read_excel(existing_excel_path)
    existing_data.set_index("Unnamed: 0", inplace=True)
    latest_title = existing_data['제목'].iloc[0]  # 가장 최신 데이터의 제목
    latest_date = existing_data['날짜'].iloc[0]
    latest_date = datetime.datetime.strptime(latest_date, "%Y-%m-%d").date()
else:
    latest_date = today
    latest_title = None

db = []
for i in range(1, 4):
    url = "https://www.inven.co.kr/board/lostark/4811?my=chu&p="+str(i)
    response = requests.get(url)
    source = response.text
    soup = bs(source, "html.parser")
    posts = soup.select("#new-board > form > div > table > tbody > tr")
    for post in posts:
        title = post.select_one("td.tit a").contents[2].strip()
        date = post.select_one("td.date").text
        url = post.select_one("a.subject-link")['href']
        rank = int(post.select_one("td.view").text.replace(",","")) * int(post.select_one("td.reco").text.replace(",",""))
        
        if ':' in date:
            if isYesterday:
                date = today
                date = date.strftime('%Y-%m-%d')
            else:
                time_obj = datetime.datetime.strptime(date, "%H:%M").time()
                if cur_time >= time_obj:
                    cur_time = time_obj
                else:
                    today = today - datetime.timedelta(days=1)
                    isYesterday = True
                date = today
                date = date.strftime('%Y-%m-%d')
        else:
            newdate = f"{cur_year}-{date}"
            date_obj = datetime.datetime.strptime(newdate, "%Y-%m-%d").date()
            if today < date_obj:
                today = today.replace(year=today.year - 1)
                cur_year -=1
            today = date_obj
            date = f"{cur_year}-{date}"

        # 중복된 데이터인지 확인
        post_date = datetime.datetime.strptime(date, "%Y-%m-%d").date()
        if post_date <= latest_date and title == latest_title:
            # 이미 기존에 수집된 데이터와 중복됨
            print("데이터 수집을 중단합니다. 이미 가장 최신 데이터를 수집했습니다.")
            break
        db.append([title, date, url, rank])
    else:
        continue
    break  # 이중 루프를 빠져나가기 위해

data = pd.DataFrame(db, columns=['제목', '날짜', 'url', 'rank'])
if os.path.exists(existing_excel_path):
    all_data = pd.concat([existing_data, data], ignore_index=True)
    all_data.iloc[0] = data.iloc[0]
    all_data.to_excel(existing_excel_path, index=True)  # 인덱스 포함하여 엑셀 파일 저장
else:
    empty_data = pd.DataFrame([db[0]], columns=['제목', '날짜', 'url', 'rank'])
    all_data = pd.concat([empty_data, data], ignore_index=True)
    all_data.to_excel(existing_excel_path, index=True)  # 인덱스 포함하여 엑셀 파일 저장



