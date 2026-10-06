document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const modal = document.getElementById("login-modal");
  const closeBtn = document.getElementById("close-modal-btn");
  const closeIcon = document.getElementById("close-modal-icon");

  function openModal() {
    modal.classList.add("is-open");
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    form.querySelector("button[type='submit']").focus();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    openModal();
  });

  closeBtn.addEventListener("click", closeModal);
  closeIcon.addEventListener("click", closeModal);
  
  // Tutup jika overlay hitam diklik
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Tutup dengan tombol Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
});