import React, { useEffect } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

function Cloud() {
  useEffect(() => {
    const data = [
      "모코코",
      "금강선",
      "10추글",
      "개발자",
      "간담회",
      "상금헌터",
      "일리아칸",
      "토끼아바타",
      "강선이형",
      "제인숙",
      "상하탑",
      "웃기네",
      "검은사막",
      "가지무침",
      "애니츠",
      "겜안분",
      "건슬링어",
      "아바타",
      "아크라시아",
      "아스몬",
      "비아키스",
      "도화가가",
      "베스칼",
      "포피셜",
      "개사기네",
      "에버그레이스",
      "젠더락",
      "도아가",
      "로아",
      "꼬우면",
      "미터기",
      "니나브",
      "터지고",
      "밤하늘수아",
      "도화가",
      "페스타",
      "비아키스",
      "로아페스타",
      "오레하",
      "스마게",
      "로스트아크",
      "노티드",
      "피규어",
      "라일라이",
      "망령회",
      "사사게",
      "5주년",
      "기상술사",
      "이토게",
      "더퍼스트",
      "눈가루",
    ];
    cloud()
      .size([500, 500])
      .words(
        data.map(function (d) {
          return { text: d, size: 10 + Math.random() * 90, test: "haha" };
        })
      )
      .padding(5)
      .rotate(function () {
        return ~~(Math.random() * 9) * 15 - 60;
      })
      .font("Impact")
      .fontSize(function (d) {
        console.log(d);
        return d.size;
      })
      .spiral("archimedean")
      .on("end", end)
      .start();

    function end(words) {
      d3.select("#word-cloud")
        .append("svg")
        .attr("width", 500)
        .attr("height", 500)
        // .style("border", "1px solid black")
        .append("g")
        .attr("transform", "translate(" + 500 / 2 + "," + 500 / 2 + ")")
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", function (d) {
          return d.size + "px";
        })
        .style("font-family", "Impact")
        .attr("text-anchor", "middle")
        .attr("transform", function (d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function (d) {
          return d.text;
        });
    }
  });

  return (
    <div>
      <h1>리뷰 분석 결과</h1>
      <div id="word-cloud"></div>
    </div>
  );
}

export default Cloud;
