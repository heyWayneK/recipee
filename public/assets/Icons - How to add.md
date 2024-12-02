**How to add new icons.**

1. goto https://fonts.google.com/icons
2. select icon (one at a time). Download the SVG file
3. open https://svg-sprite-generator.vercel.app/
4. drag all svg files on SVG sprite generator page
   1. Select "Remove whitespaces" & "Strip fill and stroke"
   2. Click Generate Button
5. add to SVG SPRITE FILE (without the xml top line and remove outer <svg></svg>)
6. modify each <symbol>
   1. shorten name
   2. remove width and height
   3. add stroke-width="1.5"
7. IMPORTANT - RESTART SERVER everytime you add icons (they recache on startup)
8. run sprites preview.html through a server (Live Server or Go Live)
9. VERY IMPORTANT: from the botttom of "sprites preview.html" copy the csv names
   1.Update the Array in the /components/SvgSprite.tsx
   const allowedIcons = [
   "",
   ... add here
   ]
