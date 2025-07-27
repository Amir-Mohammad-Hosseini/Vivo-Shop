import React, { useEffect, useState } from "react";
import Topbar from "./../../Components/Topbar/Topbar";
import Navbar from "./../../Components/Navbar/Navbar";
import Footer from "./../../Components/Footer/Footer";
import Breadcrumb from "./../../Components/Breadcrumb/Breadcrumb";
import domPurify from "dompurify";

import "./ArticleInfo.css";
import CommentsTextArea from "../../Components/CommentsTextArea/CommentsTextArea";
import { useParams } from "react-router-dom";

export default function ArticleInfo() {
  const [articleDetails, setArticleDetails] = useState({});
  const [articleCategory, setArticleCategory] = useState({});
  const [articleCreator, setArticleCreator] = useState({});
  const [articleCreateDate, setArticleCreateDate] = useState("");
  const { articleName } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles/${articleName}`)
      .then((res) => res.json())
      .then((articleInfo) => {
        setArticleDetails(articleInfo);
        setArticleCategory(articleInfo.categoryID);
        setArticleCreator(articleInfo.creator);
        setArticleCreateDate(articleInfo.createdAt);
      });
  }, []);

  return (
    <>
      <Topbar />
      <Navbar />

      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "مقاله ها",
            to: "category-info/frontend",
          },
          {
            id: 3,
            title: "ویو Vs ری‌اکت",
            to: "course-info/js-expert",
          },
        ]}
      />

      <main className="main">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className="article">
                <h1 className="article__title">{articleDetails.title}</h1>
                <div className="article__header">
                  <div className="article-header__category article-header__item">
                    <i className="far fa-folder article-header__icon"></i>
                    <a href="#" className="article-header__text">
                      {articleCategory.title}
                    </a>
                  </div>
                  <div className="article-header__category article-header__item">
                    <i className="far fa-user article-header__icon"></i>
                    <span className="article-header__text">
                      ارسال شده توسط {articleCreator.name}
                    </span>
                  </div>
                  <div className="article-header__category article-header__item">
                    <i className="far fa-eye article-header__icon"></i>
                    <span className="article-header__text">
                      تاریخ انتشار: {articleCreateDate.slice(0, 10)}
                    </span>
                  </div>
                </div>
                <div className="article__score">
                  <div className="article__score-icons">
                    <img
                      src="/images/svgs/star_fill.svg"
                      className="article__score-icon"
                    />
                    <img
                      src="/images/svgs/star_fill.svg"
                      className="article__score-icon"
                    />
                    <img
                      src="/images/svgs/star_fill.svg"
                      className="article__score-icon"
                    />
                    <img
                      src="/images/svgs/star_fill.svg"
                      className="article__score-icon"
                    />
                    <img
                      src="/images/svgs/star.svg"
                      className="article__score-icon"
                    />
                  </div>
                  <span className="article__score-text">
                    4.2/5 - (5 امتیاز)
                  </span>
                </div>

                <div className="article-read">
                  <span className="article-read__title">
                    آنچه در این مقاله خواهید خواند
                  </span>
                  <ul className="article-read__list">
                    <li className="article-read__item">
                      <a href="#" className="article-read__link">
                          معرفی بهترین سایت های فروش کالا
                      </a>
                    </li>
                    <li className="article-read__item">
                      <a href="#" className="article-read__link">
                        خرید آسان محصولات ویوو شاپ
                      </a>
                    </li>
                    <li className="article-read__item">
                      <a href="#" className="article-read__link">
                        خرید محصول های متنوع ویووشاپ:
                      </a>
                    </li>
                  </ul>
                </div>

                <div
                  className="article-section"
                  dangerouslySetInnerHTML={{
                    __html: domPurify.sanitize(articleDetails.body),
                  }}
                >
                </div>

                <div className="article-social-media">
                  <span className="article-social-media__text">
                    اشتراک گذاری :
                  </span>
                  <a href="#" className="article-social-media__link">
                    <i className="fab fa-telegram-plane article-social-media__icon"></i>
                  </a>
                  <a href="#" className="article-social-media__link">
                    <i className="fab fa-twitter article-social-media__icon"></i>
                  </a>
                  <a href="#" className="article-social-media__link">
                    <i className="fab fa-facebook-f article-social-media__icon"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-4"></div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
