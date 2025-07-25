import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import LandingCounter from "../LandingCounter/LandingCounter";

import "./Landing.css";

export default function Landing({ info }) {

  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  const goToSearchPage = () => {
    navigate(`/search/${searchValue}`)
  }

  return (
    <section className="landing">
      <div className="container">
        <h1 className="landing__title">
          <Typewriter
            onInit={(typeWriter) => {
              typeWriter
                .typeString("در سایت ما کیفیت حرف اول را میزند")
                .start()
                .pauseFor(2000)
                .deleteAll()
                .typeString("فروشگاه دوره های آموزشی - ویووشاپ")
                .start()
                .pauseFor(2000);
            }}
            options={{
              loop: true,
            }}
          />
        </h1>
        <h2 className="landing__subtitle">
          با فروشگاه دوره های آموزشی ویووشاپ ، پیشرفت خودت رو تضمین کن
        </h2>
        <div className="landing__searchbar">
          <input
            type="text"
            className="landing__searchbar-input"
            placeholder="چه چیزی مد نظرته ؟ ..."
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <button className="landing__searchbar-btn" type="submit" onClick={goToSearchPage}>
            <i className="fas fa-search landing__searchbar-icon"></i>
          </button>
        </div>

      </div>
    </section>
  );
}
