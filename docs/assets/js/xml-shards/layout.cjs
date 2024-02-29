var headFragment = require('./head.cjs'),
  headerFragment = require('./header.cjs');
/**
 * Returns the whole HTML page with all other fragments injected. It is the part injected into the final HTML file
 * @param
 * @returns
 */
function layoutFragment(mainContent) {
  return `<!DOCTYPE html>
<html lang="en">
${headFragment()}
  <body class="markdown-body">
   ${headerFragment()}
<div>${mainContent}</div>
        <footer class=" flex-inline flex-wrap p-4">
    
 <div class="flex-col">
   <div class="flex items-end justify-end space-x-4 pt-8 " id="social-links">
      
        <a href="https://github.com/prjctimg/huetiful"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="gray"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-github"
          >
            <path
              d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
            ></path></svg
        ></a>
        <a href="https://twitter.com/deantarisai"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="gray"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-twitter"
          >
            <path
              d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
            ></path></svg
        ></a>
        <a href="https://npmjs.com/package/huetiful-js"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="gray"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-package"
          >
            <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
            <path
              d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
            ></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line></svg
        ></a>
        <a href="mailto:prjctimg@outlook.com"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="gray"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-mail"
          >
            <path
              d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
            ></path>
            <polyline points="22,6 12,13 2,6"></polyline></svg
        ></a>
        <a href="https://kofi.com/prjctimg"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="gray"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-coffee"
          >
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
            <line x1="6" y1="1" x2="6" y2="4"></line>
            <line x1="10" y1="1" x2="10" y2="4"></line>
            <line x1="14" y1="1" x2="14" y2="4"></line></svg
        ></a>
      
      </div>

    </div>
     
    
      <div class="pt-2">
        <blockquote class="inline-block text-sm outline-yellow-500">
          <p class="text-sm">
            <span class="inline-block"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="gray"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-code"
              >
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline></svg
            ></span>
            with
            <span class="inline-block"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="14"
                viewBox="0 0 24 24"
                
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="animate-pulse stroke-none fill-red-800"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                ></path></svg
            ></span>
            in Crowhill,ZW
          </p>
          &copy;2024,Dean Tarisai
          <br />
          Released under the Apache-2.0 permissive license.
        </blockquote>
               
      </div>
    </footer>
  

<script src='https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/highlight.min.js'></script>
     <script src="assets/js/main.js"></script>
  </body>
</html>
    
    `;
}

module.exports = layoutFragment;
