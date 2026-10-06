// assets/js/certificate.js
//
// Generator Sertifikat Kelulusan Resmi RIT Academy
// Berbasis HTML5 Canvas High-Res (1600 x 1100 px) & PDF Print tanpa dependensi server.

export function renderCertificateCanvas(canvas, {
  studentName = "Siswa RIT Academy",
  courseTitle = "Web Dasar",
  courseSlug = "web-dasar",
  date = "",
  serial = ""
} = {}) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const width = 1600;
  const height = 1100;
  canvas.width = width;
  canvas.height = height;

  // 1. Background Bersih
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  // 2. Ornamen Watermark Latar Halus (Grid Titik Halus)
  ctx.fillStyle = "rgba(5, 217, 231, 0.035)";
  const step = 40;
  for (let x = 60; x < width - 60; x += step) {
    for (let y = 60; y < height - 60; y += step) {
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 3. Frame Ganda
  // Border Luar: Obsidian (#1C1515)
  ctx.strokeStyle = "#1C1515";
  ctx.lineWidth = 14;
  ctx.strokeRect(36, 36, width - 72, height - 72);

  // Garis Pemisah Halus
  ctx.strokeStyle = "rgba(28, 21, 21, 0.15)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(50, 50, width - 100, height - 100);

  // Border Dalam: Electric Cyan (#05D9E7)
  ctx.strokeStyle = "#05D9E7";
  ctx.lineWidth = 6;
  ctx.strokeRect(60, 60, width - 120, height - 120);

  // 4. Ornamen Sudut Khas RIT Academy
  const drawCornerAccent = (x, y, dirX, dirY) => {
    ctx.strokeStyle = "#2563EB"; // Royal Blue
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x, y + dirY * 40);
    ctx.lineTo(x, y);
    ctx.lineTo(x + dirX * 40, y);
    ctx.stroke();

    ctx.fillStyle = "#05D9E7";
    ctx.beginPath();
    ctx.arc(x + dirX * 12, y + dirY * 12, 4, 0, Math.PI * 2);
    ctx.fill();
  };

  drawCornerAccent(76, 76, 1, 1);
  drawCornerAccent(width - 76, 76, -1, 1);
  drawCornerAccent(76, height - 76, 1, -1);
  drawCornerAccent(width - 76, height - 76, -1, -1);

  // 5. Header Brand
  ctx.textAlign = "center";
  ctx.fillStyle = "#2563EB";
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText("RIT ACADEMY • PUSAT RISET & PENGEMBANGAN TEKNOLOGI INFORMATIKA", width / 2, 140);

  // Judul Utama Sertifikat
  ctx.fillStyle = "#1C1515";
  ctx.font = '800 48px "Plus Jakarta Sans", sans-serif';
  ctx.fillText("SERTIFIKAT KELULUSAN", width / 2, 210);

  // Subtitle Bahasa Inggris
  ctx.fillStyle = "#64748b";
  ctx.font = '600 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText("CERTIFICATE OF COMPLETION", width / 2, 245);

  // Garis Dekoratif Tengah
  const grad = ctx.createLinearGradient(width / 2 - 250, 0, width / 2 + 250, 0);
  grad.addColorStop(0, "rgba(5, 217, 231, 0)");
  grad.addColorStop(0.5, "#05D9E7");
  grad.addColorStop(1, "rgba(5, 217, 231, 0)");
  ctx.strokeStyle = grad;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 250, 275);
  ctx.lineTo(width / 2 + 250, 275);
  ctx.stroke();

  // 6. Penerima Penghargaan
  ctx.fillStyle = "#475569";
  ctx.font = 'italic 500 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillText("Diberikan dengan bangga kepada:", width / 2, 355);

  // Nama Siswa (Besar & Menonjol)
  ctx.fillStyle = "#0f172a";
  ctx.font = '800 54px "Plus Jakarta Sans", sans-serif';
  const cleanName = studentName && studentName.trim() ? studentName.trim() : "Siswa RIT Academy";
  ctx.fillText(cleanName, width / 2, 435);

  // Aksen garis nama
  ctx.strokeStyle = "#05D9E7";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 200, 465);
  ctx.lineTo(width / 2 + 200, 465);
  ctx.stroke();

  // 7. Narasi Kelulusan
  ctx.fillStyle = "#475569";
  ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText("Atas dedikasi dan keberhasilannya menyelesaikan seluruh modul pembelajaran,", width / 2, 535);
  ctx.fillText("kuis, serta latihan praktik mandiri pada kurikulum pembelajaran:", width / 2, 570);

  // 8. Judul Course (Kapital & Tegas)
  ctx.fillStyle = "#0284c7"; // Cyan/Sky pekat profesional
  ctx.font = '800 44px "Plus Jakarta Sans", sans-serif';
  ctx.fillText((courseTitle || "Kurikulum RIT").toUpperCase(), width / 2, 650);

  // Keterangan Validasi Lembaga
  ctx.fillStyle = "#64748b";
  ctx.font = '600 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText("Kurikulum Standar Industri RIT Academy • Fakultas Komunikasi dan Informatika UNIGA", width / 2, 705);

  // Garis Pemisah Footer
  ctx.strokeStyle = "rgba(0, 0, 0, 0.08)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(140, 775);
  ctx.lineTo(width - 140, 775);
  ctx.stroke();

  // 9. Metadata Bawah (3 Kolom)
  const effectiveDate = date || new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  const effectiveSerial = serial || `RIT-${(courseSlug || "GEN").toUpperCase()}-CERT`;

  // Kolom Kiri: Tanggal & Nomor Serial
  ctx.textAlign = "left";
  ctx.fillStyle = "#64748b";
  ctx.font = '700 14px "JetBrains Mono", monospace';
  ctx.fillText("TANGGAL KELULUSAN", 200, 835);

  ctx.fillStyle = "#1e293b";
  ctx.font = '700 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(effectiveDate, 200, 870);

  ctx.fillStyle = "#64748b";
  ctx.font = '700 14px "JetBrains Mono", monospace';
  ctx.fillText("NOMOR SERIAL SERTIFIKAT", 200, 925);

  ctx.fillStyle = "#0284c7";
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText(effectiveSerial, 200, 958);

  // Kolom Tengah: Stempel Badge Terverifikasi
  ctx.textAlign = "center";
  const stampX = width / 2;
  const stampY = 890;

  ctx.fillStyle = "rgba(5, 217, 231, 0.08)";
  ctx.beginPath();
  ctx.arc(stampX, stampY, 64, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#05D9E7";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(stampX, stampY, 64, 0, Math.PI * 2);
  ctx.stroke();

  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = "#2563EB";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(stampX, stampY, 56, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]); // Reset dash

  ctx.fillStyle = "#2563EB";
  ctx.font = '700 13px "JetBrains Mono", monospace';
  ctx.fillText("★ VERIFIED ★", stampX, stampY - 24);

  ctx.fillStyle = "#1C1515";
  ctx.font = '800 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText("RIT ACADEMY", stampX, stampY);

  ctx.fillStyle = "#0284c7";
  ctx.font = '700 12px "JetBrains Mono", monospace';
  ctx.fillText("CREDENTIAL 2026", stampX, stampY + 22);

  // Kolom Kanan: Pengesahan & Tanda Tangan
  ctx.textAlign = "center";
  const sigX = width - 360;

  // Garis tanda tangan
  ctx.strokeStyle = "#1C1515";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(sigX - 160, 920);
  ctx.lineTo(sigX + 160, 920);
  ctx.stroke();

  ctx.fillStyle = "#1e293b";
  ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText("Dewan Instruktur RIT Academy", sigX, 955);

  ctx.fillStyle = "#64748b";
  ctx.font = '500 14px "Plus Jakarta Sans", sans-serif';
  ctx.fillText("Kredensial Resmi • Terverifikasi Mandiri", sigX, 980);
}

