import React from "react";
import "@/styles/index-styles.css";

const SportsSelection = () => {
  return (
    <section className="sports-section">
      <div className="container-fluid sports-container">
        <div className="row g-0 row-1">
          <div className="col-4 grid-item hover-text">
          <p className="sports-text">欸欸欸！開團啦～</p></div>
          
        {/* 標題 */}
          <div className="col-4 grid-item title-box">
            <h2 className="sports-title">ㄟ咦!打球啦</h2>
            <p className="sports-subtitle ">選擇球類</p>
          </div>

          <div className="col-4 grid-item hover-text">
          <p className="sports-text">揪一波打起來</p></div>
        </div>

          {/* 選擇球類區域 */}
        <div className="row g-0 row-2">
          <div className="col-4 grid-item  basketball">
            <div className="sports-icon icon-Basketball"></div>
            <p className="sports-text">前往報團</p>
          </div>
          <div className="col-4 grid-item volleyball">
            <div className="sports-icon  icon-Volleyball"></div>
            <p className="sports-text">前往報團</p>
          </div>
          <div className="col-4 grid-item badminton">
            <div className="sports-icon icon-Badminton"></div>
            <p className="sports-text">前往報團</p>
          </div>
        </div>

        <div className="row g-0 row-3">
          <div className="col-4 grid-item hover-text">
          <p className="sports-text">三分線等你！</p></div>
          <div className="col-4 grid-item hover-text">
          <p className="sports-text">發球啦！</p></div>
          <div className="col-4 grid-item hover-text">
          <p className="sports-text">+1 +1</p></div>
        </div>
      </div>
    </section>
  );
};

export default SportsSelection;
