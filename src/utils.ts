export default function $(selector) {
  const element = document.querySelector(selector);

  if (element === null) {
    return element;
  }

  element.length = element !== null ? 1 : 0;

  element.attr = (attr) => { return element.getAttribute(attr) || ''; };

  element.removeClass = (name) => { element.classList.remove(name); return element; };

  element.addClass = (names) => { element.className = `${element.className} ${names.join(' ')}`; return element};

  return element;
}