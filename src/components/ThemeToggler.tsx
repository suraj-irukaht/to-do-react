import { useState, useEffect } from 'react';
import { IoMdMoon } from 'react-icons/io';
import { MdOutlineWbSunny } from 'react-icons/md';
const ThemeToggler = () => {
   const preference = window.matchMedia('(prefers-color-scheme: dark)').matches;
   const savedTheme = localStorage.getItem('theme');

   let initialTheme;
   if (savedTheme) {
      if (savedTheme === 'dark') {
         initialTheme = false;
      } else {
         initialTheme = true;
      }
   } else {
      initialTheme = preference;
   }

   console.log(initialTheme);

   const [theme, setTheme] = useState(initialTheme);

   useEffect(() => {
      document.documentElement.setAttribute(
         'data-theme',
         `${!theme ? 'dark' : 'light'}`
      );
      localStorage.setItem('theme', !theme ? 'dark' : 'light');
   }, [theme]);

   const themeToggler = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setTheme(!theme);
   };
   return (
      <a href="#" className="theme-toggler" onClick={themeToggler}>
         {!theme ? <MdOutlineWbSunny /> : <IoMdMoon />}
      </a>
   );
};

export default ThemeToggler;
