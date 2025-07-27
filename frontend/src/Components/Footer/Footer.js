import React from "react";
import FooterItem from "../FooterItem/FooterItem";
import { Link } from "react-router-dom";
import Input from "./../../Components/Form/Input";
import { emailValidator } from "../../validators/rules";
import { useForm } from "../../hooks/useForm";
import swal from "sweetalert";

import "./Footer.css";

export default function Footer() {
  const [formState, onInputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const addNewEmail = (event) => {
    event.preventDefault();
    const newEmail = {
      email: formState.inputs.email.value,
    };

    fetch("http://localhost:4000/v1/newsletters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmail),
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "ایمیل شما با موفقیت در خبرنامه ثبت شد",
          icon: "success",
          buttons: "خیلی هم عالی",
        });
      }
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-widgets">
          <div className="row">
            <FooterItem title="درباره ما">
              <p className="footer-widgets__text">
                "ویووشاپ، فروشگاه اینترنتی تازه‌نفس ایرانی، از سال ۱۴۰۴ با هدف
                ارائه‌ی گسترده‌ترین سبد کالا در تمامی دسته‌بندی‌ها فعالیت خود را
                آغاز کرده است. ما مفتخریم محصولاتی به‌روز و باکیفیت را با تضمین
                ارسال به سراسر ایران عرضه می‌کنیم. تولد ویووشاپ حاصل ایده‌ی
                مشترک ما امیرمحمد حسینی و یاسین نیک‌فرجام در پیاده‌سازی پروژه‌ی
                دانشگاهی تحت راهنمایی ارزشمند استادمان بود. امروز، با همان
                اشتیاق اولیه و چشم‌اندازی جسورانه، نه تنها پروژه‌مان را به
                واقعیت تبدیل کرده‌ایم، که با افتخار در مسیر تبدیل شدن به رقیبی
                معتبر برای بزرگان بازار قدم برمی‌داریم. اعتماد شما، انگیزه‌ی
                حرکت رو به جلوی ماست."
              </p>
            </FooterItem>

            <FooterItem title="آخرین مطالب">
              <div className="footer-widgets__links">
                <a href="#" className="footer-widgets__link">
                  بهترین تبلت بازار ایران؛ مرداد ۱۴۰۴
                </a>
                <a href="#" className="footer-widgets__link">
                  بهترین پنکه ایستاده؛ ۴ پیشنهاد جذاب برای خرید
                </a>
                <a href="#" className="footer-widgets__link">
                  تیک آبی توییتر چیست و چه مزایایی دارد؟
                </a>
                <a href="#" className="footer-widgets__link">
                  ۱۰ راه صرفه‌جویی در مصرف آب؛ چگونه از قبض آب نترسیم؟
                </a>
                <a href="#" className="footer-widgets__link">
                  ۱۰ راز بازار ماشین چینی در ایران؛ از پشت‌پرده فونیکس تا ریشه
                  اکستریم
                </a>
              </div>
            </FooterItem>

            <FooterItem title="دسترسی سریع">
              <div className="row">

                <div className="col-6">
                  <Link to="/contact" className="footer-widgets__link">
                    ارتباط با ما
                  </Link>
                </div>
                <div className="col-12">
                  <span className="footer-widgets__title">
                    اشتراک در خبرنامه
                  </span>
                  <span className="footer-widgets__text text-center d-block">
                    جهت اطلاع از آخرین اخبار و تخفیف های سایت مشترک شوید!
                  </span>
                  <form action="#" className="footer-widgets__form">
                    <Input
                      element="input"
                      id="email"
                      type="text"
                      className="footer-widgets__input"
                      placeholder="ایمیل خود را وارد کنید."
                      onInputHandler={onInputHandler}
                      validations={[emailValidator()]}
                    />
                    <button
                      type="submit"
                      className="footer-widgets__btn"
                      onClick={addNewEmail}
                    >
                      عضویت
                    </button>
                  </form>
                </div>
              </div>
            </FooterItem>
          </div>
        </div>
      </div>

      <div className="footer__copyright">
        <span className="footer__copyright-text">
            طراحی شده در بهار 1404 - کلاس برنامه نویسی وب استاد نوبخت
        </span>
      </div>
    </footer>
  );
}
