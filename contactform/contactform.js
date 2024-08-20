jQuery(document).ready(function ($) {
  "use strict"; // Menggunakan mode ketat untuk menghindari penggunaan variabel global dan kesalahan sintaks

  // Fungsi untuk memvalidasi field input atau textarea
  function validateField(field) {
    let rule = field.attr("data-rule"); // Mengambil aturan validasi dari atribut data-rule
    let ierror = false; // Flag untuk menandai apakah ada kesalahan pada field saat ini

    if (rule !== undefined) {
      // Cek apakah ada aturan validasi yang diberikan
      let pos = rule.indexOf(":"); // Cari posisi ":" dalam aturan, jika ada
      let exp = pos >= 0 ? rule.substr(pos + 1) : null; // Jika ":" ditemukan, ambil ekspresi setelahnya sebagai nilai batas
      rule = pos >= 0 ? rule.substr(0, pos) : rule; // Ambil aturan sebelum ":" sebagai nama aturan

      // Switch case untuk melakukan validasi berdasarkan jenis aturan
      switch (rule) {
        case "required": // Aturan untuk field yang wajib diisi
          if (field.val() === "") ierror = true; // Tandai error jika field kosong
          break;
        case "minlen": // Aturan untuk panjang minimal karakter
          if (field.val().length < parseInt(exp)) ierror = true; // Tandai error jika panjang input kurang dari nilai minimal
          break;
        case "email": // Aturan untuk validasi format email
          const emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i; // Ekspresi reguler untuk format email
          if (!emailExp.test(field.val())) ierror = true; // Tandai error jika format email tidak valid
          break;
        case "checked": // Aturan untuk checkbox yang harus dicentang
          if (!field.is(":checked")) ierror = true; // Tandai error jika checkbox tidak dicentang
          break;
        case "regexp": // Aturan untuk validasi berdasarkan ekspresi reguler kustom
          const regExp = new RegExp(exp); // Buat objek RegExp dari ekspresi yang diberikan
          if (!regExp.test(field.val())) ierror = true; // Tandai error jika input tidak sesuai dengan ekspresi reguler
          break;
      }

      // Menampilkan pesan validasi jika ada error, atau mengosongkan pesan jika tidak ada error
      field
        .next(".validation")
        .html(
          ierror ? field.attr("data-msg") || "wrong Input" : "" // Menggunakan pesan error kustom jika ada, atau "wrong Input" sebagai default
        )
        .show("blind"); // Tampilkan pesan dengan efek animasi "blind"
    }
    return ierror; // Kembalikan status error (true jika ada error, false jika tidak)
  }

  // Event handler untuk submit form
  $("form.contactForm").submit(function () {
    let f = $(this).find(".form-group"); // Dapatkan semua elemen dengan class .form-group dalam form
    let ferror = false; // Flag untuk melacak apakah ada error di seluruh form

    // Looping melalui semua input dan textarea dalam form untuk memvalidasi
    f.children("input, textarea").each(function () {
      if (validateField($(this))) ferror = true; // Panggil fungsi validateField untuk setiap field, tandai error jika ada
    });

    if (ferror) return false; // Jika ada error, hentikan pengiriman form

    let str = $(this).serialize(); // Serialisasi data form menjadi format URL encoded untuk dikirim melalui AJAX
    let action = $(this).attr("action") || "contactform/contactform.php"; // Dapatkan URL aksi dari atribut action form, atau gunakan default jika tidak ada

    // Mengirimkan data form melalui AJAX
    $.ajax({
      type: "POST", // Mengatur tipe request sebagai POST
      url: action, // URL tempat data akan dikirimkan
      data: str, // Data form yang telah diserialisasi
      success: function (msg) {
        // Fungsi callback untuk menangani respon dari server
        if (msg === "OK") {
          // Jika respon dari server adalah "OK"
          $("#sendmessage").addClass("show"); // Tampilkan pesan sukses dengan menambahkan class "show"
          $("#errormessage").removeClass("show"); // Sembunyikan pesan error jika sebelumnya ditampilkan
          $(".contactForm").find("input, textarea").val(""); // Kosongkan semua field dalam form setelah sukses
        } else {
          // Jika respon bukan "OK"
          $("#sendmessage").removeClass("show"); // Sembunyikan pesan sukses
          $("#errormessage").addClass("show"); // Tampilkan pesan error dengan menambahkan class "show"
          $("#errormessage").html(msg); // Masukkan pesan error dari server ke dalam elemen #errormessage
        }
      },
    });

    return false; // Mencegah pengiriman form secara tradisional (tanpa AJAX)
  });
});
