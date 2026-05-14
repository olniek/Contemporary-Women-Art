import { createElement } from "./dom-utils.js";

export function createFlowStepper(activeStep) {
  const wrap = createElement("div", "flow-stepper");
  wrap.setAttribute("role", "group");
  wrap.setAttribute("aria-label", "Your progress in this session");
  const steps = [
    { n: 1, label: "Explore" },
    { n: 2, label: "Quiz" },
    { n: 3, label: "Result" },
  ];
  steps.forEach((s, i) => {
    const span = createElement("span", "flow-step");
    if (s.n < activeStep) span.classList.add("flow-step--complete");
    else if (s.n === activeStep) {
      span.classList.add("flow-step--current");
      span.setAttribute("aria-current", "step");
    } else span.classList.add("flow-step--upcoming");
    span.textContent = s.label;
    wrap.appendChild(span);
    if (i < steps.length - 1) {
      const sep = createElement("span", "flow-step-sep");
      sep.setAttribute("aria-hidden", "true");
      sep.textContent = "·";
      wrap.appendChild(sep);
    }
  });
  return wrap;
}
