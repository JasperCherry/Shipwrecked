// setting wrecks on the map for bottomFactor=0.5;  , bottom playing area : 1537x1537
function wreckSet(){


wrecks.push(new wreck(150, 1400, 232 * Math.PI / 180,1));
wrecks.push(new wreck(1440, 130, 32 * Math.PI / 180,4));
wrecks.push(new wreck(560, 230, 52 * Math.PI / 180,2));
wrecks.push(new wreck(460, 990, 140 * Math.PI / 180,3));
wrecks.push(new wreck(1420, 1400, 133 * Math.PI / 180,1));
wrecks.push(new wreck(130, 675, 186 * Math.PI / 180,4));
wrecks.push(new wreck(160, 560, 222 * Math.PI / 180,2));
wrecks.push(new wreck(40, 810, 343 * Math.PI / 180,3));
wrecks.push(new wreck(130, 15, 96 * Math.PI / 180,4));
wrecks.push(new wreck(1220, 55, 245 * Math.PI / 180,5));
wrecks.push(new wreck(1270, 35, 267 * Math.PI / 180,6));
wrecks.push(new wreck(1290, 1005, 98 * Math.PI / 180,5));
wrecks.push(new wreck(1270, 1035, 67 * Math.PI / 180,6));
wrecks.push(new wreck(1400, 1340, 301 * Math.PI / 180,4));
wrecks.push(new wreck(1530, 1260, 53 * Math.PI / 180,2));

  /*
  wrecks.push(new wreck(0, 0, 0 * Math.PI / 180,1));
  wrecks.push(new wreck(50, 50, 0 * Math.PI / 180,2));
  wrecks.push(new wreck(100, 100, 0 * Math.PI / 180,3));
  wrecks.push(new wreck(150, 150, 0 * Math.PI / 180,4));
  wrecks.push(new wreck(200, 200, 0 * Math.PI / 180,5));
  wrecks.push(new wreck(250, 250, 0 * Math.PI / 180,6));
  wrecks.push(new wreck(300, 300, 0 * Math.PI / 180,7));
  wrecks.push(new wreck(350, 350, 0 * Math.PI / 180,8));
  wrecks.push(new wreck(400, 400, 0 * Math.PI / 180,9));
  */
}


// fullscreen
function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}

// rounding numbers function
function round(n, k){
    var factor = Math.pow(10, k);
    return Math.round(n*factor)/factor;
}


// counting lev distance
function lev(s, t) {
    var d = []; //2d matrix

    // Step 1
    var n = s.length;
    var m = t.length;

    if (n == 0) return m;
    if (m == 0) return n;

    //Create an array of arrays in javascript (a descending loop is quicker)
    for (var i = n; i >= 0; i--) d[i] = [];

    // Step 2
    for (var i = n; i >= 0; i--) d[i][0] = i;
    for (var j = m; j >= 0; j--) d[0][j] = j;

    // Step 3
    for (var i = 1; i <= n; i++) {
        var s_i = s.charAt(i - 1);

        // Step 4
        for (var j = 1; j <= m; j++) {

            //Check the jagged ld total so far
            if (i == j && d[i][j] > 4) return n;

            var t_j = t.charAt(j - 1);
            var cost = (s_i == t_j) ? 0 : 1; // Step 5

            //Calculate the minimum
            var mi = d[i - 1][j] + 1;
            var b = d[i][j - 1] + 1;
            var c = d[i - 1][j - 1] + cost;

            if (b < mi) mi = b;
            if (c < mi) mi = c;

            d[i][j] = mi; // Step 6

            //Damerau transposition
            if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
                d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
            }
        }
    }

    // Step 7
    return d[n][m];
}
