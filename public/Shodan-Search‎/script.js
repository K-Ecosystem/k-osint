document.addEventListener('DOMContentLoaded', () => {
  const filterInputs = document.querySelectorAll('input');
  filterInputs.forEach(input => input.addEventListener('input', buildQueryString));
});

function buildQueryString() {
  const filters = [
    { id: 'filterIP', key: 'ip:' },
    { id: 'filterNet', key: 'net:' },
    { id: 'filterPort', key: 'port:' },
    { id: 'filterASN', key: 'asn:' },
    { id: 'filterOrg', key: 'org:', quote: true },
    { id: 'filterISP', key: 'isp:', quote: true },
    { id: 'filterTitle', key: 'http.title:', quote: true },
    { id: 'filterStatus', key: 'http.status:' },
    { id: 'filterComponent', key: 'http.component:', quote: true },
    { id: 'filterHtml', key: 'http.html:', quote: true },
    { id: 'filterServer', key: 'http.server:', quote: true },
    { id: 'filterFavicon', key: 'http.favicon.hash:' },
    { id: 'filterSSLCN', key: 'ssl.cert.subject.cn:', quote: true },
    { id: 'filterSSLIssuer', key: 'ssl.cert.issuer.cn:', quote: true },
    { id: 'filterSSLExpired', key: 'ssl.cert.expired:' },
    { id: 'filterJA3', key: 'ssl.ja3s:' },
    { id: 'filterSSLVer', key: 'ssl.version:' },
    { id: 'filterCountry', key: 'country:' },
    { id: 'filterCity', key: 'city:', quote: true },
    { id: 'filterState', key: 'state:', quote: true },
    { id: 'filterPostal', key: 'postal:' },
    { id: 'filterGeo', key: 'geo:' },
    { id: 'filterProduct', key: 'product:', quote: true },
    { id: 'filterVersion', key: 'version:' },
    { id: 'filterHost', key: 'hostname:' },
    { id: 'filterOS', key: 'os:', quote: true },
    { id: 'filterVuln', key: 'vuln:' },
    { id: 'filterDevice', key: 'device:', quote: true },
    { id: 'filterCloud', key: 'cloud.provider:', quote: true },
    { id: 'filterTag', key: 'tag:' }
  ];

  let queryTokens = [];

  filters.forEach(f => {
    const val = document.getElementById(f.id).value.trim();
    if (val) {
      if (f.quote && (val.includes(' ') || val.includes(':'))) {
        queryTokens.push(`${f.key}"${val}"`);
      } else {
        queryTokens.push(`${f.key}${val}`);
      }
    }
  });

  const rawVal = document.getElementById('filterRaw').value.trim();
  const excludeVal = document.getElementById('filterExclude').value.trim();

  if (rawVal) queryTokens.push(rawVal);
  if (excludeVal) queryTokens.push(excludeVal);

  const fullQuery = queryTokens.join(' ');
  document.getElementById('queryPreview').innerText = fullQuery || 'Select or type filters above...';
  return fullQuery;
}

function executeShodanSearch() {
  const query = buildQueryString();
  if (!query) {
    alert('Please fill in at least one search filter field.');
    return;
  }
  const shodanUrl = `https://www.shodan.io/search?query=${encodeURIComponent(query)}`;
  window.open(shodanUrl, '_blank');
}

function copyQuery() {
  const query = buildQueryString();
  if (query) {
    navigator.clipboard.writeText(query);
    alert('Query copied to clipboard!');
  }
}
