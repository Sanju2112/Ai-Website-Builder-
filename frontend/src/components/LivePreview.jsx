function LivePreview({ html, css, js }) {
  const code = `
    <html>
      <head><style>${css}</style></head>
      <body>
        ${html}
        <script>${js}<\/script>
      </body>
    </html>
  `;

  return (
    <iframe
      title="Live Preview"
      className="w-full h-full border-l border-gray-700"
      srcDoc={code}
    />
  );
}

export default LivePreview;