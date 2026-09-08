document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("dorkForm");

  // Rebuild the query string automatically on any user input
  form.addEventListener("input", buildQuery);
});

function buildQuery() {
  let parts = [];

  const getValue = (id) => document.getElementById(id).value.trim();

  // Basic Operators
  const keywords = getValue("keywords");
  const site = getValue("site");
  const excludeSite = getValue("exclude_site");
  const filetype = getValue("filetype");

  // Location Operators
  const intitle = getValue("intitle");
  const allintitle = getValue("allintitle");
  const inurl = getValue("inurl");
  const allinurl = getValue("allinurl");
  const intext = getValue("intext");
  const allintext = getValue("allintext");
  const inanchor = getValue("inanchor");

  // Dates and Exclusions
  const after = getValue("after");
  const before = getValue("before");
  const excludeWords = getValue("exclude_words");
  const numrange = getValue("numrange");

  // Special Operators
  const related = getValue("related");
  const cache = getValue("cache");

  // Proximity AROUND(X)
  const w1 = getValue("around_word1");
  const dist = getValue("around_dist");
  const w2 = getValue("around_word2");

  // Advanced Parameters
  const orKeywords = getValue("or_keywords");
  const tld = getValue("tld");
  const ext = getValue("ext");
  const location = getValue("location");
  const define = getValue("define");
  const wildcard = getValue("wildcard");
  const source = getValue("source");
  const movie = getValue("movie");

  // Domain & TLD Evaluation
  if (site) {
    parts.push(`site:${site}`);
  } else if (tld) {
    const cleanTld = tld.startsWith(".") ? tld : `.${tld}`;
    parts.push(`site:${cleanTld}`);
  }

  if (excludeSite) parts.push(`-site:${excludeSite}`);
  if (filetype) parts.push(`filetype:${filetype}`);
  if (ext) parts.push(`ext:${ext}`);

  if (allintitle) {
    parts.push(`allintitle:${allintitle}`);
  } else if (intitle) {
    parts.push(`intitle:${formatPhrase(intitle)}`);
  }

  if (allinurl) {
    parts.push(`allinurl:${allinurl}`);
  } else if (inurl) {
    parts.push(`inurl:${formatPhrase(inurl)}`);
  }

  if (allintext) {
    parts.push(`allintext:${allintext}`);
  } else if (intext) {
    parts.push(`intext:${formatPhrase(intext)}`);
  }

  if (inanchor) parts.push(`inanchor:${formatPhrase(inanchor)}`);

  if (after) parts.push(`after:${after}`);
  if (before) parts.push(`before:${before}`);
  if (excludeWords) parts.push(excludeWords);
  if (numrange) parts.push(numrange);

  if (related) parts.push(`related:${related}`);
  if (cache) parts.push(`cache:${cache}`);
  if (location) parts.push(`location:${location}`);
  if (define) parts.push(`define:${define}`);
  if (wildcard) parts.push(wildcard);
  if (source) parts.push(`source:${source}`);
  if (movie) parts.push(`movie:${movie}`);

  if (w1 && dist && w2) {
    parts.push(`${w1} AROUND(${dist}) ${w2}`);
  }

  if (orKeywords) {
    parts.push(`(${orKeywords})`);
  }

  if (keywords) parts.push(keywords);

  document.getElementById("generatedDork").value = parts.join(" ");
}

// Automatically wraps multi-word strings in quotes if missing
function formatPhrase(text) {
  if (text.includes(" ") && !text.startsWith('"')) {
    return `"${text}"`;
  }
  return text;
}

function searchGoogle() {
  const query = document.getElementById("generatedDork").value;
  if (!query) {
    alert("Please fill in at least one field to generate a search query.");
    return;
  }
  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  window.open(googleUrl, "_blank");
}

function copyDork() {
  const queryBox = document.getElementById("generatedDork");
  if (!queryBox.value) return;
  
  navigator.clipboard.writeText(queryBox.value).then(() => {
    alert("Dork query copied to clipboard!");
  });
    }
    
