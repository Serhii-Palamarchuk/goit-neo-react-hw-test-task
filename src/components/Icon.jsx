import React, { useEffect, useState } from "react";

const Icon = ({ name, size = 32, className = "", ...props }) => {
  const [spriteLoaded, setSpriteLoaded] = useState(false);

  useEffect(() => {
    // Перевіряємо чи спрайт вже завантажений
    if (document.getElementById("svg-sprite")) {
      setSpriteLoaded(true);
      return;
    }

    // Завантажуємо спрайт
    fetch("/icons.svg")
      .then((response) => response.text())
      .then((svgContent) => {
        const div = document.createElement("div");
        div.innerHTML = svgContent;
        div.id = "svg-sprite";
        div.style.display = "none";
        document.body.appendChild(div);
        setSpriteLoaded(true);
      })
      .catch((error) => {
        console.error("Помилка завантаження SVG спрайту:", error);
      });
  }, []);

  if (!spriteLoaded) {
    return null; // або якийсь fallback
  }

  return (
    <svg width={size} height={size} className={className} {...props}>
      <use href={`#icon-${name}`} />
    </svg>
  );
};

export default Icon;
