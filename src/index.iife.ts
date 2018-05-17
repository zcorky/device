import info from './full';

function fetch(url, options) {
  let request = new XMLHttpRequest();

	request.open(options.method || 'get', url, true);

  for (let i in options.headers) {
    request.setRequestHeader(i, options.headers[i]);
  }

  request.withCredentials = options.credentials == 'include';

  request.send(options.body);
}

function upload(url, data = {}, headers = {}) {
  const lastTimestamp = localStorage.getItem('moe-analysis::timestamp');
  if (lastTimestamp && (new Date().getTime() - new Date(lastTimestamp).getTime() < 120000)) return false;

  localStorage.setItem('moe-analysis::timestamp', new Date().toString());
  try {
    fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
  } catch (e) {
    localStorage.setItem('moe-analysis::error', e);
  }
}

setTimeout(function () {
  upload('https://api.uberqd.com/analysis', info(), {
    'Content-Type': 'application/json',
    'Authorization': "Basic eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTRiNGYwYWE5MzliNDFhMjQ3MGM2NzAiLCJpYXQiOjE1MjAyMjg5MzEsImV4cCI6MTUzNTc4MDkzMSwiYXVkIjoiZXZhZXIiLCJpc3MiOiJldmEtc2VydmVyIiwic3ViIjoiZXZhZXIifQ.8eUMM4jAlMDTvfxIZXCWQM3gRMIDAeTRFRmOLHY4ON4",
  });
}, 1000);