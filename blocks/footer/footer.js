import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  // fetch footer content
  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`, window.location.pathname.endsWith('/footer') ? { cache: 'reload' } : {});

  if (resp.ok) {
    const html = await resp.text();

    // decorate footer DOM
    const footer = document.createElement('div');
    footer.innerHTML = html;

 
    let footerCols = footer.firstElementChild.firstElementChild.firstElementChild;
    const footerColClasses = ['logo', 'nav', 'social'];
    let f = footerCols.firstElementChild;
    while (f && footerColClasses.length){
      f.classList.add(footerColClasses.shift());
      f = f.nextElementSibling;
    } 

    decorateIcons(footer);
    block.append(footer);
  }
}
