export function showToast(message: string, type: "success" | "error") {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.backgroundColor = type === "success" ? "#4caf50" : "#f44336";
  toast.style.color = "white";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "5px";
  toast.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
  toast.style.display = "flex";
  toast.style.alignItems = "center";
  toast.style.justifyContent = "space-between";
  toast.style.gap = "10px";
  toast.style.transition = "opacity 0.3s ease, transform 0.3s ease";

  // Botón "OK" para cerrar el toast
  const closeButton = document.createElement("button");
  closeButton.textContent = "OK";
  closeButton.style.backgroundColor = "white";
  closeButton.style.color = type === "success" ? "#4caf50" : "#f44336";
  closeButton.style.border = "none";
  closeButton.style.padding = "5px 10px";
  closeButton.style.borderRadius = "3px";
  closeButton.style.cursor = "pointer";
  closeButton.style.fontWeight = "bold";

  // Evento para cerrar el toast con animación
  closeButton.addEventListener("click", () => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300); // Tiempo para que la animación termine
  });

  toast.appendChild(closeButton);
  document.body.appendChild(toast);
}
