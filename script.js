/* claude-workflow-site - script.js */

document.addEventListener('click', function (e) {
  var btn = e.target.closest('.copy-btn');
  if (!btn) return;

  var targetId = btn.getAttribute('data-target');
  if (!targetId) return;

  var codeEl = document.getElementById(targetId);
  if (!codeEl) return;

  var text = codeEl.textContent;

  if (!navigator.clipboard) {
    // fallback for HTTP or older browsers
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showCopied(btn);
    } catch (err) {
      console.warn('Copy failed:', err);
    }
    document.body.removeChild(ta);
    return;
  }

  navigator.clipboard.writeText(text).then(function () {
    showCopied(btn);
  }).catch(function (err) {
    console.warn('Clipboard write failed:', err);
  });
});

function showCopied(btn) {
  var original = btn.textContent;
  btn.textContent = 'Copied!';
  btn.classList.add('copied');
  setTimeout(function () {
    btn.textContent = original;
    btn.classList.remove('copied');
  }, 1500);
}
