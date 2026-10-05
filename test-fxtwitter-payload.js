async function printFxTwitter() {
  const url = 'https://api.fxtwitter.com/status/2040565815083225472';
  const res = await fetch(url, {
    headers: {
      'Accept': 'application/json',
    },
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

printFxTwitter();
