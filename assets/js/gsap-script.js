window.addEventListener("DOMContentLoaded", () => {
  ////////////////////////////////
  // 慣性スクロール
  ////////////////////////////////

  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // GSAPとScrollTriggerの初期化
  gsap.registerPlugin(ScrollTrigger);

  // スクロールトリガーの更新をLenisのスクロールイベントに連携
  lenis.on("scroll", ScrollTrigger.update);

  // GSAPのティッカーをLenisと同期
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // loading
  ////////////////////////////////
  const loadingTL = gsap.timeline();
  loadingTL
    .set(".loading__contents", { autoAlpha: 1 })
    .fromTo(
      ".loading__mask",
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 1, delay: 1 },
      "+=.2"
    )
    .fromTo(
      ".loading__text span",
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.4, stagger: 0.05 }
    )
    .fromTo(
      ".loading__subText",
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 1 },
      "+=.8"
    )
    .fromTo(
      ".loading__contents",
      { autoAlpha: 1 },
      { autoAlpha: 0, duration: 1, delay: 1 }
    )
    .to(".loading__mask", { autoAlpha: 0, duration: 1 })
    .fromTo(
      ".loading__plane",
      { autoAlpha: 0, y: 60, x: -20 },
      { autoAlpha: 1, x: 0, y: 0, duration: 1, ease: "power2.inOut" },
      "+=.4"
    )
    .add(() => {
      document.querySelector("body").classList.remove("is-scroll-lock");
    });

  ////////////////////////////////
  // テキスト分割
  ////////////////////////////////

  /* spanタグに分割 */
  let splitTarget = document.querySelectorAll(".js-split-text"); //ターゲットとなる要素を全取得
  splitTarget.forEach((target) => {
    // target = ターゲット
    if (!target.classList.contains("is-active")) {
      //ターゲットが'is-active'クラスを持っていない場合
      newText = ""; //生成する要素を格納するための変数
      spanText = target.innerHTML; //ターゲットの中身を取得
      spanText.split("").forEach((char) => {
        newText += "<span>" + char + "</span>"; //一文字ずつspanタグで囲む
      });
      target.innerHTML = newText; //ターゲットに生成した要素を挿入
    }
  });

  ////////////////////////////////
  // intro
  ////////////////////////////////
  const aboutTL = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: ".about",
      scrub: true,
      pin: true,
      pinSpacing: false,
    },
  });
  const aboutAnimationTL = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: ".about__mask",
      start: "top bottom",
      endTrigger: ".about",
      scrub: true,
    },
  });
  aboutAnimationTL
    .to(".loading__plane", { bottom: 20, scale: 0.6, duration: 50 }, "<")
    .fromTo(
      ".about__scroll span",
      { yPercent: -100 },
      { yPercent: 0, duration: 15, stagger: { each: 5, from: "random" } },
      "-=15"
    )
    .fromTo(".about__contents", { y: "100vh" }, { y: "-100vh", duration: 30 })
    .fromTo(
      ".about",
      { filter: "brightness(1)" },
      { filter: "brightness(0)", duration: 20 }
    );

  ////////////////////////////////
  // title
  ////////////////////////////////
  const bridgeTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".bridge",
      scrub: true,
      pin: true,
      pinSpacing: false,
    },
  });

  bridgeTL
    .to(".bridge__image", { filter: "blur(5px)" })
    .to(".bridge__mask", { autoAlpha: 1 }, "<")
    .fromTo(
      ".bridge__text span",
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, stagger: 0.09 }
    )
    .to(".bridge__text span", { color: "#DDA9A9" })
    .to(".bridge__mask2", { autoAlpha: 1 }, "+=1");

  ////////////////////////////////
  // skill
  ////////////////////////////////
  const stickySection = document.querySelectorAll(".js-sticky");
  var phase = 1;
  const features01TL = gsap.timeline({
    scrollTrigger: {
      trigger: stickySection[2],
      scrub: true,
      pin: true,
      pinSpacing: false,
    },
  });

  features01TL
    .fromTo(
      ".features01 .features__item",
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 20 }
    )
    .fromTo(
      ".features01 .features__slide:nth-of-type(1)",
      { clipPath: "inset(0 0 0% 0)" },
      { clipPath: "inset(0 0 100% 0)", duration: 20 },
      "+=10"
    )
    .to(
      ".features01 .features__set:nth-of-type(1)",
      {
        autoAlpha: 0,
        duration: 5,
      },
      "-=15"
    )
    .to(
      ".features01 .features__set:nth-of-type(2)",
      {
        autoAlpha: 1,
        duration: 5,
      },
      "-=15"
    )

    .fromTo(
      ".features01 .features__slide:nth-of-type(2)",
      { clipPath: "inset(0 0 0% 0)" },
      { clipPath: "inset(0 0 100% 0)", duration: 20 },
      "+=10"
    )
    .to(
      ".features01 .features__set:nth-of-type(2)",
      {
        autoAlpha: 0,
        duration: 5,
      },
      "-=15"
    )
    .to(
      ".features01 .features__set:nth-of-type(3)",
      {
        autoAlpha: 1,
        duration: 5,
      },
      "-=15"
    )

    .fromTo(
      ".features01 .features__slide:nth-of-type(3)",
      { clipPath: "inset(0 0 0% 0)" },
      { clipPath: "inset(0 0 100% 0)", duration: 20 },
      "+=10"
    )
    .to(
      ".features01 .features__set:nth-of-type(3)",
      {
        autoAlpha: 0,
        duration: 5,
      },
      "-=15"
    )
    .to(
      ".features01 .features__set:nth-of-type(4)",
      {
        autoAlpha: 1,
        duration: 5,
      },
      "-=15"
    )

    .fromTo(
      ".features01",
      { filter: "brightness(1)" },
      { filter: "brightness(0)", duration: 20, delay: 20 }
    );

  ////////////////////////////////
  // Qualification
  ////////////////////////////////
  const pluginsTL = gsap.timeline({
    scrollTrigger: {
      trigger: stickySection[3],
      endTrigger: ".plugins",
      end: "bottom bottom",
      scrub: true,
      pin: true,
      pinSpacing: false,
    },
  });

  pluginsTL
    .fromTo(
      ".plugins__subTitle span",
      { autoAlpha: 0 },
      { autoAlpha: 1, stagger: 0.1 }
    )
    .fromTo(
      ".plugins__mainTitle span",
      { autoAlpha: 0 },
      { autoAlpha: 1, stagger: 0.1 }
    )
    .fromTo(
      ".plugins__button",
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, ease: "none" }
    );
});
