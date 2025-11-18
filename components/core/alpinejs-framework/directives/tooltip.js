export const TooltipDirective = (Alpine) => {
  Alpine.directive('tooltip', (el, { modifiers, expression }, { Alpine, evaluate }) => {
    // избягваме двойна инициализация
    if (el.closest('[data-tooltip-wrap]')) return;

    // 1) Текст от израз или title
    const raw = expression ? evaluate(expression) : (el.getAttribute('title') || '');
    const text = raw == null ? '' : String(raw);

    // ако няма текст, няма смисъл да правим tooltip
    if (!text.trim()) return;

    // 2) Позиция
    const placement = (modifiers[0] || 'top').toLowerCase();
    const posMap = {
      left: { box: 'top-1/2 right-full mr-3 -translate-y-1/2', arrow: 'top-1/2 -right-1.5 -translate-y-1/2' },
      right: { box: 'top-1/2 left-full ml-3 -translate-y-1/2', arrow: 'top-1/2 -left-1.5 -translate-y-1/2' },
      top: { box: 'bottom-full left-1/2 -translate-x-1/2 mb-3', arrow: '-bottom-1.5 left-1/2 -translate-x-1/2' },
      bottom: { box: 'top-full left-1/2 -translate-x-1/2 mt-3', arrow: '-top-1.5 left-1/2 -translate-x-1/2' },
    };
    const pos = posMap[placement] || posMap.left;

    // 3) Escape
    const esc = (s) => s
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');

    // 4) Подготвяме HTML за новия wrapper
    const wrapperHTML = `
      <div data-tooltip-wrap
           x-data="{ popover: false }"
           @click.outside="popover = false"
           @keydown.escape="popover = false"
           class="group relative inline-block">

        ${el.outerHTML
        .replace('x-tooltip', '') // махаме директивата
        .replace(/title=".*?"/, '') // махаме title ако има
        .replace('>', ' @click.stop.prevent="popover = !popover" ' +
          '@keydown.enter.stop.prevent="popover = !popover" ' +
          '@keydown.space.stop.prevent="popover = !popover" ' +
          'aria-haspopup="dialog" ' +
          ':aria-expanded="popover ? \'true\' : \'false\'">')
      }

        <div :class="popover ? 'block' : 'hidden'"
             class="absolute ${pos.box} z-50 w-max max-w-[350px] rounded-xl bg-white drop-shadow-2xl dark:bg-[#1E2634] hidden group-hover:block">
          <div class="absolute ${pos.arrow} h-5 w-5 rotate-45 bg-white dark:bg-[#1E2634]"></div>
          <div class="p-5">
            <p class="text-sm text-gray-500 dark:text-gray-400">${esc(text)}</p>
          </div>
        </div>
      </div>`;

    // 5) Вмъкваме wrapper-а преди елемента
    el.insertAdjacentHTML('beforebegin', wrapperHTML);

    // 6) Вземаме току-що създадения wrapper (той е sibling преди remove)
    const wrap = el.previousElementSibling;

    // 7) Махаме оригинала (той вече е клониран вътре в wrapperHTML)
    el.remove();

    // 8) Инициализираме Alpine за новия wrapper
    if (wrap) Alpine.initTree(wrap);
  });
};
