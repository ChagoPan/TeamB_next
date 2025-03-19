"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Styles from "./activity-list-detail.module.css";
import { AL_ITEM_GET } from "@/config/api-path";

export default function ActivityDetailPage() {
  const { al_id } = useParams();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    if (!al_id) return;
  
    const apiUrl = `${AL_ITEM_GET}/${al_id}`;
    console.log(`📢 正在請求 API: ${apiUrl}`); // 確保 fetch() 請求的 URL 是正確的
  
    fetch(apiUrl)
      .then(async (res) => {
        console.log(`✅ API 響應狀態: ${res.status}`);
  
        // 嘗試讀取回應內容
        const responseText = await res.text();
        console.log("📄 API 回應內容:", responseText); // 這裡會顯示 JSON 或錯誤 HTML
  
        try {
          return JSON.parse(responseText);
        } catch (error) {
          throw new Error("❌ API 回應的不是 JSON，可能是錯誤頁面");
        }
      })
      .then((data) => {
        console.log("📦 API 回傳資料:", data);
        if (data.success) {
          setActivity(data.data);
        } else {
          console.error("❌ API 內部錯誤:", data.error);
        }
      })
      .catch((error) => console.error("❌ fetch 錯誤:", error));
  }, [al_id]);
  
  if (!activity) {
    return <p className={Styles.loading}>載入中...</p>;
  }

  return (
    <div className={Styles.container}>
      <nav className={Styles.breadcrumb}>
        <a href="/activity-list" className={Styles.notActiveText}>
          回上一頁
        </a>
      </nav>
      <div className={Styles.imgContainer}>
        <img src="/public/photo/activity-shuttlecockCourt.jpg" alt="活動主圖" className={Styles.mainImage} /> 
      </div>
      <div className={Styles.eventInfo}>
        <h2 className={Styles.title}>{activity.activity_name}</h2>
        <p><strong>地點：</strong> {activity.court_name}</p>
        <p><strong>地址：</strong> {activity.address}</p>
        <p><strong>活動時間：</strong> {activity.activity_time}</p>
        <p><strong>報名期限：</strong> {activity.deadline}</p>
        <p><strong>費用：</strong> {activity.payment} 元</p>
        <p><strong>主辦：</strong> {activity.name}</p>
        <button className={Styles.registerBtn}>我要報名</button>
      </div>
    </div>
  );
}
