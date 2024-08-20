// Menampilkan pesan selamat datang ketika halaman diakses
// Sebaiknya gunakan modal atau notifikasi yang lebih ramah pengguna daripada alert
alert(
  "Hai guys, Selamat datang di website saya, terima kasih telah mengunjungi situs ini, Perkenalkan saya Dimas Satria Selaku Founder Dan selaku Pembuat Website Ini, Untuk melanjutkan silahkan Tekan OK atau CLOSE di sebelah kanan bawah. Thanks Guys!"
);

// Fungsi utama jQuery yang memastikan seluruh kode berjalan dalam konteks jQuery ($)
(function ($) {
  "use strict"; // Menggunakan mode ketat untuk mencegah penggunaan variabel global dan menghindari kesalahan sintaks

  // Menyimpan referensi elemen navigasi dan tingginya
  const nav = $("nav");
  const navHeight = nav.outerHeight();

  // Menambahkan class 'navbar-reduce' saat tombol navbar-toggle diklik
  $(".navbar-toggler").on("click", function () {
    const mainNav = $("#mainNav");
    if (!mainNav.hasClass("navbar-reduce")) {
      mainNav.addClass("navbar-reduce");
    }
  });

  // Preloader: Menghilangkan elemen preloader setelah halaman dimuat
  $(window).on("load", function () {
    const preloader = $("#preloader");
    if (preloader.length) {
      preloader.delay(100).fadeOut("slow", function () {
        $(this).remove(); // Menghapus elemen preloader dari DOM
      });
    }
  });

  // Tombol 'Back to top' muncul saat scroll lebih dari 100px dan kembali ke atas halaman saat diklik
  $(window).scroll(function () {
    const backToTop = $(".back-to-top");
    if ($(this).scrollTop() > 100) {
      backToTop.fadeIn("slow");
    } else {
      backToTop.fadeOut("slow");
    }
  });

  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo"); // Scroll ke atas dengan efek animasi
    return false; // Mencegah aksi default dari anchor (<a>)
  });

  // Scrolltop-mf: Scroll ke atas halaman saat elemen dengan class 'scrolltop-mf' diklik
  $(".scrolltop-mf").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 1000);
  });

  // Counter: Animasi untuk menghitung angka pada elemen dengan class 'counter'
  $(".counter").counterUp({
    delay: 15,
    time: 2000,
  });

  // Smooth scrolling pada elemen dengan class 'js-scroll' saat anchor dituju
  $('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      let target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          { scrollTop: target.offset().top - navHeight + 5 },
          1000,
          "easeInOutExpo"
        );
        return false; // Mencegah aksi default dari anchor (<a>)
      }
    }
  });

  // Menutup menu responsive setelah link menu diklik
  $(".js-scroll").on("click", function () {
    $(".navbar-collapse").collapse("hide");
  });

  // Mengaktifkan Scrollspy untuk menambahkan class aktif pada item navbar saat scroll
  $("body").scrollspy({
    target: "#mainNav",
    offset: navHeight,
  });

  // Navbar Menu Reduce: Mengubah style navbar saat halaman discroll
  $(window).trigger("scroll"); // Memicu event scroll saat halaman dimuat
  $(window).on("scroll", function () {
    const pixels = 50; // Jumlah piksel yang harus dilewati sebelum navbar berubah
    const top = 1200; // Jumlah piksel untuk memunculkan tombol scrolltop-mf
    const navbar = $(".navbar-expand-md");

    if ($(window).scrollTop() > pixels) {
      navbar.addClass("navbar-reduce").removeClass("navbar-trans");
    } else {
      navbar.addClass("navbar-trans").removeClass("navbar-reduce");
    }

    if ($(window).scrollTop() > top) {
      $(".scrolltop-mf").fadeIn(1000, "easeInOutExpo");
    } else {
      $(".scrolltop-mf").fadeOut(1000, "easeInOutExpo");
    }
  });

  // Typed.js: Animasi teks yang berubah-ubah pada elemen dengan class 'text-slider'
  if ($(".text-slider").length == 1) {
    const typed_strings = $(".text-slider-items").text();
    new Typed(".text-slider", {
      strings: typed_strings.split(","), // Memisahkan teks berdasarkan koma
      typeSpeed: 80,
      loop: true,
      backDelay: 1100,
      backSpeed: 30,
    });
  }

  // Testimonials carousel: Mengatur carousel testimonial dengan OwlCarousel
  $("#testimonial-mf").owlCarousel({
    margin: 20,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
    },
  });
})(jQuery); // Memastikan bahwa simbol $ merujuk pada jQuery
