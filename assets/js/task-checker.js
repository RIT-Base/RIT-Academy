// assets/js/task-checker.js
//
// Validator murni client-side untuk tiap tipe task di tasks.json.
// Semua fungsi di sini TIDAK menyentuh DOM halaman atau Pyodide secara
// langsung — mereka menerima data mentah (kode HTML, stdout, dsb.) dan
// mengembalikan { pass: boolean, message: string }. Orkestrasi (menjalankan
// kode, memanggil Pyodide) dilakukan oleh halaman pemanggil (lihat
// assets/js/pages/materi.js).

export function checkHtmlContains(htmlCode, params = {}) {
  if (!params.selector) {
    return { pass: false, message: "Task tidak valid: selector kosong." };
  }
  let doc;
  try {
    doc = new DOMParser().parseFromString(htmlCode || "", "text/html");
  } catch (err) {
    return { pass: false, message: "Kode HTML tidak bisa diparse." };
  }
  const el = doc.querySelector(params.selector);
  if (!el) {
    return { pass: false, message: `Elemen "${params.selector}" belum ditemukan.` };
  }
  if (params.text) {
    const text = (el.textContent || "").trim();
    if (!text.includes(params.text)) {
      return {
        pass: false,
        message: `Elemen "${params.selector}" ditemukan, tapi teksnya belum mengandung "${params.text}".`,
      };
    }
  }
  return { pass: true, message: "Lolos!" };
}

export function checkPythonOutput(stdout, params = {}) {
  const trimmed = (stdout || "").replace(/\s+$/, "").replace(/^\s+/, "");
  if (params.exact !== undefined) {
    const expected = String(params.exact).trim();
    if (trimmed === expected) return { pass: true, message: "Lolos!" };
    return { pass: false, message: `Output program harus persis "${params.exact}".` };
  }
  if (params.contains !== undefined) {
    if (trimmed.includes(params.contains)) return { pass: true, message: "Lolos!" };
    return { pass: false, message: `Output program harus mengandung "${params.contains}".` };
  }
  return { pass: false, message: "Task tidak valid: butuh `contains` atau `exact`." };
}

export function checkPythonTestResult(actualStr, params = {}) {
  if (params.equals === undefined) {
    return { pass: false, message: "Task tidak valid: butuh `equals`." };
  }
  const expected = String(params.equals).trim();
  const actual = (actualStr ?? "").toString().trim();
  if (actual === expected) return { pass: true, message: "Lolos!" };
  return { pass: false, message: `Hasil "${actual}" belum sama dengan yang diharapkan ("${expected}").` };
}

export function checkQuiz(selectedIndex, params = {}) {
  if (selectedIndex === null || selectedIndex === undefined) {
    return { pass: false, message: "Pilih salah satu jawaban dulu." };
  }
  if (Number(selectedIndex) === Number(params.answer)) {
    return { pass: true, message: "Benar!" };
  }
  return { pass: false, message: "Belum tepat, coba lagi." };
}

export function taskErrorResult(err) {
  return { pass: false, message: `Terjadi error saat mengecek: ${err?.message || err}` };
}
