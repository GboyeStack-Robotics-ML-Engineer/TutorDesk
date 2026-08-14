const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const webViewsDir = path.join(__dirname, '../../Web Views');
const outputDir = path.join(__dirname, '../src/pages/Generated');

// Ensure output dir exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Convert kebab-case or snake_case to PascalCase
function toPascalCase(str) {
  return str.split(/[-_]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

// Format raw HTML body to JSX
function htmlToJSX(htmlContent) {
  // Use Cheerio to parse and modify DOM robustly
  const $ = cheerio.load(htmlContent);
  
  // Remove scripts, styles, comments, nav, header
  $('script').remove();
  $('style').remove();
  $('nav').remove();
  $('header').remove();

  // If there's a main tag, unwrap it (keep its children)
  // otherwise just use the body's html
  let innerHtml = '';
  if ($('main').length > 0) {
    innerHtml = $('main').html();
  } else {
    innerHtml = $('body').html();
  }

  // Fallback if empty
  if (!innerHtml) innerHtml = '';

  let jsx = innerHtml;
  
  // Remove HTML comments left over
  jsx = jsx.replace(/<!--[\s\S]*?-->/g, '');

  // Replace class with className
  jsx = jsx.replace(/class="/g, 'className="');
  
  // Replace for with htmlFor
  jsx = jsx.replace(/for="/g, 'htmlFor="');
  
  // Close self-closing tags
  const tagsToClose = ['img', 'input', 'br', 'hr', 'meta', 'link'];
  tagsToClose.forEach(tag => {
    const regex = new RegExp(`<${tag}([^>]*?)(?<!/)>`, 'g');
    jsx = jsx.replace(regex, `<${tag}$1 />`);
  });

  // Fix inline styles format
  jsx = jsx.replace(/style="([^"]*)"/g, (match, styleString) => {
    const styleObj = {};
    styleString.split(';').forEach(style => {
      if (style.trim() !== '') {
        const [key, value] = style.split(':');
        if(key && value) {
            const camelKey = key.trim().replace(/-([a-z])/g, (m, g1) => g1.toUpperCase());
            styleObj[camelKey] = value.trim().replace(/'/g, '"');
        }
      }
    });
    return `style={${JSON.stringify(styleObj)}}`;
  });

  // Fix React controlled component warnings:
  // value= → defaultValue= (on input/select/textarea without onChange)
  jsx = jsx.replace(/(<(?:input|select|textarea)\b[^>]*?\s)value="/gi, '$1defaultValue="');
  // checked= → defaultChecked=
  jsx = jsx.replace(/(<input\b[^>]*?\s)checked([\s/>])/gi, '$1defaultChecked$2');
  
  // Fix textarea children: <textarea ...>content</textarea> → <textarea ... defaultValue="content" />
  jsx = jsx.replace(/<textarea([^>]*)>([\s\S]*?)<\/textarea>/gi, (match, attrs, content) => {
    const trimmed = content.trim();
    if (trimmed) {
      return `<textarea${attrs} defaultValue="${trimmed.replace(/"/g, '&quot;')}" />`;
    }
    return `<textarea${attrs} />`;
  });

  // Fix data-* attributes that use data-alt, data-icon etc (these are fine in JSX, leave them)
  // Fix crossorigin → crossOrigin
  jsx = jsx.replace(/crossorigin="/gi, 'crossOrigin="');
  // Fix tabindex → tabIndex
  jsx = jsx.replace(/tabindex="/gi, 'tabIndex="');
  // Fix autocomplete → autoComplete
  jsx = jsx.replace(/autocomplete="/gi, 'autoComplete="');
  // Fix colspan → colSpan
  jsx = jsx.replace(/colspan="/gi, 'colSpan="');
  // Fix rowspan → rowSpan
  jsx = jsx.replace(/rowspan="/gi, 'rowSpan="');

  return jsx;
}

const excludedViews = ['log_in_desktop', 'sign_up_desktop', 'forgot_password', 'reset_password', 'portal_my_schedule'];

const views = fs.readdirSync(webViewsDir);
const routes = [];

views.forEach(viewDir => {
  if (excludedViews.includes(viewDir)) return;
  
  const viewPath = path.join(webViewsDir, viewDir);
  const stat = fs.statSync(viewPath);
  
  if (stat.isDirectory()) {
    const codePath = path.join(viewPath, 'code.html');
    if (fs.existsSync(codePath)) {
      const htmlContent = fs.readFileSync(codePath, 'utf8');
      
      // Convert to JSX
      const jsxContent = htmlToJSX(htmlContent);
        const componentName = toPascalCase(viewDir);
        
        const componentCode = `import React from 'react';

export const ${componentName} = () => {
  return (
    <>
      ${jsxContent}
    </>
  );
};
`;
        
        const outPath = path.join(outputDir, `${componentName}.jsx`);
        fs.writeFileSync(outPath, componentCode);
        console.log(`Generated ${componentName}.jsx`);
        
        routes.push({
            path: viewDir.replace(/_/g, '-'),
            componentName
        });
    }
  }
});

// Generate a file with all routes
const routesFileCode = `
import React from 'react';
import { Route } from 'react-router-dom';
${routes.map(r => `import { ${r.componentName} } from './${r.componentName}';`).join('\n')}

export const generatedRoutes = [
${routes.map(r => `  { path: "/view/${r.path}", component: ${r.componentName} },`).join('\n')}
];
`;

fs.writeFileSync(path.join(outputDir, 'GeneratedRoutes.jsx'), routesFileCode);
console.log('Finished generating views and routes file!');