export function downloadCertificateImage(canvas, filename = "sertifikat-rit-academy.png") {
  if (!canvas) return;
  const url = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
  }, 100);
}

export function printCertificate(canvas, title = "Sertifikat Kelulusan RIT Academy") {
  if (!canvas) return;
  const dataUrl = canvas.toDataURL("image/png");

  // Buat iframe terisolasi untuk memicu print tanpa merusak tampilan halaman
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  document.body.appendChild(iframe);

  iframe.contentDocument.write(`
    <!doctype html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <style>
        @page { size: landscape; margin: 0; }
        body { margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; height: 100vh; background: #ffffff; }
        img { width: 100vw; height: 100vh; object-fit: contain; }
      </style>
    </head>
    <body>
      <img src="${dataUrl}" onload="setTimeout(() => { window.print(); }, 200);" />
    </body>
    </html>
  `);
  iframe.contentDocument.close();

  setTimeout(() => {
    iframe.remove();
  }, 60000);
}

export function openCertificateModal(options = {}) {
  // Tutup modal lama jika masih ada
  document.getElementById("rit-cert-modal-overlay")?.remove();

  const overlay = document.createElement("div");
  overlay.id = "rit-cert-modal-overlay";
  overlay.className = "cert-modal-overlay";

  overlay.innerHTML = `
    <div class="cert-modal" role="dialog" aria-modal="true" aria-labelledby="cert-modal-title">
      <div class="cert-modal-header">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="material-symbols-outlined" style="color: var(--color-primary); font-size: 28px;">workspace_premium</span>
          <h2 id="cert-modal-title" style="margin: 0; font-size: var(--fs-lg);">Sertifikat Kelulusan Resmi</h2>
        </div>
        <button type="button" class="icon-btn" id="cert-modal-close" aria-label="Tutup" title="Tutup Modal">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <div class="cert-modal-body">
        <canvas id="cert-canvas-preview" class="cert-canvas-preview" width="1600" height="1100"></canvas>
      </div>

      <div class="cert-modal-footer">
        <button type="button" id="cert-download-png-btn" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 6px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">download</span> Unduh PNG HD
        </button>
        <button type="button" id="cert-print-pdf-btn" class="btn btn-secondary" style="display: inline-flex; align-items: center; gap: 6px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">print</span> Cetak / Simpan PDF
        </button>
        <button type="button" id="cert-modal-close-btn" class="btn btn-outline" style="margin-left: auto;">
          Tutup
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Render Canvas
  const canvas = overlay.querySelector("#cert-canvas-preview");
  renderCertificateCanvas(canvas, options);

  // Event Listeners
  const closeModal = () => {
    overlay.classList.add("is-closing");
    setTimeout(() => overlay.remove(), 200);
  };

  overlay.querySelector("#cert-modal-close")?.addEventListener("click", closeModal);
  overlay.querySelector("#cert-modal-close-btn")?.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  const handleKeydown = (e) => {
    if (e.key === "Escape") {
      closeModal();
      window.removeEventListener("keydown", handleKeydown);
    }
  };
  window.addEventListener("keydown", handleKeydown);

  // Download Action
  overlay.querySelector("#cert-download-png-btn")?.addEventListener("click", () => {
    const slug = options.courseSlug || "course";
    const filename = `sertifikat-rit-${slug}.png`;
    downloadCertificateImage(canvas, filename);
  });

  // Print Action
  overlay.querySelector("#cert-print-pdf-btn")?.addEventListener("click", () => {
    printCertificate(canvas, `Sertifikat ${options.courseTitle || 'RIT Academy'}`);
  });
}
