<template>
  <div></div>
</template>
<script>
export default {
  name: "GoogleAnalytics",
  mounted() {
    console.log("Google Analytics is running");
    // var ga = null;
    // var GoogleAnalyticsObject = null;
    (function (i, s, o, g, r, a, m) {
      // i["GoogleAnalyticsObject"] = r;
      // (i[r] =
      //   i[r] ||
      //   function () {
      //     (i[r].q = i[r].q || []).push(arguments);
      //   }),
      //   (i[r].l = 1 * new Date());
      (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    })(
      window,
      document,
      "script",
      "https://www.googletagmanager.com/gtag/js?id=G-LM29K9R502",
      "ga"
    );

    this.$nextTick(() => {
      window.dataLayer = window.dataLayer || [];

      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());

      gtag("config", "G-LM29K9R502");
    });
  },
};
</script>
