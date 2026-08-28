/**
 * 榮恩堂主題前端腳本。
 * 無外部相依，僅處理行動版選單、次選單觸控展開與捲動時的頁首狀態。
 */
(function () {
	'use strict';

	var header = document.querySelector('.site-header');
	var toggle = document.querySelector('.nav-toggle');

	if (header && toggle) {
		toggle.addEventListener('click', function () {
			var open = header.classList.toggle('is-open');
			toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
		});

		// 點擊選單外側或按 Esc 關閉。
		document.addEventListener('click', function (event) {
			if (header.classList.contains('is-open') && !header.contains(event.target)) {
				header.classList.remove('is-open');
				toggle.setAttribute('aria-expanded', 'false');
			}
		});

		document.addEventListener('keydown', function (event) {
			if ('Escape' === event.key && header.classList.contains('is-open')) {
				header.classList.remove('is-open');
				toggle.setAttribute('aria-expanded', 'false');
				toggle.focus();
			}
		});
	}

	// 觸控裝置上，第一次點擊有子選單的項目先展開而不直接跳頁。
	var canHover = window.matchMedia('(hover: hover)').matches;
	if (!canHover) {
		Array.prototype.forEach.call(document.querySelectorAll('.nav-primary .menu-item-has-children > a'), function (link) {
			link.addEventListener('click', function (event) {
				var parent = link.parentNode;
				if (!parent.classList.contains('is-expanded')) {
					event.preventDefault();
					parent.classList.add('is-expanded');
					var submenu = parent.querySelector('.sub-menu');
					if (submenu) {
						submenu.style.opacity = '1';
						submenu.style.visibility = 'visible';
						submenu.style.transform = 'none';
					}
				}
			});
		});
	}
})();
