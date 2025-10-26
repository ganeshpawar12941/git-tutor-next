"use client";
import { useEffect } from 'react';
import Script from 'next/script';

export default function ClientBehaviors() {
  useEffect(() => {
    const onScroll = () => {
      const nav = document.querySelector('nav');
      if (!nav) return;
      if (window.scrollY > 0) nav.classList.add('window-scroll');
      else nav.classList.remove('window-scroll');
    };
    window.addEventListener('scroll', onScroll);

    const faqs = document.querySelectorAll('.faq');
    faqs.forEach((faq) => {
      faq.addEventListener('click', () => {
        faq.classList.toggle('open');
        const icon = faq.querySelector('.faq__icon i');
        if (icon) icon.className = icon.className === 'uil uil-plus' ? 'uil uil-minus' : 'uil uil-plus';
      });
    });

    const menu = document.querySelector('.nav__menu');
    const menuBtn = document.querySelector('#open-menu-btn');
    const closeBtn = document.querySelector('#close-menu-btn');
    const closeNav = () => {
      if (!menu || !menuBtn || !closeBtn) return;
      menu.style.display = 'none';
      closeBtn.style.display = 'none';
      menuBtn.style.display = 'inline-block';
    };
    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        if (!menu || !menuBtn || !closeBtn) return;
        menu.style.display = 'flex';
        closeBtn.style.display = 'inline-block';
        menuBtn.style.display = 'none';
      });
    }
    if (closeBtn) closeBtn.addEventListener('click', closeNav);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" strategy="afterInteractive" onLoad={() => {
        if (typeof window !== 'undefined' && window.Swiper) {
          // eslint-disable-next-line no-new
          new window.Swiper('.mySwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: { 600: { slidesPerView: 2 } },
          });
        }
      }} />
    </>
  );
}
