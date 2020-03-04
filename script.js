"use strict";

window.addEventListener("DOMContentLoaded", init);

let selectedColor = "";

function init() {
  loadSVG();
  setTimeout(activateColorSelector, 100);
  setTimeout(activateSVGFields, 100);
}

function loadSVG() {
  fetch("assets/girl.svg")
    .then(response => response.text())
    .then(svg => (document.querySelector("#svg-container").innerHTML = svg));
  fetch("assets/colordropper.svg")
    .then(response => response.text())
    .then(svg => (document.querySelector("#colordrop").innerHTML = svg));
}

function activateColorSelector() {
  const colors = document.querySelectorAll(".colors");
  colors.forEach(color => color.addEventListener("click", selectColor));
  function selectColor() {
    colors.forEach(color => (color.dataset.selected = "false"));
    selectedColor = event.target.dataset.color;
    event.target.dataset.selected = "true";
    document
      .querySelector("#selectedcolor")
      .style.setProperty("--selected-color", selectedColor);
  }
}

function activateSVGFields() {
  const svgFields = document.querySelectorAll(".st0");
  svgFields.forEach(svgField => svgField.addEventListener("click", addColor));

  let coloredFields = 0;

  function addColor() {
    if (event.target.style.fill === "") {
      coloredFields++;
    }

    event.target.style.fill = selectedColor;

    if (coloredFields === svgFields.length) {
      drawingDone();
    }
  }
  function drawingDone() {
    svgFields.forEach(svgField =>
      svgField.removeEventListener("click", addColor)
    );
    document.querySelector("#svg-container").classList.add("donedrawing");
  }
}
