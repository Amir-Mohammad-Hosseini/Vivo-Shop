import React from "react";
import AboutUsBox from "../AboutUsBox/AboutUsBox";
import SectionHeader from "./../SectionHeader/SectionHeader";

import "./AboutUs.css";

export default function AboutUs() {
  return (
    <div className="about-us">
      <div className="container">
        <SectionHeader
          title="ما چه کمکی بهتون میکنیم؟"
          desc="از اونجایی که تمامی محصولات در ویووشاپ بادقت بررسی میشوند ، هیچ نگرانی برای خرید وجود ندارد"
        />

        <div className="container">
          <div className="row">
              <AboutUsBox title="محصولات با کیفیت" desc="با کیفیت بالا ارائه میدهیم !" />
              <AboutUsBox title="محصولات اورجینال" desc="با گارانتی بازگشت ارائه میدهیم !" />
              <AboutUsBox title="محصولات بسته بندی" desc="با ضمانت عدم بازشدگی ارائه میدهیم !" />
              <AboutUsBox title="محصولات متنوع" desc="در رنگها و طرحهای مختلف ارئه میدهیم !" />
          </div>
        </div>
      </div>
    </div>
  );
}
