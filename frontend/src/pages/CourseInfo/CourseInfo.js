import React, { useState, useEffect } from "react";
import Topbar from "./../../Components/Topbar/Topbar";
import Navbar from "./../../Components/Navbar/Navbar";
import Footer from "./../../Components/Footer/Footer";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import CourseDetailBox from "../../Components/CourseDetailBox/CourseDetailBox";
import CommentsTextArea from "../../Components/CommentsTextArea/CommentsTextArea";
import Accordion from "react-bootstrap/Accordion";
import { useParams, Link } from "react-router-dom";
import swal from "sweetalert";

import "./CourseInfo.css";

export default function CourseInfo() {
  const [comments, setComments] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [courseDetails, setCourseDetails] = useState({});
  const [courseTeacher, setCourseTeacher] = useState({});
  const [courseCategory, setCourseCategory] = useState({});
  const [relatedCourses, setRelatedCourses] = useState([]);

  const { courseName } = useParams();

  useEffect(() => {
    getCourseDetails();

    fetch(`http://localhost:4000/v1/courses/related/${courseName}`)
      .then((res) => res.json())
      .then((allData) => {
        console.log(allData);
        setRelatedCourses(allData);
      });
  }, []);

  function getCourseDetails() {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:4000/v1/courses/${courseName}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          localStorageData === null ? null : localStorageData
        }`,
      },
    })
      .then((res) => res.json())
      .then((courseInfo) => {
        setComments(courseInfo.comments);
        setSessions(courseInfo.sessions);
        setCourseDetails(courseInfo);
        setCreatedAt(courseInfo.createdAt);
        setUpdatedAt(courseInfo.updatedAt);
        setCourseTeacher(courseInfo.creator);
        setCourseCategory(courseInfo.categoryID);
      });
  }

  const submitComment = (newCommentBody, commentScore) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:4000/v1/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: JSON.stringify({
        body: newCommentBody,
        courseShortName: courseName,
        score: commentScore,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        swal({
          title: "کامنت موردنظر با موفقیت ثبت شد",
          icon: "success",
          buttons: "تایید",
        });
      });
  };

  const registerInCourse = (course) => {
    if (course.price === 0) {
      swal({
        title: "آیا از خید محصول اطمینان دارید؟",
        icon: "warning",
        buttons: ["نه", "آره"],
      }).then((result) => {
        if (result) {
          fetch(`http://localhost:4000/v1/courses/${course._id}/register`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user")).token
              }`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              price: course.price,
            }),
          }).then((res) => {
            console.log(res);
            if (res.ok) {
              swal({
                title: "ثبت نام با موفقیت انجام شد",
                icon: "success",
                buttons: "اوکی",
              }).then(() => {
                getCourseDetails();
              });
            }
          });
        }
      });
    } else {
      swal({
        title: "آیا از خرید محصول اطمینان دارید؟",
        icon: "warning",
        buttons: ["نه", "آره"],
      }).then((result) => {
        if (result) {
          swal({
            title: "در صورت داشتن کد تخفیف وارد کنید:",
            content: "input",
            buttons: ["خرید بدون کد تخفیف", "اعمال کد تخفیف"],
          }).then((code) => {
            if (code === null) {
              fetch(`http://localhost:4000/v1/courses/${course._id}/register`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("user")).token
                  }`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  price: course.price,
                }),
              }).then((res) => {
                console.log(res);
                if (res.ok) {
                  swal({
                    title: "با موفقیت به سبد خرید اضافه شد",
                    icon: "success",
                    buttons: "ادامه",
                  }).then(() => {
                    getCourseDetails();
                  });
                }
              });
            } else {
              fetch(`http://localhost:4000/v1/offs/${code}`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("user")).token
                  }`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  course: course._id,
                }),
              })
                .then((res) => {
                  console.log(res);

                  if (res.status == 404) {
                    swal({
                      title: "کد تخفیف معتبر نیست",
                      icon: "error",
                      buttons: "تلاش مجدد",
                    });
                  } else if (res.status == 409) {
                    swal({
                      title: "کد تخفیف قبلا استفاده شده :/",
                      icon: "error",
                      buttons: "تلاش مجدد",
                    });
                  } else {
                    return res.json();
                  }
                })
                .then((code) => {
                  fetch(
                    `http://localhost:4000/v1/courses/${course._id}/register`,
                    {
                      method: "GET",
                      headers: {
                        Authorization: `Bearer ${
                          JSON.parse(localStorage.getItem("user")).token
                        }`,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        price:
                          course.price - (course.price * code.percent) / 100,
                      }),
                    }
                  ).then((res) => {
                    console.log(res);
                    if (res.ok) {
                      swal({
                        title: "خرید با موفقیت انجام شد",
                        icon: "success",
                        buttons: "ادامه",
                      }).then(() => {
                        getCourseDetails();
                      });
                    }
                  });
                });
            }
          });
        }
      });
    }
  };

  return (
    <>
      <Topbar />
      <Navbar />

      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "آموزش برنامه نویسی فرانت‌اند",
            to: "category-info/frontend",
          },
          {
            id: 3,
            title: "دوره متخصص جاوا اسکریپت",
            to: "course-info/js-expert",
          },
        ]}
      />

      <section className="course-info">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <h1 className="course-info__title">{courseDetails.name}</h1>
              <p className="course-info__text">{courseDetails.description}</p>
              <div className="course-info__social-media">
                <a href="#" className="course-info__social-media-item">
                  <i className="fab fa-telegram-plane course-info__icon"></i>
                </a>
                <a href="#" className="course-info__social-media-item">
                  <i className="fab fa-twitter course-info__icon"></i>
                </a>
                <a href="#" className="course-info__social-media-item">
                  <i className="fab fa-facebook-f course-info__icon"></i>
                </a>
              </div>
            </div>
            <div className="col-6">
          <img
            src={`http://localhost:4000/courses/covers/${courseDetails.cover}`}
            alt="Course img"
            className="course-box__img"
          />
            </div>
          </div>
        </div>
      </section>

      <main className="main">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className="course">
                <div className="course-boxes">
                  <div className="row">
                    <CourseDetailBox
                      icon="fa-question-circle-o"
                      title="وضعیت محصول:"
                      text={
                        courseDetails.isComplete === 1
                          ? "اتمام موجودی"
                          : "موجود"
                      }
                    />
                  </div>
                </div>

                {/* Start Teacher Details */}

                <div className="techer-details">
                  <div className="techer-details__header">
                    <div className="techer-details__header-right">
                      <div className="techer-details__header-titles">
                        <a href="#" className="techer-details__header-link">
                          {/* امیرمحمد حسینی */}
                          {courseTeacher.name}
                        </a>
                      </div>
                    </div>
                    <div className="techer-details__header-left">
                      <i className="fas  fa-shopping-bag techer-details__header-icon"></i>
                      <span className="techer-details__header-name">فروشنده</span>
                    </div>
                  </div>
                </div>

                {/* Finish Teacher Details */}

                <CommentsTextArea
                  comments={comments}
                  submitComment={submitComment}
                />
              </div>
            </div>

            <div className="col-4">
              <div className="courses-info">
                <div className="course-info">
                  <div className="course-info__register">
                    {courseDetails.isUserRegisteredToThisCourse === true ? (
                      <span className="course-info__register-title">
                        <i className="fas fa-graduation-cap course-info__register-icon"></i>
                          خریدار محصول هستید
                      </span>
                    ) : (
                      <span
                        className="course-info__register-title"
                        onClick={() => registerInCourse(courseDetails)}
                      >
                        خرید محصول
                      </span>
                    )}
                  </div>
                </div>
                <div className="course-info">
                  <div className="course-info__total">
                    <div className="course-info__top">
                      <div className="course-info__total-sale">
                        <span className="course-info__total-sale-text">
                          تعداد خریدارها :
                        </span>
                        <span className="course-info__total-sale-number">
                          {courseDetails.courseStudentsCount}
                        </span>
                      </div>
                      <div className="course-info__total-sale">
                        <span className="course-info__total-sale-text">
                            قیمت :
                        </span>
                        <span className="course-info__total-sale-number">
                          {courseDetails.price}
                        </span>
                      </div>
                    </div>
                    <div className="course-info__bottom">
                      <div className="course-info__total-comment">
                        <i className="far fa-comments course-info__total-comment-icon"></i>
                        <span className="course-info__total-comment-text">
                          67 دیدگاه
                        </span>
                      </div>
                      <div className="course-info__total-view">
                        <i className="far fa-eye course-info__total-view-icon"></i>
                        <span className="course-info__total-view-text">
                          14,234 بازدید
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="course-info">
                  <div className="course-info__header-short-url">
                    <i className="fas fa-link course-info__short-url-icon"></i>
                    <span className="course-info__short-url-text">
                      لینک کوتاه
                    </span>
                  </div>
                  <span className="course-info__short-url">
                    https://vivolearn.ir/?p=117472
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
